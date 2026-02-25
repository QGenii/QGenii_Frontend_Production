import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { ShoppingCart, Check, X, Search, Filter, Star } from 'lucide-react';
import { Spinner } from '../ui/Spinner';

const CatalogBrowser = () => {
  const [items, setItems] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);

  useEffect(() => {
    fetchWallet();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [category, searchTerm]);

  const fetchWallet = async () => {
    try {
      const res = await api.get('/wallet/my-wallet');
      setWallet(res.data.data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category !== 'all') params.category = category;
      if (searchTerm) params.search = searchTerm;
      
      const res = await api.get('/wallet/catalog', { params });
      setItems(res.data.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (item) => {
    if (!confirm(`Purchase "${item.name}" for ${item.coinPrice} coins?`)) return;

    try {
      setPurchasing(item._id);
      await api.post('/wallet/purchase', {
        itemId: item._id,
        quantity: 1
      });
      alert('✅ Purchase successful! Check your purchases page.');
      fetchItems(); // Refresh items
      fetchWallet(); // Refresh balance
    } catch (error) {
      const message = error.response?.data?.message || 'Purchase failed';
      alert('❌ ' + message);
    } finally {
      setPurchasing(null);
    }
  };

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'premium_course', label: 'Premium Courses' },
    { value: 'feature_unlock', label: 'Feature Unlocks' },
    { value: 'content_access', label: 'Content Access' },
    { value: 'learning_aid', label: 'Learning Aids' },
    { value: 'profile_enhancement', label: 'Profile Themes' },
    { value: 'contest_entry', label: 'Contest Entries' },
    { value: 'gift_card', label: 'Gift Cards' },
    { value: 'voucher', label: 'Vouchers' },
    { value: 'merchandise', label: 'Merchandise' },
    { value: 'service', label: 'Services' },
    { value: 'subscription', label: 'Subscriptions' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Coin Catalog</h1>
        <p className="text-gray-600 mt-1">Purchase items using your coins</p>
      </div>

      {/* Balance Display */}
      {wallet && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Your Balance</p>
              <p className="text-3xl font-bold mt-1">{wallet.balance} Coins</p>
            </div>
            <ShoppingCart className="w-12 h-12 opacity-80" />
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No items found</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
              {/* Item Image */}
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                  <ShoppingCart className="w-16 h-16 text-white opacity-50" />
                </div>
              )}

              {/* Item Content */}
              <div className="p-5">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    {item.category.replace('_', ' ')}
                  </span>
                  {item.featured && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-blue-600">
                      {item.coinPrice}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">coins</span>
                  </div>
                  {item.originalPrice && item.originalPrice > item.coinPrice && (
                    <div className="text-right">
                      <span className="text-sm line-through text-gray-400">
                        {item.originalPrice}
                      </span>
                      <span className="block text-xs font-semibold text-red-600">
                        {item.discountPercent}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Stock Info */}
                {item.stock !== null && (
                  <p className="text-xs text-gray-500 mb-3">
                    {item.stock > 0 ? (
                      <>📦 {item.stock} in stock</>
                    ) : (
                      <>❌ Out of stock</>
                    )}
                  </p>
                )}

                {/* Purchase Button */}
                <button
                  onClick={() => handlePurchase(item)}
                  disabled={
                    !item.userStatus?.canAfford ||
                    !item.userStatus?.purchaseAllowed ||
                    purchasing === item._id
                  }
                  className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
                    item.userStatus?.canAfford && item.userStatus?.purchaseAllowed && purchasing !== item._id
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {purchasing === item._id ? (
                    <>
                      <Spinner size="sm" />
                      Processing...
                    </>
                  ) : item.userStatus?.canAfford && item.userStatus?.purchaseAllowed ? (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Purchase Now
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5" />
                      {item.userStatus?.reason || 'Cannot Purchase'}
                    </>
                  )}
                </button>

                {/* Requirements */}
                {(item.requirements?.minLevel || item.requirements?.minTier) && (
                  <div className="mt-3 text-xs text-gray-500">
                    Requires:
                    {item.requirements.minLevel && (
                      <span className="ml-1">Level {item.requirements.minLevel}</span>
                    )}
                    {item.requirements.minTier && (
                      <span className="ml-1 capitalize">
                        {item.requirements.minTier} tier
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogBrowser;
