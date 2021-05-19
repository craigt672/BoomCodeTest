import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BoomApi from '../../api';
import { quizChoiceTransform } from '../../helpers/trasforms'

export const fetchQuiz = createAsyncThunk(
  'quiz/fetchQuiz',
  async (_, { getState }) => {
    const { auth } = getState();
    const result = await BoomApi.getQuiz(auth.accessToken);
    const transformedResult = result.quiz.map(quizChoiceTransform);
    return transformedResult;
  }
)

export const getQuizResults = createAsyncThunk(
  'quiz/getQuizResults',
  async (_, { getState }) => {
    const { auth, quiz } = getState();
    const quizResults = await BoomApi.submitQuizAnswers(auth.accessToken, quiz.choices);
    return quizResults.scores
  }
)

export const getQuizScore = createAsyncThunk(
  'quiz/getQuizScore',
  async (_, { getState }) => {
    const { auth } = getState();
    const quizScore = await BoomApi.getUserScore(auth.username);
    return quizScore.score
  }
)

// INITIAL STATE
const initialState = {
  questions: [],
  choices: [],
  results: [],
  score: null,
  status: null
};

// SLICE
const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addAnswer(state, { payload }) {
      state.choices.push(payload);
    },
    resetQuizStatus(state) {
      state.status = null;
    },
    resetQuiz() {
      return initialState;
    }
  },
  extraReducers: {
    [fetchQuiz.pending]: state => {
      state.status = 'loading';
    },
    [fetchQuiz.rejected]: state => {
      state.status = 'failed';
    },
    [fetchQuiz.fulfilled]: (state, { payload }) => {
      state.questions = payload
      state.status = 'success';
    },
    [getQuizResults.pending]: state => {
      state.status = 'loading';
    },
    [getQuizResults.rejected]: state => {
      state.status = 'failed';
    },
    [getQuizResults.fulfilled]: (state, { payload }) => {
      state.results = payload
      state.status = 'success';
    },
    [getQuizScore.pending]: state => {
      state.status = 'loading';
    },
    [getQuizScore.rejected]: state => {
      state.status = 'failed';
    },
    [getQuizScore.fulfilled]: (state, { payload }) => {
      state.score = payload
      state.status = 'success';
    },
  },
});

// EXPORTS
export const { addAnswer, resetQuizStatus, resetQuiz } = quizSlice.actions;

export const selectQuizState = state => state.quiz;
export const selectQuizStatus = state => state.quiz.status;
export const selectNumberOfQestions = state => state.quiz.questions.length;
export const selectNumberOfQestionsAnswered = state => state.quiz.choices.length;
export const selectCurrentQuestion = state => state.quiz.questions[state.quiz.choices.length];
export const selectQuizScore = state => state.quiz.score;
export const selectQuestionResults = (state) => {
  const map = state.quiz.questions.reduce((accObj, question) => {
    let { id } = question;
    const result = state.quiz.results.find((_) => _.id === id)
    const choice = state.quiz.choices.find((_) => _.question === id)
    return { ...accObj, [id]: { ...question, ...result, selectedAnswer: choice.id } };
  }, {});
  return Object.values(map);
}
export const selectNumberOfCorrectedAnswers = state => state.quiz.results.reduce((acc, curr) => {
  const num = curr.isCorrect ? 1 : 0;
  return acc + num;
}, 0);

export const quizReducer = quizSlice.reducer;
