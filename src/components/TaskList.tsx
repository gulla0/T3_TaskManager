import React from "react";

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[]; // Array of tasks to display
  onToggleTask: (id: string) => void; // Function to toggle task completion
  onDeleteTask: (id: string) => void; // Function to delete a task
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <div className="w-full max-w-md">
      {tasks.length === 0 && (
        <p className="text-white text-center">No tasks yet. Add some!</p>
      )}
      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between px-4 py-2 rounded ${
              task.completed ? "bg-green-500 text-white" : "bg-gray-800 text-white"
            }`}
          >
            <span
              onClick={() => onToggleTask(task.id)}
              className={`cursor-pointer ${task.completed ? "line-through" : ""}`}
            >
              {task.name}
            </span>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
