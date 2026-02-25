import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Package, TrendingUp, DollarSign, Search } from 'lucide-react';
import { Spinner } from '../ui/Spinner';
import WalletItemForm from './WalletItemForm';

const WalletItemManager = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchItems();
    fetchStats();
  }, [categoryFilter]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = {};
      if (categoryFilter !== 'all') params.category = categoryFilter;
      if (searchTerm) params.search = searchTerm;

      const res = await api.get('/wallet/admin/items', { params });
      setItems(res.data.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/wallet/admin/catalog-stats');
      setStats(res.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleToggleStatus = async (itemId) => {
    try {
      await api.patch(`/wallet/admin/items/${itemId}/toggle`);
      fetchItems();
      fetchStats();
    } catch (error) {
      alert('Error toggling status');
    }
  };

  const handleDelete = async (itemId) => {
    if (!confirm('Delete this item? This action cannot be undone.')) return;
    
    try {
      await api.delete(`/wallet/admin/items/${itemId}`);
      fetchItems();
      fetchStats();
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchItems();
    fetchStats();
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'premium_course', label: 'Premium Courses' },
    { value: 'feature_unlock', label: 'Feature Unlocks' },
    { value: 'content_access', label: 'Content Access' },
    { value: 'learning_aid', label: 'Learning Aids' },
    { value: 'profile_enhancement', label: 'Profile Enhancement' },
    { value: 'contest_entry', label: 'Contest Entry' },
    { value: 'gift_card', label: 'Gift Cards' },
    { value: 'voucher', label: 'Vouchers' },
    { value: 'merchandise', label: 'Merchandise' },
    { value: 'service', label: 'Services' },
    { value: 'subscription', label: 'Subscriptions' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wallet Catalog Management</h1>
          <p className="text-gray-600 mt-1">Manage purchasable items in the coin store</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Item
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalItems}</p>
              </div>
              <Package className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Items</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.activeItems}</p>
              </div>
              <ToggleRight className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalRevenue}</p>
              </div>
              <DollarSign className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Purchases</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalPurchases}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchItems()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Items Table */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-10 h-10 rounded object-cover mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-200 mr-3 flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          {item.featured && (
                            <span className="text-xs text-yellow-600">⭐ Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.category.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <span className="font-semibold text-gray-900">{item.coinPrice}</span>
                        <span className="text-gray-500 ml-1">coins</span>
                        {item.originalPrice > item.coinPrice && (
                          <div className="text-xs text-red-600">
                            {item.discountPercent}% off
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.stock === null ? 'Unlimited' : item.stock}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.totalPurchases}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.totalRevenue}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {item.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleStatus(item._id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Toggle Status"
                        >
                          {item.active ? (
                            <ToggleRight className="w-5 h-5" />
                          ) : (
                            <ToggleLeft className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-gray-600 hover:text-gray-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {items.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No items found</p>
            </div>
          )}
        </div>
      )}

      {/* Item Form Modal */}
      {showForm && (
        <WalletItemForm
          item={editingItem}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default WalletItemManager;
