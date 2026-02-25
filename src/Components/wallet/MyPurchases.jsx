import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import { Package, Eye, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Spinner } from '../ui/Spinner';

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPurchases();
  }, [filter]);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const res = await api.get('/wallet/my-purchases', { params });
      setPurchases(res.data.data.purchases);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Purchases</h1>
        <p className="text-gray-600 mt-1">View your purchase history</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {['all', 'completed', 'pending', 'failed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                filter === status
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Purchases List */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      ) : purchases.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No purchases found</p>
          <p className="text-gray-500 text-sm mb-6">
            Browse the catalog to make your first purchase
          </p>
          <Link
            to="/wallet/catalog"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((purchase) => (
            <div
              key={purchase._id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  {/* Item Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {purchase.item?.name || 'Item'}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                        {purchase.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {purchase.item?.description || 'No description available'}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(purchase.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span>Quantity: {purchase.quantity}</span>
                      </div>
                      {purchase.deliveryStatus && (
                        <div className="flex items-center gap-2">
                          {getStatusIcon(purchase.deliveryStatus)}
                          <span className="capitalize">{purchase.deliveryStatus}</span>
                        </div>
                      )}
                    </div>

                    {/* Delivery Details */}
                    {purchase.deliveryDetails && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
                        <p className="font-medium mb-1">Delivery Details:</p>
                        <p>{purchase.deliveryDetails}</p>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="ml-6 text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {purchase.coinsSpent}
                    </p>
                    <p className="text-sm text-gray-500">coins</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPurchases;
