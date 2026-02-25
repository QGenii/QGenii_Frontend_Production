import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Spinner } from '../../Components/ui/Spinner';
import WishlistButton from '../../Components/WishlistButton';
import { userProfileApi } from '../../lib/userProfileApi';
import {
  Heart,
  BookOpen,
  Trophy,
  Calendar,
  DollarSign,
  User,
  Trash2,
  Filter
} from 'lucide-react';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState({ courses: [], contests: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [clearingType, setClearingType] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await userProfileApi.getWishlist();
      console.log('Wishlist API response:', response.data);
      const wishlistData = response.data.data.wishlist || { courses: [], contests: [] };
      // Ensure arrays exist
      wishlistData.courses = wishlistData.courses || [];
      wishlistData.contests = wishlistData.contests || [];
      setWishlist(wishlistData);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      // Set empty wishlist on error to show empty state
      setWishlist({ courses: [], contests: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleClearWishlist = async (type) => {
    if (!confirm(`Are you sure you want to clear ${type === 'all' ? 'your entire wishlist' : `all ${type}`}?`)) {
      return;
    }

    try {
      setClearingType(type);
      await userProfileApi.clearWishlist(type === 'all' ? null : type);
      await fetchWishlist();
    } catch (error) {
      console.error('Failed to clear wishlist:', error);
    } finally {
      setClearingType(null);
    }
  };

  const getFilteredItems = () => {
    switch (activeTab) {
      case 'courses':
        return { courses: wishlist.courses, contests: [] };
      case 'contests':
        return { courses: [], contests: wishlist.contests };
      default:
        return wishlist;
    }
  };

  const filteredItems = getFilteredItems();
  const totalItems = wishlist.courses.length + wishlist.contests.length;

  console.log('Wishlist state:', wishlist);
  console.log('Total items:', totalItems);
  console.log('Filtered items:', filteredItems);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Heart className="text-red-500" size={24} fill="currentColor" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Wishlist</h2>
            <p className="text-gray-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
        </div>

        {totalItems > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => handleClearWishlist('courses')}
              disabled={clearingType === 'courses' || wishlist.courses.length === 0}
              className="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {clearingType === 'courses' ? 'Clearing...' : 'Clear Courses'}
            </button>
            <button
              onClick={() => handleClearWishlist('contests')}
              disabled={clearingType === 'contests' || wishlist.contests.length === 0}
              className="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {clearingType === 'contests' ? 'Clearing...' : 'Clear Contests'}
            </button>
            <button
              onClick={() => handleClearWishlist('all')}
              disabled={clearingType === 'all'}
              className="px-3 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {clearingType === 'all' ? 'Clearing...' : 'Clear All'}
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        {[
          { key: 'all', label: 'All Items', count: totalItems },
          { key: 'courses', label: 'Courses', count: wishlist.courses.length },
          { key: 'contests', label: 'Contests', count: wishlist.contests.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Content */}
      {totalItems === 0 ? (
        <div className="text-center py-12">
          <Heart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Save courses and contests you're interested in to view them later
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/courses"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              to="/contests"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Browse Contests
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Courses Section */}
          {filteredItems.courses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={20} className="text-blue-500" />
                <h2 className="text-lg font-semibold">Courses ({filteredItems.courses.length})</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.courses.map((course) => (
                  <Card key={course._id} className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Link
                          to={`/courses/${course._id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
                        >
                          {course.title}
                        </Link>
                        <WishlistButton
                          type="courses"
                          itemId={course._id}
                          size="sm"
                          className="ml-2 flex-shrink-0"
                        />
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                          {course.level}
                        </span>
                        {course.price > 0 ? (
                          <span className="font-semibold text-green-600">
                            ${course.price}
                          </span>
                        ) : (
                          <span className="font-semibold text-blue-600">Free</span>
                        )}
                      </div>

                      {course.mentor && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User size={14} />
                          <span>{course.mentor.name}</span>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Contests Section */}
          {filteredItems.contests.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={20} className="text-amber-500" />
                <h2 className="text-lg font-semibold">Contests ({filteredItems.contests.length})</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.contests.map((contest) => (
                  <Card key={contest._id} className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Link
                          to={`/contests/${contest._id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
                        >
                          {contest.title}
                        </Link>
                        <WishlistButton
                          type="contests"
                          itemId={contest._id}
                          size="sm"
                          className="ml-2 flex-shrink-0"
                        />
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {contest.description}
                      </p>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>
                            {new Date(contest.startDate).toLocaleDateString()} - {' '}
                            {new Date(contest.endDate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${contest.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : contest.status === 'upcoming'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                            {contest.status}
                          </span>

                          {contest.creator && (
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span className="text-xs">{contest.creator.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;