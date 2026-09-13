import { getSession } from "@/lib/auth";
import { AdminHeader } from "@/components/admin/admin-header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0E1113] font-sans text-[#E7EAEA] selection:bg-[#3FC7B0]/20 selection:text-[#3FC7B0]">
      <AdminHeader adminEmail={session.email} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
