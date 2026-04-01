import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SuccessModal({ isOpen, onClose, title = "Success!", message = "Thank you for contacting us! We will get back to you soon." }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#21362e]/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#21362e] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-[#b8ea27]/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-[#b8ea27]" />
              </motion.div>

              {/* Text content */}
              <h3 className="text-2xl font-bold text-[#21362e] mb-2">{title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {message}
              </p>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full bg-[#21362e] text-[#b8ea27] py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-[0_10px_20px_rgba(33,54,46,0.2)] transition-all"
              >
                Great, thanks!
              </motion.button>
            </div>

            {/* Bottom Accent */}
            <div className="h-2 bg-[#b8ea27]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
