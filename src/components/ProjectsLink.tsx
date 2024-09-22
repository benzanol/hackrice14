import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface ProjectLinkProps {
  children: ReactNode;
  name: string;
  setSelectedProject: (value: string | null) => void;
}
const ProjectsLink = ({
  children,
  name,
  setSelectedProject,
}: ProjectLinkProps) => {
  const handleClick = () => {
    setSelectedProject(name);
  };
  return (
    <a
      className="flex p-1 rounded cursor-pointer hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
      href="#"
      onClick={() => {
        handleClick();
      }}
    >
      {children}
      <div className="flex overflow-clip place-items-center justify-between w-full">
        <p className="text-inherit truncate font-poppins overflow-clip whitespace-nowrap tracking-wide">
          {name}
        </p>
        <ChevronRightIcon className="min-w-8 w-8 stroke-inherit" />
      </div>
    </a>
  );
};

export default ProjectsLink;