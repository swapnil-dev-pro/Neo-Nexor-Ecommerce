"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/40 z-[200]"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-danger/10 p-2 rounded-full">
                <AlertTriangle size={20} className="text-danger" />
              </div>
              <div>
                <h3 className="font-semibold text-text">{title}</h3>
                <p className="text-sm text-text-muted mt-1">{message}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm rounded-lg border border-border text-text-muted hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm rounded-lg bg-danger text-white hover:bg-danger/90"
              >
                Remove
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}