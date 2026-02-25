import React from 'react';
import { Award, TrendingUp } from 'lucide-react';

const BadgeProgressBar = ({ recommendedBadges }) => {
  if (!recommendedBadges || recommendedBadges.length === 0) {
    return null;
  }

  const getTierColor = (tier) => {
    const colors = {
      bronze: 'bg-gradient-to-r from-amber-700 to-amber-900',
      silver: 'bg-gradient-to-r from-gray-400 to-gray-600',
      gold: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      platinum: 'bg-gradient-to-r from-gray-300 to-gray-400',
      diamond: 'bg-gradient-to-r from-cyan-300 to-blue-400',
      legendary: 'bg-gradient-to-r from-orange-400 to-red-500',
      mythic: 'bg-gradient-to-r from-purple-500 to-blue-600',
    };
    return colors[tier] || 'bg-gradient-to-r from-gray-400 to-gray-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Next Badges
        </h3>
        <Award className="w-6 h-6 text-purple-600" />
      </div>

      <p className="text-sm text-gray-600 mb-4">
        You're making great progress! Keep going to earn these badges:
      </p>

      <div className="space-y-4">
        {recommendedBadges.map((item, index) => {
          const { badge, progress, progressPercentage } = item;
          
          return (
            <div key={badge._id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">{badge.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {badge.name}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {badge.description}
                  </p>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span className="font-semibold">
                    {progress} / {badge.criteria.target} ({Math.round(progressPercentage)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${getTierColor(badge.tier)} h-3 rounded-full transition-all duration-300`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="uppercase font-semibold">{badge.tier}</span>
                <span className="uppercase font-semibold">{badge.rarity}</span>
                <span className="font-semibold text-purple-600">{badge.pointValue} pts</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeProgressBar;
