import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { API_BASE_URL, BACKEND_URL } from '../../config/api';

export default function ManageServices() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Code2');
  const [accent, setAccent] = useState('#b8ea27');
  const [pricing, setPricing] = useState('Custom Quote');
  const [features, setFeatures] = useState('');
  const [process, setProcess] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setServices(data);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleEdit = (service: any) => {
    setEditingId(service._id);
    setTitle(service.title);
    setDescription(service.description);
    setIcon(service.icon);
    setAccent(service.accent);
    setPricing(service.pricing);
    setFeatures(service.features.join(', '));
    setProcess(service.process.join(', '));
    setTechnologies(service.technologies.join(', '));
    setPreviewUrl(`${BACKEND_URL}${service.image}`);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle(''); setDescription(''); setIcon('Code2'); setAccent('#b8ea27'); setPricing(''); setFeatures(''); setProcess(''); setTechnologies(''); setPreviewUrl(''); setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const featureArray = features.split(',').map(s => s.trim()).filter(Boolean);
    const processArray = process.split(',').map(s => s.trim()).filter(Boolean);
    const techArray = technologies.split(',').map(s => s.trim()).filter(Boolean);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('icon', icon);
    formData.append('accent', accent);
    formData.append('pricing', pricing);
    formData.append('features', JSON.stringify(featureArray));
    formData.append('process', JSON.stringify(processArray));
    formData.append('technologies', JSON.stringify(techArray));
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const isEditing = !!editingId;
      const url = isEditing ? `${API_BASE_URL}/services/${editingId}` : `${API_BASE_URL}/services`;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData,
      });

      if (res.ok) {
        toast.success(editingId ? 'Service updated successfully!' : 'Service created successfully!');
        handleCancelEdit();
        fetchServices();
      } else {
        toast.error('Failed to save service');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error saving service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service? This cannot be undone.')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/services/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (res.ok) { toast.success('Service deleted'); fetchServices(); }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Services</h1>
          <p className="text-slate-500 mt-1 font-medium">Add new offerings and manage existing services.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-primary rounded-full" />
          {editingId ? 'Edit Service' : 'Create New Service'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-700 ml-1">Service Title</label>
               <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" placeholder="E.g. Web Development" />
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-700 ml-1">Lucide Icon Name</label>
               <input required type="text" value={icon} onChange={e => setIcon(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" placeholder="Code2" />
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-700 ml-1">Accent Color Hex</label>
               <input required type="text" value={accent} onChange={e => setAccent(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" placeholder="#b8ea27" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-700 ml-1">Brief Description</label>
               <input required type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" />
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-slate-700 ml-1">Pricing Model</label>
               <input required type="text" value={pricing} onChange={e => setPricing(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" placeholder="Custom Quote" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Features (CSV)</label>
                <input required type="text" value={features} onChange={e => setFeatures(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Process (CSV)</label>
                <input required type="text" value={process} onChange={e => setProcess(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Technologies (CSV)</label>
                <input required type="text" value={technologies} onChange={e => setTechnologies(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 ml-1">Cover Image</label>
            <div className="flex flex-wrap items-center gap-8">
              <label className="cursor-pointer flex flex-col items-center justify-center bg-slate-50 border-2 border-slate-200 border-dashed rounded-3xl p-8 hover:bg-slate-100 transition duration-300 w-full max-w-sm group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <ImageIcon className="text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-bold text-slate-500">Click or drag image here</span>
                <input required={!editingId} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {previewUrl && (
                <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative group">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
            <button disabled={isSubmitting} type="submit" className="flex items-center justify-center gap-3 bg-primary text-black px-10 py-4 rounded-2xl font-black hover:bg-black hover:text-white transition-all disabled:opacity-50 shadow-xl shadow-primary/20">
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (editingId ? <Edit2 className="w-6 h-6" /> : <Plus className="w-6 h-6" />)}
              {editingId ? 'Update Service' : 'Save Service'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} className="px-10 py-4 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-black text-slate-900 mb-8">Registered Services ({services.length})</h2>
        {isLoading ? (
          <div className="text-center py-20"><Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(service => (
              <div key={service._id} className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden flex items-center p-5 gap-5 relative group hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/5">
                <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 bg-white border border-slate-100 p-1 shadow-sm">
                  <ImageWithFallback src={`${BACKEND_URL}${service.image}`} alt={service.title} className="w-full h-full object-cover rounded-[14px]" />
                </div>
                <div className="flex-1 min-w-0">
                   <h3 className="font-black text-slate-900 text-lg truncate">{service.title}</h3>
                   <p className="text-sm text-slate-500 line-clamp-2 mt-1 font-medium leading-relaxed">{service.description}</p>
                   <div className="mt-3">
                       <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm" style={{ borderColor: service.accent }}>{service.pricing}</span>
                   </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => handleEdit(service)} className="bg-white text-blue-600 p-3 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-slate-100">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(service._id)} className="bg-white text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-slate-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {services.length === 0 && (
                <div className="col-span-full py-16 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-bold italic">No services listed yet.</p>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
