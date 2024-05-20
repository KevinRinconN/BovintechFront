"use client";
import { User } from "@/types/auth.types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { logout } from "@/actions/auth/logout";

interface infoSessionProps {
  user: User;
}

export const SessionInfo = ({ user }: infoSessionProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-end mr-4">
        <span className="text-xs leading-none capitalize">
          {user.firstname.toLowerCase()} {user.lastname.toLowerCase()}
        </span>
        <span className="text-xs text-primary leading-none capitalize">
          {user.rol.toLowerCase()}
        </span>
      </div>

      <Avatar className="w-9 h-9">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>
          {user.firstname.charAt(0)}
          {user.lastname.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

interface SessionDropDown {
  user: User;
  children: JSX.Element;
}

export const SessionDropDown = ({ user, children }: SessionDropDown) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="px-2" align="end">
        <DropdownMenuLabel>
          <p>Mi cuenta</p>
          <DropdownMenuSeparator />
          <div className="flex items-center gap-4 py-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {user.firstname.charAt(0)}
                {user.lastname.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="text-sm font-normal">
              <p className="capitalize">{`${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`}</p>
              <p className="text-primary text-xs capitalize leading-none">{`${user.rol.toLowerCase()}`}</p>

              <p className="max-w-sm text-gray-500">{`${user.email}`}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        {user.rol == "ADMIN" && (
          <DropdownMenuItem>Registrar nuevo usuario</DropdownMenuItem>
        )}
        <LogoutDropDown />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const LogoutDropDown = () => {
  return (
    <DropdownMenuItem onClick={() => logout()}>
      Cerrar sesion
      <DropdownMenuShortcut>
        <ArrowLeftStartOnRectangleIcon className="w-4" />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
};
