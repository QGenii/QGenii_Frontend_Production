import React from 'react';
import BadgeCard from './BadgeCard';

const BadgeGrid = ({ badges, onBadgeClick }) => {
  if (!badges || badges.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Badges Yet
        </h3>
        <p className="text-gray-500">
          Start learning and completing challenges to earn badges!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {badges.map((badgeData) => (
        <BadgeCard
          key={badgeData.badge?._id || badgeData._id}
          badge={badgeData.badge || badgeData}
          earned={badgeData.earned !== undefined ? badgeData.earned : true}
          progress={badgeData.progress}
          onClick={() => onBadgeClick && onBadgeClick(badgeData)}
        />
      ))}
    </div>
  );
};

export default BadgeGrid;
