"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { motion } from "framer-motion";

import { IconAdminPages, Icons, IconSettings } from "../icon/icons";
import { IconWrapper } from "../icon/icon-wrapper";
import { UserAvatar } from "../user-avatar";

export interface SidebarProps {
  user: {
    image?: string;
    name?: string;
  };
  className?: string;
  items: NavItem[];
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

export function Sidebar({
  user,
  items,
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center  bg-background h-full space-y-16",
        className
      )}
    >
      <IconWrapper icon="logo" className="w-20 h-20" />
      <Button
        size="icon"
        className="absolute hidden md:block -right-4 top-4 p-1 w-7 h-7 rounded-full shadow bg-background text-foreground hover:bg-muted"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <IconWrapper icon="chevronRight" />
        ) : (
          <IconWrapper icon="chevronLeft" />
        )}
      </Button>
      <div className="w-full h-full flex flex-col justify-between  items-center">
        <div className="w-full">
          {items.length > 0 && (
            <ul
              role="list"
              className="[&>li>a]:flex [&>li>a]:items-center w-full"
            >
              <div className="grid grid-flow-row auto-rows-max space-y-2 text-foreground">
                {items.map((item, index) => {
                  return (
                    <li key={index} className="flex">
                      <SidebarItem {...item} isCollapsed={isCollapsed} />
                    </li>
                  );
                })}
              </div>
            </ul>
          )}
        </div>
        <ul role="list" className="[&>li>a]:flex [&>li>a]:items-center w-full">
          <div className="grid grid-flow-row auto-rows-max space-y-6 text-foreground">
            <div className="flex flex-col space-y-1">
              {/* <li className="flex">
                <SidebarItem
                  icon="bell"
                  title="Notificaciones"
                  href="#"
                  isCollapsed={isCollapsed}
                />
              </li>
              <li className="flex">
                <SidebarItem
                  icon="config"
                  title="Ajustes"
                  href="#"
                  isCollapsed={isCollapsed}
                />
              </li>
              <li className="flex">
                <SidebarItem
                  icon="help"
                  title="Soporte"
                  href="#"
                  isCollapsed={isCollapsed}
                />
              </li> */}
            </div>
            <Separator />
            <li className="flex items-center justify-center">
              {isCollapsed ? (
                <UserAvatar user={user} className="h-10 w-10" />
              ) : (
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center gap-x-4">
                    <UserAvatar user={user} className="h-10 w-10" />
                    <div className="flex flex-col justify-center text-nowrap">
                      <span className="text-base capitalize ">
                        {user.name && user.name.toLowerCase()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Administrador de zona
                      </span>
                    </div>
                  </div>
                  <IconWrapper icon="moreHorizontal" />
                </div>
              )}
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon: IconAdminPages | IconSettings;
};

export type SidebarItemProps = {
  isCollapsed: boolean;
} & NavItem;

function SidebarItem({ isCollapsed, ...item }: SidebarItemProps) {
  const pathname = usePathname();
  const isSelected = pathname.includes(item.href);
  return (
    <>
      {!item.disabled && item.href ? (
        isCollapsed ? (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-md py-2 px-4 text-muted-foreground"
                  )}
                >
                  {pathname.includes(item.href) && (
                    <motion.div
                      layoutId="active-pill"
                      transition={{ type: "spring", duration: 0.5 }}
                      className="absolute w-full h-full left-0 top-0 bg-primary/15 text-primary backdrop-blur-lg rounded-md"
                    />
                  )}
                  <IconWrapper
                    className={cn(isSelected && " relative text-primary")}
                    icon={item.icon}
                    strokeWidth={"bold"}
                  />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {item.title}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "relative flex items-center rounded-md py-2 px-4 w-full hover:underline text-muted-foreground",
              pathname.includes(item.href) && "text-primary font-bold "
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {pathname.includes(item.href) && (
              <motion.div
                layoutId="active-pill"
                transition={{ type: "spring", duration: 0.5 }}
                className="absolute left-0 top-0 w-full h-full bg-primary/15 text-primary font-semibold backdrop-blur-lg rounded-md"
              />
            )}
            <IconWrapper
              className="relative"
              icon={item.icon}
              strokeWidth={"bold"}
            />
            <span className="relative ml-4 text-nowrap">{item.title}</span>
          </Link>
        )
      ) : (
        <span className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60">
          {item.title}
        </span>
      )}
    </>
  );
}
