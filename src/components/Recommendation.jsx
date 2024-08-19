
import React from 'react';

const Recommendation = ({ answers, onReturn }) => {

  const recommendation = "Based on your selections, we recommend...";

  return (
    <div>
      <h2 className="text-xl mb-4">Your Recommendation</h2>
      <p className="mb-4">{recommendation}</p>
      <button
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={onReturn}
      >
        Return
      </button>
    </div>
  );
};

export default Recommendation;