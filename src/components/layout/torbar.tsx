import { auth } from "@/auth.config";
import { SessionDropDown, SessionInfo } from "./session-dropdown";

export const TopBar = async () => {
  const session = await auth();
  return (
    <>
      <div className="pointer-events-auto inset-x-0 fixed top-0 left-72 flex justify-end items-center h-14 px-8 border-b bg-background/6 backdrop-blur">
        {session?.user && (
          <SessionDropDown user={session?.user}>
            <SessionInfo user={session?.user} />
          </SessionDropDown>
        )}
      </div>
    </>
  );
};
