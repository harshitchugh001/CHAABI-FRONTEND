import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TypingGame from './component/TypingGame';

const App = () => {
  return (
    <Provider store={store}>
      <TypingGame />
    </Provider>
  );
};

export default App;
