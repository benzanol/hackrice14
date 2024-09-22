import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationLinkProps {
  name: string;
  link: string;
  children: ReactNode;
  isOpen: boolean;
}

const NavigationLink = ({ name, link, children, isOpen }: NavigationLinkProps) => {
  return (
    <a href={link} className="flex items-center gap-2 text-neutral-300 hover:text-white">
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {name}
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );
};

export default NavigationLink;