import {
  ArrowRightIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ChartPieIcon,
  WalletIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon as LogoIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import NavigationLink from "./NavigationLink";
import ProjectsLink from "./ProjectsLink";
import ProjectNavigation from "./ProjectNavigation";
import { NavLink } from 'react-router-dom';

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
        className="flex flex-col absolute h-full bg-gray-900 z-20 top-0 left-0 border-r border-gray-800 p-5 gap-8 font-sans"
      >
        <div className="flex flex-row justify-between place-items-center w-full">
          <div
            className={
              isOpen
                ? "bg-green-600 rounded-full w-10 h-10 flex items-center justify-center"
                : "bg-green-600 rounded-full w-8 h-8 flex items-center justify-center"
            }
          >
            <LogoIcon className="text-white w-6 h-6" />
          </div>
          <motion.button
            initial={{ rotate: 360 }}
            animate={{
              rotate: isOpen ? 180 : 360,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            onClick={() => handleOpenClose()}
            className="h-8 w-8 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowRightIcon className="stroke-current" />
          </motion.button>
        </div>
        <div className="flex flex-col gap-4">
          <NavigationLink name="Transactions" to="/transactions" isOpen={isOpen}>
            <CurrencyDollarIcon className="w-6 h-6" />
          </NavigationLink>
          <NavigationLink name="Calendar" to="/calendar" isOpen={isOpen}>
            <CalendarIcon className="w-6 h-6" />
          </NavigationLink>
          <NavigationLink name="Analysis" to="/analysis" isOpen={isOpen}>
            <ChartPieIcon className="w-6 h-6" />
          </NavigationLink>
          <NavigationLink name="Budgeting" to="/budgeting" isOpen={isOpen}>
            <WalletIcon className="w-6 h-6" />
          </NavigationLink>
          <NavigationLink name="Settings" to="/settings" isOpen={isOpen}>
            <Cog6ToothIcon className="w-6 h-6" />
          </NavigationLink>
        </div>
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