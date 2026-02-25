import React from 'react';
import { X, Award, Calendar, TrendingUp, Lock } from 'lucide-react';

const BadgeModal = ({ badge, earned, earnedAt, progress, onClose }) => {
  if (!badge) return null;

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

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'text-gray-600',
      rare: 'text-blue-600',
      epic: 'text-purple-600',
      legendary: 'text-orange-600',
      mythic: 'text-purple-700',
    };
    return colors[rarity] || colors.common;
  };

  const progressPercentage = progress !== undefined
    ? Math.min((progress / badge.criteria.target) * 100, 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header with gradient */}
        <div className={`relative bg-gradient-to-br ${getTierColor(badge.tier)} p-8 text-white`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center text-center">
            {/* Badge Icon */}
            <div className="text-8xl mb-4 animate-bounce">
              {earned ? badge.icon : <Lock className="w-24 h-24" />}
            </div>

            {/* Badge Name */}
            <h2 className="text-3xl font-bold mb-2">
              {earned ? badge.name : 'Locked Badge'}
            </h2>

            {/* Tier & Rarity */}
            <div className="flex gap-3">
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold uppercase">
                {badge.tier}
              </span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold uppercase">
                {badge.rarity}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">
              {earned ? badge.description : 'Complete the requirements to unlock this badge and reveal its description.'}
            </p>
          </div>

          {/* Criteria */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">
                  {badge.criteria.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className="font-semibold text-gray-900">
                  {earned ? '✓ ' : ''}{progress || 0} / {badge.criteria.target}
                </span>
              </div>
              {!earned && (
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`bg-gradient-to-r ${getTierColor(badge.tier)} h-3 rounded-full transition-all duration-300`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Award className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {badge.pointValue}
              </div>
              <div className="text-xs text-gray-600">Points</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className={`text-2xl font-bold ${getRarityColor(badge.rarity)}`}>
                {badge.rarity}
              </div>
              <div className="text-xs text-gray-600">Rarity</div>
            </div>

            {earned && earnedAt && (
              <div className="bg-green-50 rounded-lg p-4 text-center col-span-2 md:col-span-1">
                <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-green-600">
                  {new Date(earnedAt).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-600">Earned Date</div>
              </div>
            )}
          </div>

          {/* Next Tier */}
          {earned && badge.nextTierBadgeId && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Next Tier Available</h3>
              </div>
              <p className="text-sm text-gray-600">
                Keep going to unlock the next tier of this badge!
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6">
            {earned ? (
              <button
                onClick={onClose}
                className={`w-full bg-gradient-to-r ${getTierColor(badge.tier)} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition`}
              >
                Awesome! 🎉
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Keep Working!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;
