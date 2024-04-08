// pages/api/tasks.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface TaskItem {
  id: number;
  name: string;
  description: string;
  author: string;
  isComplete: boolean;
}

interface Response {
  success: string;
  data: TaskItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const response = await axios.get<TaskItem[]>(
        "http://localhost:4000/tasks"
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Error fetching tasks" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, description, author, isComplete } = req.body;
      const newTask: TaskItem = {
        id: Date.now(),
        name,
        description,
        author,
        isComplete,
      };
      await axios.post("http://localhost:4000/task", newTask);
      res.status(201).json({ message: "Tarea creada exitosamente" });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Error creating task" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const { name, description, author, isComplete } = req.body;
      const updatedTask: TaskItem = {
        id: parseInt(id as string),
        name,
        description,
        author,
        isComplete,
      };
      await axios.put(`http://localhost:4000/task/${id}`, updatedTask); // Corregir la ruta

      res.status(200).json({ message: "Tarea actualizada exitosamente" });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Error updating task" });
    }
}
 else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export const getTaskById = async (id: string) => {
  const response = await fetch(`http://localhost:4000/task/${id}`);
  if (!response.ok) {
    throw new Error('No se pudo obtener la tarea');
  }

  const taskData = await response.json();
  return taskData.data;
};
