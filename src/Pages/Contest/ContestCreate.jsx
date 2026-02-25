import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContest } from '../../lib/contestApi';

export function ContestCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    difficulty: 'beginner',
    maxParticipants: '',
    visibility: 'public',
    tags: '',
    type: 'MIXED',
    supportedLanguages: ['javascript', 'python', 'java', 'cpp', 'c'],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const payload = {
        ...form,
        maxParticipants: form.maxParticipants ? Number(form.maxParticipants) : null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      };
      const res = await createContest(payload);
      const id = res?.data?.contest?._id;
      navigate(id ? `/contests/${id}` : '/contests');
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Contest</h1>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" value={form.title} onChange={onChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={onChange} className="w-full border rounded px-3 py-2" rows={5} required />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input type="datetime-local" name="startTime" value={form.startTime} onChange={onChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input type="datetime-local" name="endTime" value={form.endTime} onChange={onChange} className="w-full border rounded px-3 py-2" required />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select name="difficulty" value={form.difficulty} onChange={onChange} className="w-full border rounded px-3 py-2">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Participants (optional)</label>
            <input type="number" min="1" name="maxParticipants" value={form.maxParticipants} onChange={onChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Visibility</label>
            <select name="visibility" value={form.visibility} onChange={onChange} className="w-full border rounded px-3 py-2">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
          <input name="tags" value={form.tags} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="algorithms, arrays, dp" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contest Type</label>
          <select name="type" value={form.type} onChange={onChange} className="w-full border rounded px-3 py-2">
            <option value="MIXED">Mixed (MCQ + Coding + Text)</option>
            <option value="CODING_ONLY">Coding Only</option>
            <option value="MCQ_ONLY">MCQ Only</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Choose "Coding Only" for programming contests with code editor interface
          </p>
        </div>
        {(form.type === 'CODING_ONLY' || form.type === 'MIXED') && (
          <div>
            <label className="block text-sm font-medium mb-1">Supported Languages</label>
            <div className="flex flex-wrap gap-2">
              {['javascript', 'python', 'java', 'cpp', 'c'].map(lang => (
                <label key={lang} className="flex items-center gap-1 text-sm">
                  <input 
                    type="checkbox" 
                    checked={form.supportedLanguages.includes(lang)}
                    onChange={(e) => {
                      const langs = e.target.checked 
                        ? [...form.supportedLanguages, lang]
                        : form.supportedLanguages.filter(l => l !== lang);
                      setForm(f => ({ ...f, supportedLanguages: langs }));
                    }}
                  />
                  <span className="capitalize">{lang === 'cpp' ? 'C++' : lang}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Contest'}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded border">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ContestCreate;
