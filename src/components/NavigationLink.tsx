import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
  name: string;
  to: string;
  isOpen: boolean;
  children: ReactNode;
}

const NavigationLink = ({ name, to, isOpen, children }: NavigationLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-row place-items-center gap-4 stroke-neutral-400 hover:stroke-neutral-200 transition-colors ${
          isActive ? 'stroke-neutral-200' : ''
        }`
      }
    >
      {children}
      {isOpen && <span className="text-neutral-200">{name}</span>}
    </NavLink>
  );
};

export default NavigationLink;