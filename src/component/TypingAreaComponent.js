import React from 'react';

const TypingAreaComponent = ({
  typingGame, 
  typedText,
  handleFormSubmit,
  handleTextareaChange,
  handleTextareaFocus,
  handleTextareaBlur,
}) => {
  const calculateProgress = (currentSentence, typedText) => {
    const progress = Math.floor(
      (typedText.length / currentSentence.length) * 100
    );
    return progress;
  };

  const progress = calculateProgress(typingGame.currentSentence, typingGame.typedText);

  return (
    <div className="input-box">
      <form onSubmit={handleFormSubmit}>
        <div className="progress-bar-container">
          <progress value={progress} max={100} />
        </div>
        <textarea
          value={typedText}
          onChange={handleTextareaChange}
          onFocus={handleTextareaFocus}
          onBlur={handleTextareaBlur}
          placeholder="Start typing..."
          rows={4}
          cols={50}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TypingAreaComponent;
