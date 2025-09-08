
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      <p className="text-lg text-gray-600 font-medium">Crafting your personalized plan...</p>
    </div>
  );
};

export default Spinner;
