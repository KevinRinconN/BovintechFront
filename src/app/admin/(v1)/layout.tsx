import { auth } from "@/auth.config";
import { CollapsedLayout } from "@/components/layout/collapsed-layout";
import { Toaster } from "@/components/ui/sonner";
import { Route, routesAdmin, routesOperator } from "@/routes/admin.routes";
import { SessionProvider } from "next-auth/react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  let routes: Route[] = [];

  if (user?.rol == "ADMIN") {
    routes = routesAdmin;
  } else {
    routes = routesOperator;
  }
  return (
    <>
      <CollapsedLayout
        user={{ name: user?.firstName, image: user?.image }}
        routes={routes}
      >
        <SessionProvider>{children}</SessionProvider>
        <Toaster position="bottom-left" richColors closeButton />
      </CollapsedLayout>
    </>
  );
}
