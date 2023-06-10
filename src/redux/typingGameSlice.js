import { createSlice } from '@reduxjs/toolkit';

const typingGameSlice = createSlice({
  name: 'typingGame',
  initialState: {
    currentSentence: '',
    typedText: '',
    startTime: 0,
    endTime: 0,
    wpm: 0,
    accuracy: 100,
    
  },
  reducers: {
    setCurrentSentence: (state, action) => {
      state.currentSentence = action.payload;
    },
    setTypedText: (state, action) => {
      state.typedText = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    setWPM: (state, action) => {
      state.wpm = action.payload;
    },
    setAccuracy: (state, action) => {
      state.accuracy = action.payload;
    },
   
  },
});

export const {
  setCurrentSentence,
  setTypedText,
  setStartTime,
  setEndTime,
  setWPM,
  setAccuracy,
  setKeyPresses,
 
} = typingGameSlice.actions;

export default typingGameSlice.reducer;
