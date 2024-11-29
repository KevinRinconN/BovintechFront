"use client";

import { NavItem, Sidebar } from "./side-bar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { IconWrapper } from "../icon/icon-wrapper";

interface CollapsedLayoutProps {
  user: {
    image?: string;
    name?: string;
  };
  routes: NavItem[];
  children: React.ReactNode;
}

export function CollapsedLayout({
  user,
  routes,
  children,
}: CollapsedLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const [initialPaddingLeft, setInitialPaddingLeft] = useState("2.5rem");
  const transitionSettings = {
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 24,
      duration: 0.2,
      ease: "easeInOut",
    },
  };
  // Actualiza el padding inicial basado en el tamaño de la ventana
  useEffect(() => {
    const width = window.innerWidth;
    const updatePadding = () => {
      setInitialPaddingLeft(
        width >= 768 ? (isCollapsed ? "6.5rem" : "20rem") : "0rem"
      );
    };

    updatePadding(); // Establece el padding inicial al montar
    window.addEventListener("resize", updatePadding); // Escucha cambios de tamaño de ventana

    return () => window.removeEventListener("resize", updatePadding);
  }, [isCollapsed]);

  useEffect(() => {
    if (open) {
      setIsCollapsed(false);
    }
  }, [open]);

  return (
    <>
      <header className="pointer-events-none z-[90] inset-0 flex fixed">
        <div className="absolute w-full bg-background">
          <Button
            className=" pointer-events-auto md:hidden mt-4 ml-4"
            variant="ghost"
            size="icon"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <IconWrapper icon="menu" size="xl" />
          </Button>
        </div>

        <motion.nav
          className={cn(
            "pointer-events-auto relative py-8 px-6 border-r bg-background",
            !isCollapsed && "w-80",
            !open && "hidden md:block"
          )}
          initial={{ width: open ? "20rem" : isCollapsed ? "6.5rem" : "20rem" }}
          animate={{ width: open ? "20rem" : isCollapsed ? "6.5rem" : "20rem" }}
          {...transitionSettings}
        >
          <Button
            className="absolute pointer-events-auto md:hidden "
            variant="ghost"
            size="icon"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <IconWrapper icon="menu" size="xl" />
          </Button>
          <Sidebar
            className={cn("")}
            user={user}
            items={routes}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </motion.nav>
      </header>
      <motion.main
        className={cn(
          "pointer-events-auto  flex justify-center mt-8 md:mt-0",
          isCollapsed ? "pl-0 md:pl-24" : "pl-0 md:pl-80"
        )}
        initial={{ paddingLeft: initialPaddingLeft }}
        animate={{ paddingLeft: initialPaddingLeft }}
        {...transitionSettings}
      >
        {/* <ScrollArea className="flex-1">
          
        </ScrollArea> */}
        {children}
      </motion.main>
    </>
  );
}
