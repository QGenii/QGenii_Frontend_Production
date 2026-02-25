import { useState } from 'react';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import api from '../../lib/api';

export default function ModuleEditForm({ module, onCancel, onSuccess }) {
  const [form, setForm] = useState({
    title: module.title || '',
    description: module.description || '',
    isPublished: module.isPublished !== undefined ? module.isPublished : true,
  });
  const [saving, setSaving] = useState(false);

  const updateField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.patch(`/modules/${module._id}`, form);
      alert('Module updated successfully');
      onSuccess();
    } catch (e) {
      console.error('Update failed', e);
      alert(e.response?.data?.message || 'Failed to update module');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="mt-4">
      <CardBody>
        <h4 className="font-semibold mb-3">Edit Module</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Module Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              required
              minLength={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Module Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => updateField('isPublished', e.target.checked)}
              />
              Published
            </label>
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
