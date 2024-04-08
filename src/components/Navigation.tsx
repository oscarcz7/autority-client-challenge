import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode; // Agregar la prop children
}

const NavLink: React.FC<NavLinkProps> = ({ href, active, children }) => {
  return (
    <Link href={href}>
      <a className={`px-4 py-2 rounded-md transition duration-300 ${active ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-blue-500 hover:text-white'}`}>
        {children}
      </a>
    </Link>
  );
};

const Navigation: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="flex justify-center mt-6 mb-4">
      <NavLink href="/tasks" active={router.pathname === '/tasks'}>
        Lista de Tareas
      </NavLink>
      <NavLink href="/task" active={router.pathname === '/task'}>
        Crear Tarea
      </NavLink>
    </nav>
  );
};

export default Navigation;
