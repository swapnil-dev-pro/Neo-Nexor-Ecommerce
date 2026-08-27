"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

type ToastProps = {
  message: string;
  show: boolean;
};

export function Toast({ message, show }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          className="fixed top-20 left-1/2 z-[100] bg-text text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <CheckCircle size={18} className="text-success" />
          <span className="text-sm">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}