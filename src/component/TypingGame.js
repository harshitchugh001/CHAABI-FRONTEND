
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import KeyboardComponent from './KeyboardComponent';
import TypingAreaComponent from './TypingAreaComponent';
import {
  setCurrentSentence,
  setTypedText,
  setStartTime,
  setEndTime,
  setWPM,
  setAccuracy,
  
} from '../redux/typingGameSlice';
import './main.css';

const sentences = [
  'Dream big, work hard, achieve greatness.',
  'Embrace change and unleash your true potential.',
  'Love yourself, spread kindness, create happiness.',
  'Believe in yourself and never give up.',
  'Find joy in the little things every day.',
  'Chase your dreams with passion and perseverance.',
  'Celebrate life’s journey with a grateful heart.',
  'The quick brown fox jumps over the lazy dog.',
  'Sphinx of black quartz, judge my vow.',
  'Pack my box with five dozen liquor jugs.',
  'How vexingly quick daft zebras jump!',
];

const TypingGame = () => {
  const dispatch = useDispatch();
  const typingGame = useSelector((state) => state.typingGame);

  const handleTextChange = (button) => {
    const value = button.toUpperCase();

    if (!typingGame.startTime) {
      dispatch(setStartTime(Date.now()));
    }

    if (/[a-zA-Z]/.test(value)) {
      dispatch(setTypedText(typingGame.typedText + value));
    }
  };

  const handleSentenceChange = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const sentence = sentences[randomIndex];

    dispatch(setCurrentSentence(sentence));
    dispatch(setTypedText(''));
    dispatch(setStartTime(Date.now()));
    dispatch(setEndTime(0));
    dispatch(setWPM(0));
    dispatch(setAccuracy(0));
  };

  const calculateWPM = (typedWordsCount, minutes) => {
    return Math.floor(typedWordsCount / minutes);
  };

  const calculateAccuracy = (originalSentence, userSentence) => {
    let matchCount = 0;
    const totalCharacters = originalSentence.length;

    for (let i = 0; i < originalSentence.length; i++) {
      if (i < userSentence.length && originalSentence[i] === userSentence[i]) {
        matchCount += 1;
      }
    }

    const accuracy = (matchCount / totalCharacters) * 100;
    return accuracy;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const originalSentence = typingGame.currentSentence;
    const userSentence = typingGame.typedText;

    const accuracy = calculateAccuracy(originalSentence, userSentence);

    const typedWordsCount = userSentence.trim().split(' ').length;

    const endTime = Date.now();
    const minutes = (endTime - typingGame.startTime) / 60000;

    const calculatedWPM = calculateWPM(typedWordsCount + 1, minutes);

    dispatch(setWPM(calculatedWPM));
    dispatch(setAccuracy(accuracy.toFixed(2)));
  };

  useEffect(() => {
    handleSentenceChange();
  }, []);

  return (
    <div className="typing-game-container">
      <div className="content">
        <h1 className="heading">Typing Game</h1>
        <div className="sentences-box">
          <div className="sentence">
            <p>
              {typingGame.currentSentence.slice(
                0,
                typingGame.typedText.length
              )}
              <span className="remaining-characters">
                {typingGame.currentSentence.slice(typingGame.typedText.length)}
              </span>
            </p>
          </div>
          <TypingAreaComponent
            typingGame={typingGame}
            typedText={typingGame.typedText}
            handleFormSubmit={handleFormSubmit}
            handleTextareaChange={(e) => dispatch(setTypedText(e.target.value))}
          />
        </div>
        <div className="features">
          <div className="individual-feature">
            <p>WPM: {typingGame.wpm}</p>
          </div>
          <div className="individual-feature">
            <p>Accuracy: {typingGame.accuracy}%</p>
          </div>
        </div>
        <button onClick={handleSentenceChange}>Change Sentence</button>
      </div>

      <div className="keyboard-container keyboard-letter-wrapper">
      

        <KeyboardComponent  handleTextChange={handleTextChange} />
      </div>
    </div>
  );
};

export default TypingGame;
