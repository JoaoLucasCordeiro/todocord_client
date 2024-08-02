import Button from "./Button";

const DeleteTasksModal = ({ onClose, onDelete }: { onClose: () => void, onDelete: () => void }) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-[600px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">
          Tem certeza que deseja apagar essa task?
        </h2>
        <div className="flex items-center gap-4 py-5 ">
          <Button
            onClick={onDelete}
            styles="bg-red-500 text-white p-2 w-auto h-[40px] rounded-full outline-none border-none flex items-center justify-center"
          >
            Apagar
          </Button>
          <Button
            onClick={onClose}
            styles="bg-green-500 p-2 w-auto h-[40px] rounded-full outline-none border-none flex items-center justify-center"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTasksModal;