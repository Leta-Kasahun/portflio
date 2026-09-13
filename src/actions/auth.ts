"use server";

import { redirect } from "next/navigation";
import {
  verifyAdminCredentials,
  createSession,
  destroySession,
  changeAdminPassword,
  AuthResult,
} from "@/lib/auth";

export async function loginAction(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { success: false, error: "Invalid form submission." };
  }

  const trimmedEmail = email.trim();
  if (!trimmedEmail || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const admin = await verifyAdminCredentials(trimmedEmail, password);
  if (!admin) {
    return { success: false, error: "Invalid email or password." };
  }

  await createSession(admin.id, admin.email);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

export async function changePasswordAction(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (
    typeof currentPassword !== "string" ||
    typeof newPassword !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return { success: false, error: "Invalid form input." };
  }

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, error: "All fields are required." };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, error: "New passwords do not match." };
  }

  return changeAdminPassword(currentPassword, newPassword);
}
