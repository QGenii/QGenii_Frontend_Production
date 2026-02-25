import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { X } from 'lucide-react';
import { Spinner } from '../ui/Spinner';

const WalletItemForm = ({ item, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'premium_course',
    coinPrice: '',
    originalPrice: '',
    imageUrl: '',
    stock: '',
    featured: false,
    active: true,
    minLevel: '',
    minTier: '',
    requiredBadges: [],
    deliveryType: 'instant',
    deliveryInfo: '',
    visibility: 'public',
    allowedRoles: [],
    purchaseLimitPerUser: '',
    purchaseLimitPerDay: '',
    metadata: {}
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        category: item.category || 'premium_course',
        coinPrice: item.coinPrice || '',
        originalPrice: item.originalPrice || '',
        imageUrl: item.imageUrl || '',
        stock: item.stock === null ? '' : item.stock,
        featured: item.featured || false,
        active: item.active !== undefined ? item.active : true,
        minLevel: item.requirements?.minLevel || '',
        minTier: item.requirements?.minTier || '',
        requiredBadges: item.requirements?.requiredBadges || [],
        deliveryType: item.deliveryType || 'instant',
        deliveryInfo: item.deliveryInfo?.instructions || '',
        visibility: item.visibility || 'public',
        allowedRoles: item.allowedRoles || [],
        purchaseLimitPerUser: item.purchaseLimit?.perUser || '',
        purchaseLimitPerDay: item.purchaseLimit?.perDay || '',
        metadata: item.metadata || {}
      });
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        coinPrice: parseInt(formData.coinPrice),
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
        imageUrl: formData.imageUrl || undefined,
        stock: formData.stock ? parseInt(formData.stock) : null,
        featured: formData.featured,
        active: formData.active,
        requirements: {
          minLevel: formData.minLevel ? parseInt(formData.minLevel) : undefined,
          minTier: formData.minTier || undefined,
          requiredBadges: formData.requiredBadges
        },
        deliveryType: formData.deliveryType,
        deliveryInfo: {
          instructions: formData.deliveryInfo || undefined
        },
        visibility: formData.visibility,
        allowedRoles: formData.allowedRoles,
        purchaseLimit: {
          perUser: formData.purchaseLimitPerUser ? parseInt(formData.purchaseLimitPerUser) : undefined,
          perDay: formData.purchaseLimitPerDay ? parseInt(formData.purchaseLimitPerDay) : undefined
        },
        metadata: formData.metadata
      };

      if (item) {
        await api.put(`/wallet/admin/items/${item._id}`, payload);
      } else {
        await api.post('/wallet/admin/items', payload);
      }

      alert(item ? 'Item updated successfully!' : 'Item created successfully!');
      onClose();
    } catch (error) {
      console.error('Error saving item:', error);
      alert(error.response?.data?.message || 'Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'premium_course', label: 'Premium Course' },
    { value: 'feature_unlock', label: 'Feature Unlock' },
    { value: 'content_access', label: 'Content Access' },
    { value: 'learning_aid', label: 'Learning Aid' },
    { value: 'profile_enhancement', label: 'Profile Enhancement' },
    { value: 'contest_entry', label: 'Contest Entry' },
    { value: 'gift_card', label: 'Gift Card' },
    { value: 'voucher', label: 'Voucher' },
    { value: 'merchandise', label: 'Merchandise' },
    { value: 'service', label: 'Service' },
    { value: 'subscription', label: 'Subscription' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {item ? 'Edit Item' : 'Create New Item'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Premium JavaScript Course"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Complete course with projects and certificates"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coin Price *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.coinPrice}
                  onChange={(e) => setFormData({ ...formData, coinPrice: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock (blank = unlimited)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Level
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.minLevel}
                  onChange={(e) => setFormData({ ...formData, minLevel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Tier
                </label>
                <select
                  value={formData.minTier}
                  onChange={(e) => setFormData({ ...formData, minTier: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No Requirement</option>
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="platinum">Platinum</option>
                  <option value="diamond">Diamond</option>
                  <option value="master">Master</option>
                  <option value="mythic">Mythic</option>
                </select>
              </div>
            </div>
          </div>

          {/* Purchase Limits */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Purchase Limits</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Per User Limit
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.purchaseLimitPerUser}
                  onChange={(e) => setFormData({ ...formData, purchaseLimitPerUser: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Unlimited"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Per Day Limit
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.purchaseLimitPerDay}
                  onChange={(e) => setFormData({ ...formData, purchaseLimitPerDay: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Unlimited"
                />
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Delivery</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Type
                </label>
                <select
                  value={formData.deliveryType}
                  onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="instant">Instant</option>
                  <option value="manual">Manual</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visibility
                </label>
                <select
                  value={formData.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="public">Public</option>
                  <option value="premium_only">Premium Only</option>
                  <option value="specific_roles">Specific Roles</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Instructions
              </label>
              <textarea
                value={formData.deliveryInfo}
                onChange={(e) => setFormData({ ...formData, deliveryInfo: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Access will be granted immediately upon purchase"
              />
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
            
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Featured Item</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  Saving...
                </>
              ) : (
                item ? 'Update Item' : 'Create Item'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalletItemForm;
