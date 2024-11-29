import { cn } from "@/lib/utils";
import React from "react";
import { IconWrapper } from "./icon/icon-wrapper";

interface ImgAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  img?: string;
}

export const ImgUser = React.forwardRef<HTMLDivElement, ImgAvatarProps>(
  ({ className, img, ...props }, ref) => {
    return (
      <figure
        className={cn(
          "w-8 h-8 rounded-full bg-muted overflow-hidden",
          className
        )}
        {...props}
      >
        {img ? (
          <img src={img} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <IconWrapper
              icon="userRound"
              className="text-muted-foreground"
              size="sm"
            />
          </div>
        )}
      </figure>
    );
  }
);

ImgUser.displayName = "ImgUser";
