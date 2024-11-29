import { AvatarProps } from "@radix-ui/react-avatar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { IconWrapper } from "./icon/icon-wrapper";

interface UserAvatarProps extends AvatarProps {
  user: {
    image?: string;
    name?: string;
  };
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <IconWrapper icon="user" size="lg"/>
        </AvatarFallback>
      )}
    </Avatar>
  );
}
