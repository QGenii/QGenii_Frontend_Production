import React from 'react';
import { Lock, Award } from 'lucide-react';

const BadgeCard = ({ badge, earned, progress, onClick }) => {
  const getTierColor = (tier) => {
    const colors = {
      bronze: 'from-amber-700 to-amber-900',
      silver: 'from-gray-400 to-gray-600',
      gold: 'from-yellow-400 to-yellow-600',
      platinum: 'from-gray-300 to-gray-400',
      diamond: 'from-cyan-300 to-blue-400',
      legendary: 'from-orange-400 to-red-500',
      mythic: 'from-purple-500 to-blue-600',
    };
    return colors[tier] || 'from-gray-400 to-gray-600';
  };

  const getRarityBadge = (rarity) => {
    const styles = {
      common: 'bg-gray-500',
      rare: 'bg-blue-500',
      epic: 'bg-purple-500',
      legendary: 'bg-orange-500',
      mythic: 'bg-gradient-to-r from-purple-500 to-blue-600',
    };
    return styles[rarity] || styles.common;
  };

  const progressPercentage = badge && progress !== undefined
    ? Math.min((progress / badge.criteria.target) * 100, 100)
    : 0;

  return (
    <div
      className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        earned ? 'hover:shadow-xl cursor-pointer' : 'opacity-60'
      }`}
      onClick={earned ? onClick : undefined}
    >
      {/* Rarity Badge */}
      {badge && (
        <div className={`absolute top-2 right-2 ${getRarityBadge(badge.rarity)} text-white text-xs px-2 py-1 rounded-full font-semibold uppercase z-10`}>
          {badge.rarity}
        </div>
      )}

      {/* Badge Icon */}
      <div className={`relative bg-gradient-to-br ${badge ? getTierColor(badge.tier) : 'from-gray-400 to-gray-600'} p-6 flex items-center justify-center`}>
        {earned ? (
          <div className="text-6xl">{badge.icon}</div>
        ) : (
          <Lock className="w-16 h-16 text-white opacity-50" />
        )}

        {/* Tier Badge */}
        {badge && (
          <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded-full font-semibold uppercase">
            {badge.tier}
          </div>
        )}
      </div>

      {/* Badge Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
          {earned ? badge.name : '???'}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {earned ? badge.description : 'Unlock this badge to reveal its details'}
        </p>

        {/* Progress Bar */}
        {!earned && badge && progress !== undefined && (
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress} / {badge.criteria.target}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${getTierColor(badge.tier)} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Points */}
        {badge && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Award className="w-4 h-4" />
              <span>{badge.pointValue} pts</span>
            </div>
            {earned && (
              <div className="text-xs text-green-600 font-semibold">
                ✓ EARNED
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeCard;
