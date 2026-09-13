import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const AUTH_SECRET =
  process.env.AUTH_SECRET || "default_super_secret_portfolio_key_change_in_env";

interface SessionPayload {
  adminId: string;
  email: string;
  exp: number;
}

export interface AuthSession {
  adminId: string;
  email: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export function verifyPassword(password: string, combinedHash: string): boolean {
  try {
    const [salt, key] = combinedHash.split(":");
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

function signToken(payload: string): string {
  const hmac = crypto.createHmac("sha256", AUTH_SECRET);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) return null;

    const payload = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const hmac = crypto.createHmac("sha256", AUTH_SECRET);
    hmac.update(payload);
    const expectedSignature = hmac.digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      )
    ) {
      return null;
    }

    const data = JSON.parse(payload) as SessionPayload;
    if (Date.now() > data.exp) return null;

    return data;
  } catch {
    return null;
  }
}

export async function createSession(adminId: string, email: string): Promise<string> {
  const payload = JSON.stringify({
    adminId,
    email,
    exp: Date.now() + SESSION_DURATION_MS,
  });

  const token = signToken(payload);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_DURATION_MS / 1000),
  });

  return token;
}

export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) return null;

  const session = verifyToken(sessionCookie.value);
  if (!session?.adminId) return null;

  return {
    adminId: session.adminId,
    email: session.email,
  };
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<{ id: string; email: string } | null> {
  const admin = await prisma.admin.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (!admin) return null;

  const isValid = verifyPassword(password, admin.password);
  if (!isValid) return null;

  return { id: admin.id, email: admin.email };
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<AuthResult> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in first." };
  }

  const admin = await prisma.admin.findUnique({
    where: { id: session.adminId },
  });

  if (!admin) {
    return { success: false, error: "Admin account not found." };
  }

  const isCurrentValid = verifyPassword(currentPassword, admin.password);
  if (!isCurrentValid) {
    return { success: false, error: "Incorrect current password." };
  }

  if (currentPassword === newPassword) {
    return {
      success: false,
      error: "New password cannot be identical to the current password.",
    };
  }

  if (verifyPassword(newPassword, admin.password)) {
    return {
      success: false,
      error: "New password cannot be the same as your existing password.",
    };
  }

  if (newPassword.length < 8) {
    return {
      success: false,
      error: "New password must be at least 8 characters long.",
    };
  }

  const newHashedPassword = hashPassword(newPassword);

  await prisma.admin.update({
    where: { id: admin.id },
    data: { password: newHashedPassword },
  });

  await createSession(admin.id, admin.email);

  return { success: true };
}
