import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Button from "./Button";

interface Task {
  title: string;
  description: string;
  taskDueDate: string;
  taskStatus: string;
  taskDueTime: string;
}

const EditTasksModal = ({
  onClose,
  task: initialTask,
  onUpdate,
}: {
  onClose: () => void;
  task: Task;
  onUpdate: (task: Task) => void;
}) => {
  const [task, setTask] = useState<Task>(initialTask);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(task);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4">Editar task</h2>
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
              name="description"
              value={task.description}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Para quando?</label>
            <input
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTasksModal;