import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  learnWords: [],
  skipWords: [],
  rightWords: [],
}

const learnStore = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    setLearnWords(state, action) {
        const newWord = action.payload;
        const exists = state.learnWords.some(word => word.id === newWord.id);

        if (!exists) {
            state.learnWords.push(newWord);
        }
    },
    setSkipWords(state, action) {
        const newWord = action.payload;
        const exists = state.skipWords.some(word => word.id === newWord.id);

        if (!exists) {
            state.skipWords.push(newWord);
        }
    },
    setRightWords(state, action) {
       const newWord = action.payload;
        const exists = state.rightWords.some(word => word.id === newWord.id);

        if (!exists) {
            state.rightWords.push(newWord);
        }
    },
  },
  
})

// export const { getInfo } = employerStore.actions
export const { setLearnWords, setSkipWords, setRightWords } = learnStore.actions

export default learnStore.reducer

