import { User } from "lucide-react";

interface UserAvatarProps {
  onClick: () => void;
}

export const UserAvatar = ({ onClick }: UserAvatarProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded-full transition-all duration-200 hover:scale-105 hover:bg-primary-foreground/20"
      aria-label="Open categories menu"
    >
      <User className="w-5 h-5 text-primary-foreground" />
    </button>
  );
};