
import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const KeyboardComponent = ({ handleTextChange}) => {
  return (
    <div className="keyboard-wrapper">
      <Keyboard
        layout={{
          default: [
            '1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            '{tab} q w e r t y u i o p [ ] \\',
            '{capslock} a s d f g h j k l ; \' {enter}',
            '{shiftleft} z x c v b n m , . / {shiftright}',
            '{ctrlleft} {altleft} {space} {altright} {ctrlright}',
          ],
          shift: [
            '! @ # $ % ^ & * ( ) _ + {bksp}',
            '{tab} Q W E R T Y U I O P { } |',
            '{capslock} A S D F G H J K L : " {enter}',
            '{shiftleft} Z X C V B N M < > ? {shiftright}',
            '{ctrlleft} {altleft} {space} {altright} {ctrlright}',
          ],
        }}
        onKeyPress={handleTextChange}
      />
    </div>
  );
};

export default KeyboardComponent;
