import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "./Button";
import TaskCard from "./TaskCard";
import AddTasksModal from "./AddTasksModal";

interface Task {
  title: string;
  description: string;
  taskDueDate: string;
  taskStatus: string;
  taskDueTime: string;
  _id: string;
}

const AllTasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<Task[]>([]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/tasks");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <div className="flex gap-5 items-start px-1 py-5 ">
        <h1 className="text-5xl text-white font-bold">TodoCord</h1>
      
      </div>
      <div className="flex items-center flex-col gap-2 overflow-y-auto justify-center flex-wrap">
        {data && data.length > 0 ? (
          data.map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              description={task.description}
              taskDueTime={task.taskDueTime}
              taskDueDate={new Date(task.taskDueDate)}
              taskStatus={task.taskStatus}
              id={task._id}
              onTaskUpdate={fetchTasks} 
            />
          ))
        ) : (
          <p className="text-white">Nenhuma task foi adicionada! 😥</p>
        )}
      <Button
          onClick={handleButtonClick}
          styles="bg-green-400 mt-5 p-2 text-white rounded-xl gap-2 items-center outline-none border-none flex items-center justify-center"
        >
          {data && data.length > 0 ? "Adicionar task" : "Adicionar primeira task"}
          <FaPlus className="text-xl text-white" />
        </Button>
      </div>

      {isModalOpen && <AddTasksModal onClose={handleCloseModal} />}
    </section>
  );
};

export default AllTasks;