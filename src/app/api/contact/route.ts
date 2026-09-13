import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";
import { contactMessageSchema } from "@/features/messages/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = contactMessageSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const data = validation.data;
    const message = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    await sendContactNotification({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    }).catch(() => false);

    return NextResponse.json({ success: true, id: message.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
