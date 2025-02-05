import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tv } from "tailwind-variants";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "lg" | "md" | "sm";
};

const Modal = ({ isOpen, onClose, children, size = "md" }: ModalProps) => {
  const sizeStyles = tv({
    base: "w-full bg-white p-6 rounded-lg shadow-lg relative h-full",
    variants: {
      size: {
        sm: "sm:w-64 sm:h-auto",
        md: "sm:w-96 sm:h-auto",
        lg: "sm:w-1/2 sm:h-auto",
      },
    },
  });
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className={sizeStyles({ size: size })}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-3xl"
              onClick={onClose}
            >
              &times;
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
