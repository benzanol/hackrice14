import React from 'react'

import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Backdrop from "./components/Backdrop";
import Dashboard from "./components/Dashboard";
import { motion } from "framer-motion";

function Sidebar() {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [backdropController, setBackdropController] = useState<boolean>(false);

  const clickOut = () => {
    setIsOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    if (isOpen || selectedProject) {
      setBackdropController(true);
    } else {
      setBackdropController(false);
    }
  }, [isOpen, selectedProject]);

  return (
    <>
      <Backdrop onClick={clickOut} controller={backdropController} />
      <motion.main
        className="h-screen w-full flex flex-row relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "linear" }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
      >
        <Navigation
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <Dashboard />
      </motion.main>
    </>
  );
}

export default Sidebar