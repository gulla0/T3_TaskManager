import { useState } from "react";
import WalletConnector from "~/components/WalletConnector";
import TaskList from "~/components/TaskList";
import TaskInput from "~/components/TaskInput";
import { api } from "~/utils/api";
import Head from "next/head";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Fetch tasks for the connected wallet
  const { data: tasks, refetch } = api.tasks.getAll.useQuery(
    { walletAddress: walletAddress || undefined },
    { enabled: !!walletAddress }
  );

  const addTaskMutation = api.tasks.add.useMutation();
  const toggleTaskMutation = api.tasks.toggle.useMutation();
  const deleteTaskMutation = api.tasks.delete.useMutation();

  // Add Task
  const addTask = async (taskName: string) => {
    if (walletAddress) {
      await addTaskMutation.mutateAsync({ name: taskName, walletAddress });
      refetch();
    }
  };

  // Toggle Task Completion
  const toggleTaskCompletion = async (id: string) => {
    await toggleTaskMutation.mutateAsync({ id });
    refetch();
  };

  // Delete Task
  const deleteTask = async (id: string) => {
    await deleteTaskMutation.mutateAsync({ id });
    refetch();
  };

  return (
    <>
      <Head>
        <title>T3 Task Manager</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">T3/Mesh</span> Task Manager
          </h1>

          {/* Wallet Connector */}
          <WalletConnector onAddressRetrieved={setWalletAddress} />

          {/* Display tasks and task input if wallet is connected */}
          {walletAddress && (
            <>
              <TaskInput onAddTask={addTask} />
              {tasks ? (
                <TaskList
                  tasks={tasks}
                  onToggleTask={toggleTaskCompletion}
                  onDeleteTask={deleteTask}
                />
              ) : (
                <p className="text-white">Loading tasks...</p>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
