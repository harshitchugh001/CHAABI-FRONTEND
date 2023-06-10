import React, { useEffect, useState , useCallback} from 'react';
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
  "The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium auctor ipsum nec varius. Phasellus in rhoncus mi. Vivamus eleifend scelerisque ligula, id fringilla nunc vestibulum et. Nulla facilisi. Praesent convallis consequat magna, at lobortis elit consequat id. Sed sagittis tincidunt felis, eu bibendum risus lobortis in.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce posuere volutpat dolor, a sollicitudin elit tincidunt nec. Nunc congue fringilla tellus at ultrices. Suspendisse sed dapibus lacus. Nullam sit amet purus ut lectus tristique tempus. Cras ut justo vel justo venenatis euismod. In hac habitasse platea dictumst.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc consectetur congue commodo. Integer pulvinar tincidunt mauris, sed blandit felis commodo et. Nam a varius lectus. Ut ac mauris ligula. Praesent vehicula velit id mauris laoreet, sed consequat dolor malesuada. Duis consequat dui dolor, eu tempor purus pharetra sed.",
  "Sed non ipsum euismod, faucibus nisi id, lobortis enim. Curabitur blandit lectus in nisi auctor dignissim. Morbi facilisis tortor non elit aliquet ullamcorper. Aenean ac nisl a est vulputate congue eu eget massa. Phasellus viverra congue cursus. Fusce eget ex nec odio gravida malesuada ac sit amet urna.",
  "Cras pulvinar metus a quam viverra, vitae pulvinar orci auctor. Fusce id malesuada lorem, at efficitur urna. Morbi auctor ultrices tincidunt. Phasellus sed fermentum neque. Fusce feugiat dui sed velit scelerisque, ut suscipit sapien facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  "Etiam non nisi vitae lacus fringilla dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras venenatis nisl a nunc tincidunt, non ultricies tellus semper. Pellentesque id feugiat tortor. In ut dui ut dolor lacinia pellentesque vitae a sem. In hac habitasse platea dictumst.",
  "Aliquam erat volutpat. Vestibulum maximus, nulla non dignissim fringilla, arcu nunc lacinia sapien, eu commodo orci mi a nulla. Fusce vehicula mi et enim fermentum, non fermentum odio tincidunt. Morbi tincidunt interdum lorem ac venenatis. Pellentesque mattis fringilla est, id fringilla enim semper a. Integer lobortis nibh id ligula accumsan, et faucibus tellus consequat.",
  "Phasellus accumsan tincidunt sem in aliquam. Nulla faucibus vestibulum ante id ultrices. Maecenas nec erat eget mauris luctus pharetra. Aliquam commodo ultricies nisi, a commodo lectus. Nulla quis massa scelerisque, laoreet erat vel, aliquam lacus. Nullam at lectus vitae purus elementum laoreet. Aliquam tempor odio vel purus lacinia aliquet."
];

const TypingGame = () => {
  const dispatch = useDispatch();
  const typingGame = useSelector((state) => state.typingGame);
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [remainingTime, setRemainingTime] = useState(300);

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
    setKeyPressCount(0);
    setRemainingTime(300);
  };

  const calculateWPM = useCallback((typedWordsCount, minutes) => {
    return Math.floor(typedWordsCount / minutes);
  }, []);

  const calculateAccuracy = useCallback((originalSentence, userSentence) => {
    let matchCount = 0;
    const totalCharacters = originalSentence.length;

    for (let i = 0; i < originalSentence.length; i++) {
      if (i < userSentence.length && originalSentence[i] === userSentence[i]) {
        matchCount += 1;
      }
    }

    const accuracy = (matchCount / totalCharacters) * 100;
    return accuracy;
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
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
      window.location.reload();
    },
    [dispatch, typingGame.currentSentence, typingGame.startTime, typingGame.typedText, calculateAccuracy, calculateWPM]
  );

  useEffect(() => {
    handleSentenceChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeyPressCount((count) => count + 1);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let timer = null;

    if (typingGame.startTime) {
      timer = setInterval(() => {
        const minutes = (Date.now() - typingGame.startTime) / 60000;
        const remainingTimeInSeconds = Math.max(0, Math.floor(300 - minutes * 60));
        setRemainingTime(remainingTimeInSeconds);

        if (remainingTimeInSeconds <= 0) {
          clearInterval(timer);
          handleFormSubmit(new Event('submit'));
        }
      }, 1000);
    }

    if (remainingTime === 0) {
      clearInterval(timer);
      alert(`Number of Key Presses: ${keyPressCount}`);
      window.location.reload();
    }

    return () => clearInterval(timer);
  }, [typingGame.startTime, handleFormSubmit, remainingTime, keyPressCount]);

  return (
    <div className="typing-game-container">
      <div className="content">
        <h1 className="heading">Typing Game</h1>
        <div className="sentences-box">
          <div className="sentence">
            <p>
              {typingGame.currentSentence.slice(0, typingGame.typedText.length)}
              <span className="remaining-characters">
                {typingGame.currentSentence.slice(typingGame.typedText.length)}
              </span>
            </p>
          </div>
          <div className='container '>
          <TypingAreaComponent
            typingGame={typingGame}
            typedText={typingGame.typedText}
            handleFormSubmit={handleFormSubmit}
            handleTextareaChange={(e) => dispatch(setTypedText(e.target.value))}
          />
          </div>
        </div>
        <div className="features">
          <div className="individual-feature">
            <p>WPM: {typingGame.wpm}</p>
          </div>
          <div className="individual-feature">
            <p>Accuracy: {typingGame.accuracy}%</p>
          </div>
          <div className="individual-feature">
            <p>Key Presses: {keyPressCount}</p>
          </div>
          <div className="individual-feature">
            <p>Time Remaining: {remainingTime} seconds</p>
          </div>
        </div>
        <button onClick={handleSentenceChange}>Change Sentence</button>
      </div>

      <div className="keyboard-container keyboard-letter-wrapper">
        <KeyboardComponent handleTextChange={handleTextChange} />
      </div>
    </div>
  );
};

export default TypingGame;
