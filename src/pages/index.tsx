// pages/index.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/Navigation';

const IndexPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redireccionar automáticamente al usuario a la página de listado de tareas
    const redirect = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulando una espera de 1 segundo antes de redirigir (opcional)
      router.push('/tasks');
    };
    redirect();
  }, []); // El array vacío como segundo argumento asegura que este efecto se ejecute solo una vez, al montar la página

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default IndexPage;
