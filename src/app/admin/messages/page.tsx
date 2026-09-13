import { getAllMessages } from "@/features/messages/queries";
import { DeleteMessageButton } from "@/features/messages/components/delete-message-button";

export default async function AdminMessagesPage() {
  const messages = await getAllMessages();

  const formatDateDisplay = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
            Inbound Messages
          </h1>
          <p className="mt-1 text-sm text-[#8A9295]">
            Inquiries, collaborations, and contact messages submitted by visitors.
          </p>
        </div>
        <span className="font-mono text-xs text-[#8A9295]">
          {messages.length} total message{messages.length === 1 ? "" : "s"}
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22282B] bg-[#171B1D]/40 p-12 text-center">
          <p className="font-mono text-sm text-[#8A9295]">
            Your inbox is currently empty.
          </p>
          <p className="mt-1 font-mono text-xs text-[#8A9295]/60">
            Messages sent via the public contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-xl border border-[#22282B] bg-[#171B1D] p-5 space-y-3 transition-colors hover:border-[#3FC7B0]/40"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-medium text-[#E7EAEA]">
                      {msg.name}
                    </span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="font-mono text-xs text-[#3FC7B0] hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                  {msg.subject && (
                    <div className="font-mono text-xs text-[#8A9295]">
                      Subject: {msg.subject}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#8A9295]">
                    {formatDateDisplay(msg.createdAt)}
                  </span>
                  <DeleteMessageButton messageId={msg.id} />
                </div>
              </div>

              <div className="rounded-lg border border-[#22282B] bg-[#0E1113] p-4 text-sm text-[#E7EAEA] whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
