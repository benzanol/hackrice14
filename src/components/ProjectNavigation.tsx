import { UserIcon } from "@heroicons/react/24/outline";
import {
  AdjustmentsHorizontalIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  CursorArrowRaysIcon,
  PencilIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import NavigationLink from "./NavigationLink";
import ProfileCard from "./ProfileCard";

interface ProjectNavProps {
  selectedProject: string;
  isOpen: boolean;
  setSelectedProject: (project: string | null) => void;
}

const navVariants = {
  close: {
    x: -500,
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    x: 0,
    width: "18rem",
    transition: {
      type: "spring",
      damping: 20,
      duration: 0.5,
    },
  },
};

const ProjectNavigation = ({
  selectedProject,
  isOpen,
  setSelectedProject,
}: ProjectNavProps) => {
  return (
    <motion.nav
      variants={navVariants}
      initial="close"
      animate="open"
      exit="close"
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className={`h-full flex flex-col gap-8 w-64 absolute bg-neutral-900 ml-0 z-10 ${
        isOpen ? "left-64" : "left-20"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex flex-row justify-between place-items-center">
        <h1 className="tracking-widw text-neutral-200 text-lg">
          {selectedProject}
        </h1>
        <button>
          <XMarkIcon
            className="stroke-neutral-400 w-8 aspect-square"
            onClick={() => {
              setSelectedProject(null);
            }}
          />
        </button>
      </div>
      <input
        type="text"
        className="w-full rounded-lg bg-neutral-800 p-2 placeholder:text-neutral-500 text-neutral-200 focus:outline-none"
        placeholder="Search"
      />
      <div className="flex flex-col gap-2">
        <NavigationLink name="Progress">
          <ArrowTrendingUpIcon className="aspect-square w-8" />
        </NavigationLink>
        <NavigationLink name="Team Members">
          <UserGroupIcon className="aspect-square w-8" />
        </NavigationLink>
        <NavigationLink name="In Review">
          <PencilIcon className="aspect-square w-8" />
        </NavigationLink>
        <NavigationLink name="In Progress">
          <BoltIcon className="aspect-square w-8" />
        </NavigationLink>
        <NavigationLink name="Up Next">
          <CursorArrowRaysIcon className="aspect-square w-8" />
        </NavigationLink>
        <NavigationLink name="Project Settings">
          <AdjustmentsHorizontalIcon className="aspect-square w-8" />
        </NavigationLink>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="tracking-wide text-neutral-200">Team Members</h3>
        <ProfileCard name="Bill Gates">
          <UserIcon className="w-8 p-1 rounded-full stroke-2 stroke-emerald-800 bg-emerald-200/70" />
        </ProfileCard>
        <ProfileCard name="Jeff Bezos">
          <UserIcon className="w-8 p-1 rounded-full stroke-2 stroke-red-800 bg-red-200/70" />
        </ProfileCard>
        <ProfileCard name="Steve Jobs">
          <UserIcon className="w-8 p-1 rounded-full stroke-2 stroke-blue-800 bg-blue-200/70" />
        </ProfileCard>
      </div>
    </motion.nav>
  );
};

export default ProjectNavigation;