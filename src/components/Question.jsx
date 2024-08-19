
import React from 'react';

const Question = ({ question, onAnswer }) => {
  return (
    <div className="mb-8 mt-4">
      <h2 className="text-2xl font-semibold mb-4">{question.text}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-1/2 mx-auto  ">
        {question.options.map((option) => (
          <button
            key={option}
            className="bg-[#2B3035] hover:bg-[#5363EE] w-[172px] text-white font-bold py-[10px] rounded-2xl"
            onClick={() => onAnswer(question.id, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;