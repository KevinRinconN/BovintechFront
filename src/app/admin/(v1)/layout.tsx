import { SideBar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/torbar";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="pointer-events-none inset-0 flex fixed">
        <TopBar />
        <SideBar />
      </header>
      <main className="pl-72 pt-14">
        <SessionProvider>{children}</SessionProvider>
        <Toaster position="bottom-left" richColors closeButton />
      </main>
    </>
  );
}
