import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Button from "./Button";
import { Bounce, toast } from "react-toastify";

interface Task {
  title: string;
  description: string;
  taskDueDate: string; // Change to string to store date in 'YYYY-MM-DD' format
  taskStatus: string;
  taskDueTime: string;
}

const AddTasksModal = ({ onClose }: { onClose: () => void }) => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    taskDueDate: new Date().toISOString().split("T")[0],
    taskStatus: "",
    taskDueTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Success:", data);
      toast.success("Task adicionada! 👌", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      onClose();
    } catch (error) {
      toast.error("Houve um problema ao adicionar a task! 😭", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4">Nova Task</h2>
          <Button
            onClick={onClose}
            styles="bg-red-500 p-2 w-[30px] h-[30px] rounded-full outline-none border-none flex items-center justify-center"
          >
            <FaXmark className="text-xl text-white" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              required
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição</label>
            <textarea
              required
              name="description"
              value={task.description}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Para quando?</label>
            <input
              required
              type="date"
              name="taskDueDate"
              value={task.taskDueDate}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <input
              required
              type="text"
              name="taskStatus"
              value={task.taskStatus}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Horário</label>
            <input
              required
              type="time"
              name="taskDueTime"
              value={task.taskDueTime}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-[#9CECFE] text-black px-4 py-2 rounded-3xl hover:bg-[#5496a5] transition-all duration-300"
            >
              Adicionar Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTasksModal;
