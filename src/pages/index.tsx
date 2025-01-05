import TaskList from "~/components/TaskList";
import TaskInput from "~/components/TaskInput";
import { api } from "~/utils/api"; // Import tRPC hooks
import Head from "next/head";

export default function Home() {
  // Step 1: Fetch tasks from the backend
  const tasksQuery = api.tasks.getAll.useQuery();

  // Step 2: Mutations for backend updates
  const addTaskMutation = api.tasks.add.useMutation();
  const toggleTaskMutation = api.tasks.toggle.useMutation();
  const deleteTaskMutation = api.tasks.delete.useMutation();

  // Step 3: Replace the `addTask` handler
  const addTask = async (taskName: string) => {
    try {
      await addTaskMutation.mutateAsync({ name: taskName }); // Add task to the database
      tasksQuery.refetch(); // Refresh tasks after adding
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // Step 4: Replace the `toggleTaskCompletion` handler
  const toggleTaskCompletion = async (id: string) => {
    try {
      await toggleTaskMutation.mutateAsync({ id }); // Toggle task completion in the database
      tasksQuery.refetch(); // Refresh tasks after toggling
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  // Step 5: Replace the `deleteTask` handler
  const deleteTask = async (id: string) => {
    try {
      await deleteTaskMutation.mutateAsync({ id }); // Delete task from the database
      tasksQuery.refetch(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <>
      <Head>
        <title>T3 Taskmanager</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">T3</span> Taskmanager
          </h1>
          {/* Pass the new addTask handler */}
          <TaskInput onAddTask={addTask} />

          {/* Display loading, error, or the task list */}
          {tasksQuery.isLoading ? (
            <p className="text-white">Loading tasks...</p>
          ) : tasksQuery.isError ? (
            <p className="text-red-500">Error fetching tasks</p>
          ) : (
            <TaskList
              tasks={tasksQuery.data || []}
              onToggleTask={toggleTaskCompletion}
              onDeleteTask={deleteTask}
            />
          )}
        </div>
      </main>
    </>
  );
}
