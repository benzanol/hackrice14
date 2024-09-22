import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

interface BackdropProps {
  controller: boolean;
  onClick(): void;
}

const Backdrop = ({ controller, onClick }: BackdropProps) => {
  const BackdropController = useAnimationControls();

  useEffect(() => {
    if (controller) {
      BackdropController.start("end");
    } else {
      BackdropController.start("start");
    }
  }, [controller]);

  return (
    <motion.div
      variants={{
        start: {
          opacity: 0,
          x: "-100vw",
          transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.25,
          },
        },
        end: {
          opacity: 1,
          x: 0,
          transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.25,
          },
        },
      }}
      initial="start"
      animate={BackdropController}
      className="h-screen w-screen bg-neutral-950/50 fixed top-0 left-0 z-10"
      onClick={() => {
        onClick();
      }}
    />
  );
};

export default Backdrop;
