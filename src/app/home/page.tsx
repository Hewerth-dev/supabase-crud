"use client";
import {
  getTasks,
  addTask,
  deleteTaskById,
  updateTask,
} from "@/services/todoService";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};
export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data || []);
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

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Supabase Crud</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex flex-row justify-between">
            <div>
              <span className={task.completed ? "line-through" : ""}>
                {task.title}
              </span>
            </div>
            <div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => handleUpdateTask(task.id, !task.completed)}
              >
                Done
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleRemoveTask(task.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
