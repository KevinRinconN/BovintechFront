import { getSession as getClientSession } from "next-auth/react";
import { auth } from "@/auth.config";

export async function getSession(context = null) {
  if (typeof window === "undefined") {
    // En el servidor
    return await auth();
  } else {
    // En el cliente
    return await getClientSession();
  }
}
