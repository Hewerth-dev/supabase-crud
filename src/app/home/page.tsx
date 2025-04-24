"use client";
import {
  getTasks,
  addTask,
  deleteTaskById,
  updateTask,
} from "@/services/todoService";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  created_at?: string;
};
export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      const data = await getTasks();
      setTasks(data || []);
      setLoading(false);
    }
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    const data = await addTask(newTask);
    setTasks([...tasks, ...data]);
    setNewTask("");
  };

  const handleRemoveTask = async (id: number) => {
    await deleteTaskById(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = async (id: number, completed: boolean) => {
    await updateTask(id, completed);
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm");
  };

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Supabase CRUD</h1>
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
          >
            Add
          </button>
        </div>
      </div>
      <div className="w-full max-w-md space-y-4">
        {tasks.map((task) => (
          <article
            key={task.id}
            className="p-4 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h1
              className={`text-lg font-semibold ${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.title}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              {task.created_at ? formatDate(task.created_at) : "N/A"}
            </p>
            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded transition-colors duration-300"
                onClick={() => handleUpdateTask(task.id, !task.completed)}
              >
                {task.completed ? "Undo" : "Done"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition-colors duration-300"
                onClick={() => handleRemoveTask(task.id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
