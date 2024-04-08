// task/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { getTaskById } from "../api/tasks/task";

interface TaskItem {
  id: number;
  name: string;
  description: string;
  author: string;
  isComplete: boolean;
}

const TaskDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<TaskItem | null>(null);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAuthor, setTaskAuthor] = useState("");
  const [isComplete, setIsComplete] = useState(false); 

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(String(id));
        setTask(response);
        setTaskName(response.name);
        setTaskDescription(response.description);
        setTaskAuthor(response.author);
        setIsComplete(response.isComplete);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "isComplete") {
      setIsComplete((prevValue) => !prevValue);
    } else {
      switch (name) {
        case "name":
          setTaskName(value);
          break;
        case "description":
          setTaskDescription(value);
          break;
        case "author":
          setTaskAuthor(value);
          break;
        default:
          break;
      }
    }
  };

  const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`/api/tasks/task?id=${id}`, {
        name: taskName,
        description: taskDescription,
        author: taskAuthor,
        isComplete: isComplete,
      });
      
      alert("Tarea actualizada exitosamente");
      router.push('/tasks/');
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!task) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Detalles de la Tarea</h1>
      <form className="space-y-6" onSubmit={handleUpdateTask}>
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="name"
          >
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            value={taskName}
            onChange={handleInputChange}
            placeholder="Nombre de la tarea"
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
            name="description"
            value={taskDescription}
            onChange={handleInputChange}
            placeholder="Descripción de la tarea"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
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
            name="author"
            value={taskAuthor}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Completa?
          </label>
          <input
            type="checkbox"
            name="isComplete"
            checked={isComplete}
            onChange={handleInputChange}
            className="form-checkbox h-6 w-6 text-indigo-600"
          />
          <span className="ml-2 text-gray-900"></span>
        </div>

        <button
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Actualizar Tarea
        </button>
      </form>
    </div>
  );
};

export default TaskDetailPage;
