import React, { createContext, useState, useContext } from "react";
import { motion } from "framer-motion";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 bg-navy-900 bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 sm:p-8 relative h-[500px] max-h-[600px] overflow-y-auto w-full max-w-[min(1000px,calc(100vw-2rem))]"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✖
            </button>
            {modalContent}
          </motion.div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
