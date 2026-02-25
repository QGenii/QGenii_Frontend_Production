import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import { Wallet, TrendingUp, TrendingDown, History, ShoppingBag, ArrowRight } from 'lucide-react';
import { Spinner } from '../ui/Spinner';

const WalletDashboard = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const [walletRes, transactionsRes] = await Promise.all([
        api.get('/wallet/my-wallet'),
        api.get('/wallet/my-transactions?limit=10')
      ]);
      
      setWallet(walletRes.data.data);
      setTransactions(transactionsRes.data.data.transactions);
      setError(null);
    } catch (error) {
      console.error('Error fetching wallet:', error);
      setError('Failed to load wallet data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-600 mt-1">Manage your coins and purchases</p>
        </div>
        <Link
          to="/wallet/catalog"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          Browse Catalog
        </Link>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-2">Available Balance</p>
            <h2 className="text-5xl font-bold">{wallet?.balance || 0}</h2>
            <p className="text-xl mt-1">Coins</p>
          </div>
          <Wallet className="w-20 h-20 opacity-80" />
        </div>
        
        <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20">
          <div>
            <p className="text-sm opacity-75 mb-1">Lifetime Earned</p>
            <p className="text-2xl font-semibold">{wallet?.lifetimeEarned || 0}</p>
          </div>
          <div>
            <p className="text-sm opacity-75 mb-1">Lifetime Spent</p>
            <p className="text-2xl font-semibold">{wallet?.lifetimeSpent || 0}</p>
          </div>
        </div>

        {wallet?.status !== 'active' && (
          <div className="mt-4 bg-red-500/20 border border-red-300 rounded-lg p-3">
            <p className="text-sm">⚠️ Wallet Status: {wallet?.status}</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {wallet?.pendingBalance || 0}
              </p>
            </div>
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Locked Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {wallet?.lockedBalance || 0}
              </p>
            </div>
            <Lock className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {(wallet?.balance || 0) - (wallet?.lockedBalance || 0)}
              </p>
            </div>
            <Wallet className="w-10 h-10 text-green-500" />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
            </div>
            <Link
              to="/wallet/transactions"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No transactions yet</p>
              <p className="text-sm mt-1">Start earning coins by completing courses and challenges!</p>
            </div>
          ) : (
            transactions.map((tx) => (
              <div key={tx._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {tx.type === 'credit' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tx.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{formatDate(tx.createdAt)}</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {tx.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${
                      tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Balance: {tx.balanceAfter}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* How to Earn Coins */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 How to Earn Coins</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">+100</span>
            <span>Complete a course</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">+5-20</span>
            <span>Solve practice problems</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">+50</span>
            <span>Publish a blog</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">+30-200</span>
            <span>Participate in contests</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">+20-100</span>
            <span>Earn badges</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">+5</span>
            <span>Daily login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing import
import { Clock, Lock } from 'lucide-react';

export default WalletDashboard;
