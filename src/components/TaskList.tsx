import React from "react";
import Task from "./Task";

interface TaskItem {
  id: number;
  name: string;
  description: string;
  author: string;
  isComplete: boolean;
}

interface TaskListProps {
  tasks: TaskItem[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          name={task.name}
          isComplete={task.isComplete}
          description={task.description}
          author={task.author}
        />
      ))}
    </div>
  );
};

export default TaskList;
