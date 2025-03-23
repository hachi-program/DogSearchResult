import React from 'react';

function Question({ question, options, onAnswer }) {
  return (
    <div className="container mt-4">
      <h3 className="mb-3">{question}</h3>
      <div className="d-flex gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            className="btn btn-primary"
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
