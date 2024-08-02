import { useState } from "react";
import Button from "./Button";
import { FaTrash, FaEdit, FaCalendarAlt, FaClock } from "react-icons/fa";
import EditTasksModal from "./EditTasksModal";
import DeleteTasksModal from "./DeleteTasksModal";

interface Task {
  title: string;
  description: string;
  taskDueDate: string; // Change to string to store date in 'YYYY-MM-DD' format
  taskStatus: string;
  taskDueTime: string;
}

const TaskCard = ({
  title,
  description,
  taskDueDate,
  taskStatus,
  taskDueTime,
  id,
  onTaskUpdate
}: {
  title: string;
  description: string;
  taskDueDate: Date;
  taskStatus: string;
  taskDueTime: string;
  id: string;
  onTaskUpdate: () => void; // Add onTaskUpdate prop
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTasksModalIsOpen, setDeleteTasksModalIsOpen] = useState(false);
  const [updateTasksModalIsOpen, setUpdateTasksModalIsOpen] = useState(false);
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    taskDueDate: new Date().toISOString().split("T")[0], // Initialize as string
    taskStatus: "",
    taskDueTime: "",
  });

  // const handleButtonClick = () => {
  //   setIsModalOpen(true);
  // };

  const handleDeleteTask = () => {
    setDeleteTasksModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseDeleteTaskModal = () => {
    setDeleteTasksModalIsOpen(false);
  };

  const handleUpdateTask = () => {
    setTask({
      title,
      description,
      taskDueDate: taskDueDate.toISOString().split("T")[0],
      taskStatus,
      taskDueTime,
    });
    setUpdateTasksModalIsOpen(true);
  };

  const handleCloseUpdateTaskModal = () => {
    setUpdateTasksModalIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://todocord-api.onrender.com/tasks/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Task deleted successfully');
        setDeleteTasksModalIsOpen(false);
        onTaskUpdate(); // Call onTaskUpdate after deletion
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async (updatedTask: Task) => {
    try {
      const response = await fetch(`https://todocord-api.onrender.com/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        console.log('Task updated successfully');
        setUpdateTasksModalIsOpen(false);
        onTaskUpdate(); // Call onTaskUpdate after update
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const showId = () => {
    console.log(id);
  };

  return (
    <div className="task-card shadow-md shadow-blue-100/5" onClick={showId}>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl text-[#101C2E]">{title}</h2>
        <p className="text-[#101C2E] flex items-center gap-2">{description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-xl text-[#101C2E]" />
          {taskDueDate.toLocaleDateString()}
        </p>
        <p className="flex items-center gap-2">
          <FaClock className="text-xl text-[#101C2E]" />
          {taskDueTime}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p>{taskStatus}</p>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleDeleteTask}
            styles="bg-orange-500 p-2 w-[30px] h-[30px] rounded-full outline-none border-none flex items-center justify-center"
          >
            <FaTrash className="text-xl text-white" />
          </Button>
          <Button
            onClick={handleUpdateTask}
            styles="bg-purple-500 p-2 w-[30px] h-[30px] rounded-full outline-none border-none flex items-center justify-center"
          >
            <FaEdit className="text-xl text-white" />
          </Button>
        </div>
      </div>
      <>
      {isModalOpen && (
        <EditTasksModal 
          onClose={handleCloseModal} 
          task={task} 
          onUpdate={handleUpdateTask} 
        />
      )}
      {deleteTasksModalIsOpen && (
        <DeleteTasksModal onClose={handleCloseDeleteTaskModal} onDelete={handleDelete} />
      )}
      {updateTasksModalIsOpen && (
        <EditTasksModal
          onClose={handleCloseUpdateTaskModal}
          task={task}
          onUpdate={handleUpdate}
        />
      )}
      </>
    
    </div>
  );
};

export default TaskCard;