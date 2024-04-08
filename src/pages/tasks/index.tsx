import TaskList from "../../components/TaskList";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface TaskItem {
  id: number;
  name: string;
  description: string;
  author: string;
  isComplete: boolean;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTask, setNewTask] = useState<TaskItem>({
    id: 0,
    name: "",
    description: "",
    author: "",
    isComplete: false,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks/task");
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="justify-center text-center">Lista de Tareas</h1>
      <div className="my-2">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};

export default TasksPage;
