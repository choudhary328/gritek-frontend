import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

export function ReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, company, comment, rating }),
      });
      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert('Failed to submit review. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName(''); setRole(''); setCompany(''); setComment(''); setRating(5); setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative"
        >
          <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>

          <div className="p-6 sm:p-8">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                  <Star className="w-8 h-8 fill-current" />
                </div>
                <h2 className="text-2xl font-bold text-[#21362e] mb-2">Thank You!</h2>
                <p className="text-gray-600 mb-6">Your review has been submitted and is pending approval.</p>
                <button onClick={handleClose} className="bg-[#b8ea27] text-[#21362e] px-6 py-2 rounded-lg font-bold">
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#21362e] mb-2">Leave a Review</h2>
                <p className="text-gray-600 mb-6 text-sm">Tell us about your experience working with Gritek Solutions.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b8ea27] focus:border-transparent outline-none transition" placeholder="John Doe" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b8ea27] focus:border-transparent outline-none transition" placeholder="CEO" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b8ea27] focus:border-transparent outline-none transition" placeholder="Tech Inc" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                          <Star className={`w-8 h-8 transition-colors ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review *</label>
                    <textarea required rows={4} value={comment} onChange={e => setComment(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b8ea27] focus:border-transparent outline-none transition resize-none" placeholder="It was a pleasure working with..." />
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full flex items-center justify-center gap-2 bg-[#b8ea27] text-[#21362e] px-6 py-3 rounded-lg font-bold hover:bg-[#a6d420] transition-colors disabled:opacity-50 mt-2">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Review'}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
