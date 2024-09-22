import {
  ArrowRightIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  FlagIcon,
  Square2StackIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import NavigationLink from "./NavigationLink";
import ProjectsLink from "./ProjectsLink";
import ProjectNavigation from "./ProjectNavigation";

const navigationVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

interface NavProps {
  isOpen: boolean;
  selectedProject: string | null;
  setIsOpen: (value: boolean) => void;
  setSelectedProject: (value: string | null) => void;
}

const Navigation = ({
  isOpen,
  setIsOpen,
  selectedProject,
  setSelectedProject,
}: NavProps) => {
  const navigationControls = useAnimationControls();
  useEffect(() => {
    if (isOpen) {
      navigationControls.start("open");
    } else {
      navigationControls.start("close");
      setSelectedProject(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.nav
        initial="close"
        animate={navigationControls}
        variants={navigationVariants}
        className="flex flex-col absolute h-full bg-neutral-900 z-20 top-0 left-0 border-r-2 border-neutral-800/80 p-5 gap-8"
      >
        <div className="flex flex-row justify-between place-items-center w-full">
          <div
            className={
              isOpen
                ? "bg-gradient-to-br from-orange-500 to-amber-700 rounded-full w-10 h-10"
                : "bg-gradient-to-br from-orange-500 to-amber-700 rounded-full"
            }
          />
          <motion.button
            initial={{ rotate: 360 }}
            animate={{
              rotate: isOpen ? 180 : 360,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            onClick={() => handleOpenClose()}
            className="h-8 w-8"
          >
            <ArrowRightIcon className="stroke-neutral-300" />
          </motion.button>
        </div>
        <div className="flex flex-col gap-2">
          <NavigationLink name="Transactions" link="#" isOpen={isOpen}>
            <ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Calendar" link="#" isOpen={isOpen}>
            <Square2StackIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Analysis" link="#" isOpen={isOpen}>
            <DocumentCheckIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Budgeting" link="#" isOpen={isOpen}>
            <UsersIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Settings" link="#" isOpen={isOpen}>
            <FlagIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
        </div>
        {/* <div className="flex flex-col gap-3">
          <ProjectsLink
            name="Artificial Inteligence"
            setSelectedProject={setSelectedProject}
          >
            <div className="flex items-center justify-center min-w-4 w-4 aspect-square mx-2 bg-rose-300 rounded-full" />
          </ProjectsLink>
          <ProjectsLink
            name="Apple Vision Pro"
            setSelectedProject={setSelectedProject}
          >
            <div className="flex items-center justify-center min-w-4 w-4 aspect-square mx-2 bg-indigo-500 rounded-full" />
          </ProjectsLink>
          <ProjectsLink
            name="Secret Project"
            setSelectedProject={setSelectedProject}
          >
            <div className="flex items-center justify-center min-w-4 w-4 aspect-square mx-2 bg-yellow-300 rounded-full" />
          </ProjectsLink>
        </div> */}
      </motion.nav>
      <AnimatePresence>
        {selectedProject && (
          <ProjectNavigation
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;