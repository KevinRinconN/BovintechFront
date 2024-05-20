"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import routesAdmin, { Route } from "@/routes/admin.routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export const SideBar = () => {
  return (
    <>
      <nav className="pointer-events-auto relative w-72 p-6 border-r">
        <MenuSideBar title="Principal" routes={routesAdmin} />
      </nav>
    </>
  );
};

interface menuSideBarProps {
  title: string;
  routes: Route[];
}

export default function MenuSideBar({ title, routes }: menuSideBarProps) {
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState(pathName);

  useEffect(() => {
    setActiveTab(pathName);
  }, [pathName]);

  return (
    <div>
      <h2 className="flex text-base font-semibold text-zinc-900">{title}</h2>
      <div className="relative mt-4 pl-3">
        <ul
          role="list"
          className="relative border-l-4 [&>li>a]:flex [&>li>a]:items-center"
          id="landing-header"
        >
          {routes.map(({ icon: IconComponent, name, path }) => (
            <li key={path} className="mb-1.5 relative">
              <SideBarItem
                active={pathName.includes(path)}
                onClick={() => setActiveTab(path)}
                path={path}
              >
                <IconComponent className="w-6 mr-4" /> {name}
              </SideBarItem>
              {activeTab.includes(path) && (
                <motion.div
                  layoutId="active-pill"
                  transition={{ type: "spring", duration: 0.5 }}
                  className="absolute -left-1 top-0 w-1 h-8 bg-primary backdrop-blur-lg rounded-md"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface PropsItem extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  path: string;
  active?: boolean;
}

export const SideBarItem = React.forwardRef<HTMLAnchorElement, PropsItem>(
  ({ className, path, active, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={cn(
          "block pr-3 pl-4 text-base h-8 text-zinc-600 transition hover:text-zinc-900",
          active && "text-primary font-semibold",
          className
        )}
        href={path}
        {...props}
      />
    );
  }
);
