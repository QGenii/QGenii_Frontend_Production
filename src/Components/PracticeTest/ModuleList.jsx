import React from 'react';

/**
 * ModuleList Component
 * Displays modules in a numbered format (1. Module Title)
 * 
 * @param {Array} modules - Array of module objects with title property
 */
const ModuleList = ({ modules = [] }) => {
  if (!modules || modules.length === 0) {
    return null;
  }

  // Sort modules by order if available
  const sortedModules = [...modules].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return 0;
  });

  return (
    <div className="space-y-2">
      {sortedModules.map((module, index) => (
        <div key={module._id || index} className="text-sm">
          {index + 1}. {module.title}
        </div>
      ))}
    </div>
  );
};

export default ModuleList;


