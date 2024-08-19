import React, { useState } from 'react';

const UserInput = ({ onSubmit, isLoading, isDisabled, showParagraph, setShowParagraph }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
      setShowParagraph(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative left-0 right-0 bg-[#0A1015] p-4">
      <div className="flex flex-col mb-5">
        {showParagraph && (
          <div className="text-center font-bold text-2xl mb-8 mt-8 text-white">
            <p>What do you need to know to choose your best PC?</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about PC specifications..."
            className="flex-grow p-2 py-4 rounded bg-gray-700 text-white"
            hidden={isDisabled}
          />
          <button
            type="submit"
            hidden={isDisabled}
            className={`bg-[#5363EE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700`}
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserInput;
