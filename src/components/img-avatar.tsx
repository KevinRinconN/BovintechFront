import { cn } from "@/lib/utils";
import React from "react";
import { IconWrapper } from "./icon/icon-wrapper";

interface ImgAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  lastWeightImage?: string;
}

export const ImgAvatar = React.forwardRef<HTMLDivElement, ImgAvatarProps>(
  ({ className, lastWeightImage, ...props }, ref) => {
    return (
      <figure
        className={cn(
          "w-24 h-24 rounded-full bg-muted overflow-hidden",
          className
        )}
        {...props}
      >
        {lastWeightImage ? (
          <img src={lastWeightImage} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <IconWrapper
              icon="img"
              className="text-muted-foreground"
              size="sm"
            />
          </div>
        )}
      </figure>
    );
  }
);

ImgAvatar.displayName = "ImgAvatar";
