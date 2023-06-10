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
    const progress = Math.floor((typedText.length / currentSentence.length) * 100);
    return progress;
  };

  const progress = calculateProgress(
    typingGame.currentSentence,
    typingGame.typedText
  );

  const getNextKey = () => {
    const { currentSentence, typedText } = typingGame;
    const nextKeyIndex = typedText.length;
    return currentSentence[nextKeyIndex];
  };

  const nextKey = getNextKey();

  return (
    <div className="input-box">
      <form onSubmit={handleFormSubmit}>
        <div className="progress-bar-container">
          <progress value={progress} max={100} />
        </div>
        <div>
          <textarea
            value={typedText}
            onChange={handleTextareaChange}
            onFocus={handleTextareaFocus}
            onBlur={handleTextareaBlur}
            placeholder="Start typing..."
            rows={4}
            cols={50}
          />
          <div className="next-key">
            Next Key: <span className="highlight">{nextKey}</span>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TypingAreaComponent;
