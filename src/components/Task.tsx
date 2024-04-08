// Task.tsx
import React from "react";
import { useRouter } from "next/router";

interface TaskProps {
  id: number;
  name: string;
  description: string;
  author: string;
  isComplete: boolean;
}

const Task: React.FC<TaskProps> = ({
  id,
  name,
  description,
  author,
  isComplete,
}) => {
  const router = useRouter();

  const handleClick = () => {
    // Redirigir al usuario a la página de detalles de la tarea
    router.push(`/task/${id}`);
  };

  return (
    <button
      className="bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg rounded-lg p-6 mb-4"
      onClick={handleClick} // Manejar el clic en el botón
    >
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={isComplete}
          readOnly
          className="mr-4"
        />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-600 mb-2">Autor: {author}</p>
      <div
        className={`inline-block px-2 py-1 rounded ${
          isComplete ? "bg-green-400" : "bg-red-400"
        } text-white text-xs font-semibold`}
      >
        {isComplete ? "Completa" : "Incompleta"}
      </div>
    </button>
  );
};

export default Task;
