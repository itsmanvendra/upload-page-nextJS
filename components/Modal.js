import { BsFillCheckCircleFill } from "react-icons/bs";

const Modal = ({ isOpen, onClose, entriesCount, onGoToEntries }) => {
    const modalClass = isOpen
        ? "fixed inset-0 flex items-center justify-center z-50"
        : "hidden";

    return (
        <div className={modalClass}>
        <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
        <div className="modal-container bg-white w-11/12 max-w-sm mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 px-6 flex flex-col justify-center items-center">
            <BsFillCheckCircleFill size={70} className="text-blue-500 mt-4" />
            <h2 className="text-xl text-blue-500 font-bold text-center py-2">
                Success!
            </h2>
            <div className="text-base text-black text-center font-semibold py-2 mb-4">
                {entriesCount} entries successfully uploaded
            </div>
            <button
                className="w-full bg-blue-500 p-4 rounded-full text-base font-semibold text-white mb-4"
                onClick={onGoToEntries}
            >
                Go To My Entries
            </button>
            <button
                className="w-full bg-blue-200 p-4 rounded-full text-base font-semibold  text-blue-500 mb-4"
                onClick={onClose}
            >
                Cancel
            </button>
            </div>
        </div>
        </div>
    );
};

export default Modal;
