import { useState, useEffect } from 'react';
import { Trash2, CheckCircle, XCircle, Loader2, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../config/api';

type FilterTab = 'all' | 'pending' | 'approved' | 'rejected';

export default function ManageReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(`Review ${newStatus}!`);
        fetchReviews();
      }
    } catch (err) {
      toast.error('Failed to update review status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review permanently?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (res.ok) {
        toast.success('Review deleted');
        fetchReviews();
      }
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const approvedCount = reviews.filter(r => r.status === 'approved').length;
  const rejectedCount = reviews.filter(r => r.status === 'rejected').length;

  const filtered = activeTab === 'all' ? reviews : reviews.filter(r => r.status === activeTab);

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: reviews.length },
    { key: 'pending', label: 'Pending', count: pendingCount },
    { key: 'approved', label: 'Approved', count: approvedCount },
    { key: 'rejected', label: 'Rejected', count: rejectedCount },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Reviews</h1>
          <p className="text-slate-400 mt-1 font-medium text-sm">
            Manage customer testimonials. {pendingCount > 0 && <span className="text-orange-500 font-bold">{pendingCount} awaiting review.</span>}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white rounded-2xl p-1.5 border border-slate-200 shadow-sm w-fit">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {tab.label}
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
              activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-20"><Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" /></div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.length > 0 ? (
              filtered.map(review => (
                <div key={review._id} className={`p-6 md:p-8 hover:bg-slate-50/30 transition-colors group ${review.status === 'pending' ? 'border-l-4 border-l-orange-400' : ''}`}>
                  <div className="flex justify-between items-start mb-5 flex-wrap gap-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary font-black text-lg shrink-0">
                        {review.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors">{review.name}</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                          {review.role} {review.company ? `• ${review.company}` : ''}
                        </p>
                        <div className="flex text-primary mt-2 gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current text-primary' : 'fill-current text-slate-200'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      {review.status === 'pending' && (
                        <>
                          <button onClick={() => handleUpdateStatus(review._id, 'approved')} className="flex items-center gap-1.5 bg-white text-green-600 px-4 py-2 rounded-xl text-[11px] font-bold hover:bg-green-600 hover:text-white transition-all shadow-sm border border-slate-200">
                            <CheckCircle className="w-4 h-4" /> Approve
                          </button>
                          <button onClick={() => handleUpdateStatus(review._id, 'rejected')} className="flex items-center gap-1.5 bg-white text-orange-500 px-4 py-2 rounded-xl text-[11px] font-bold hover:bg-orange-500 hover:text-white transition-all shadow-sm border border-slate-200">
                            <XCircle className="w-4 h-4" /> Reject
                          </button>
                        </>
                      )}
                      {review.status === 'approved' && (
                        <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100">✓ Approved</span>
                      )}
                      {review.status === 'rejected' && (
                        <span className="bg-orange-50 text-orange-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-orange-100">✗ Rejected</span>
                      )}
                      <button onClick={() => handleDelete(review._id)} className="bg-white text-red-400 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-slate-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-slate-600 text-sm italic leading-relaxed font-medium relative">
                    <span className="absolute -top-3 left-4 text-slate-200 text-4xl font-serif">"</span>
                    {review.comment}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="text-slate-200 w-8 h-8" />
                </div>
                <p className="text-slate-400 font-bold">No {activeTab !== 'all' ? activeTab : ''} reviews found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
