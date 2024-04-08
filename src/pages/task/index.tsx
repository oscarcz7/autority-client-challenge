import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";

interface TaskItem {
  id: number;
  name: string;
  description: string;
  author: string;
  isComplete: boolean;
}

const TasksPage: React.FC = () => {
  const router = useRouter();
  const [newTask, setNewTask] = useState<TaskItem>({
    id: 0,
    name: "",
    description: "",
    author: "",
    isComplete: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/tasks/task", newTask);
      alert("Tarea creada exitosamente");
      setNewTask({
        id: 0,
        name: "",
        description: "",
        author: "",
        isComplete: false,
      });
      router.push("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="justify-center text-center">Crear Nueva Tarea</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="name"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newTask.name}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="description"
          >
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="author"
          >
            Autor:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={newTask.author}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Crear Tarea
        </button>
      </form>
    </div>
  );
};

export default TasksPage;
