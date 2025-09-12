import React from 'react';
import { X } from 'lucide-react';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon = null, // Optional custom icon
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 text-gray-900 dark:text-white shadow-lg rounded-lg p-6 z-10">
        {/* Close Icon */}
        <span onClick={onClose} className='flex justify-end hover:text-red-700'><X /></span>
        

        {/* Icon + Content */}
        <div className="text-center my-8">
          {icon ? (
            <div className="inline">{icon}</div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 fill-red-500 inline"
              viewBox="0 0 24 24"
            >
              <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
              <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
            </svg>
          )}

          <h4 className="text-lg font-semibold mt-4">{title}</h4>
          {description && (
            <p className="text-sm text-slate-600 mt-4 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-red-500 hover:bg-red-600 cursor-pointer"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-slate-900 hover:bg-gray-300 cursor-pointer"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
