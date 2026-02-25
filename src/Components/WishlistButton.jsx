import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { userProfileApi } from '../lib/userProfileApi';

const WishlistButton = ({ type, itemId, className = '', size = 'md', onToggle }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  useEffect(() => {
    checkWishlistStatus();
  }, [type, itemId]);

  const checkWishlistStatus = async () => {
    if (!itemId || !type) return;
    
    try {
      const response = await userProfileApi.checkWishlistStatus(type, itemId);
      setIsInWishlist(response.data.data.inWishlist);
    } catch (error) {
      console.error('Failed to check wishlist status:', error);
    }
  };

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    
    setLoading(true);
    try {
      if (isInWishlist) {
        if (type === 'courses') {
          await userProfileApi.removeCourseFromWishlist(itemId);
        } else {
          await userProfileApi.removeContestFromWishlist(itemId);
        }
        setIsInWishlist(false);
      } else {
        if (type === 'courses') {
          await userProfileApi.addCourseToWishlist(itemId);
        } else {
          await userProfileApi.addContestToWishlist(itemId);
        }
        setIsInWishlist(true);
      }
      // Call onToggle callback if provided (to refresh parent component)
      if (onToggle) {
        onToggle();
      }
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={loading}
      className={`
        ${sizeClasses[size]}
        ${isInWishlist 
          ? 'text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100' 
          : 'text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50'
        }
        rounded-full border transition-all duration-200 flex items-center justify-center
        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
        ${className}
      `}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart 
        size={iconSizes[size]} 
        fill={isInWishlist ? 'currentColor' : 'none'}
        className={loading ? 'animate-pulse' : ''}
      />
    </button>
  );
};

export default WishlistButton;