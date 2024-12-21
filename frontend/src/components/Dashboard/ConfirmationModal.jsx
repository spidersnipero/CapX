import React from "react";

const ConfirmationModal = ({ onConfirm, onCancel }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={onCancel} // Close the modal when clicking outside
  >
    <div
      className="bg-white rounded-lg p-6 max-w-lg w-full dark:bg-gray-800"
      onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold dark:text-white">
          Are you sure you want to delete this stock?
        </h3>
        <div className="mt-4">
          <button
            className="bg-red-400 text-white px-4 py-2 rounded-full mx-2"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-full mx-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;
