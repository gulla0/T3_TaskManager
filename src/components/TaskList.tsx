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
            className={`flex items-center px-6 py-4 rounded ${
              task.completed ? "bg-green-800 text-white" : "bg-gray-800 text-white"
            }`}
            style={{ wordBreak: "break-word" }} // Allow task name to wrap
          >
            {/* Task Name */}
            <span
              className={`${
                task.completed ? "line-through" : ""
              } font-bold text-lg flex-1`} // Task name wraps and grows
            >
              {task.name}
            </span>

            {/* Checkbox and Completed Text */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                className="cursor-pointer"
              />
              <span className="text-sm text-gray-400">Completed</span>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => onDeleteTask(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              style={{ marginLeft: "10px" }} // Add spacing between checkbox group and button
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
