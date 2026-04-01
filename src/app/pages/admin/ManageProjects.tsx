import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { API_BASE_URL, BACKEND_URL } from '../../config/api';

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [techInput, setTechInput] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error('Failed to fetch projects', err);
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

  const handleEdit = (project: any) => {
    setEditingId(project._id);
    setTitle(project.title);
    setCategory(project.category);
    setTechInput(project.technologies.join(', '));
    setDemoLink(project.demoLink || '');
    setPreviewUrl(`${BACKEND_URL}${project.image}`);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setCategory('');
    setTechInput('');
    setDemoLink('');
    setPreviewUrl('');
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Parse technologies separated by commas
    const technologies = techInput.split(',').map(t => t.trim()).filter(Boolean);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('technologies', JSON.stringify(technologies));
    if (demoLink) formData.append('demoLink', demoLink);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const isEditing = !!editingId;
      const url = isEditing ? `${API_BASE_URL}/projects/${editingId}` : `${API_BASE_URL}/projects`;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData,
      });

      if (res.ok) {
        toast.success(editingId ? 'Project updated successfully!' : 'Project created successfully!');
        handleCancelEdit();
        fetchProjects();
      } else {
        toast.error('Failed to save project');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error saving project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (res.ok) {
        toast.success('Project deleted');
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Projects</h1>
          <p className="text-slate-500 mt-1 font-medium">Add new portfolio projects and manage existing ones.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-blue-500 rounded-full" />
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Project Title</label>
              <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" placeholder="E-Commerce App" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
              <input required type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" placeholder="E-Commerce, Websites, etc." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Technologies (CSV)</label>
              <input required type="text" value={techInput} onChange={e => setTechInput(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" placeholder="React, Node.js, MongoDB" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Demo Link (Optional)</label>
              <input type="url" value={demoLink} onChange={e => setDemoLink(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" placeholder="https://example.com" />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 ml-1">Project Image</label>
            <div className="flex flex-wrap items-center gap-8">
              <label className="cursor-pointer flex flex-col items-center justify-center bg-slate-50 border-2 border-slate-200 border-dashed rounded-3xl p-8 hover:bg-slate-100 transition duration-300 w-full max-w-sm group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <ImageIcon className="text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-bold text-slate-500">Click or drag image here</span>
                <input type="file" required={!editingId} accept="image/*" onChange={handleImageChange} className="hidden" />
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
              {editingId ? 'Update Project' : 'Save Project'}
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
        <h2 className="text-xl font-black text-slate-900 mb-8">Portfolio ({projects.length})</h2>
        {isLoading ? (
          <div className="text-center py-20"><Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project._id} className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden flex flex-col group hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/5">
                <div className="h-56 bg-white border-b border-slate-100 relative overflow-hidden p-2">
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                    <ImageWithFallback src={`${BACKEND_URL}${project.image}`} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button onClick={() => handleEdit(project)} className="bg-white text-blue-600 p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600 hover:text-white shadow-xl translate-x-4 group-hover:translate-x-0">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(project._id)} className="bg-white text-red-500 p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-xl translate-x-4 group-hover:translate-x-0 delay-75">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{project.category}</p>
                    <div className="flex flex-wrap gap-2 mt-4 mb-6">
                      {project.technologies?.map((tech: string) => (
                        <span key={tech} className="text-[10px] uppercase font-black tracking-wider bg-white border border-slate-200 px-3 py-1.5 rounded-full text-slate-500 shadow-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-black uppercase tracking-widest hover:text-black mt-auto inline-flex items-center gap-1 transition-colors">
                        View Live Project ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
            {projects.length === 0 && (
                <div className="col-span-full py-16 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-bold italic">No projects added yet.</p>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
