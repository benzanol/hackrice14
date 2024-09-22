import { ReactNode } from "react";

interface ProfileProps {
  children: ReactNode;
  name: string;
}
const ProfileCard = ({ children, name }: ProfileProps) => {
  return (
    <div className="flex p-1 rounded cursor-pointer hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100">
      {children}
      <p className="text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide">
        {name}
      </p>
    </div>
  );
};

export default ProfileCard;