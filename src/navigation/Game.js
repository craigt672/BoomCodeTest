import React from 'react';
import { useQuizCompletionCheck } from '../hooks/useQuizCompletionCheck';
import { Questions } from '../components/game/Questions';
import { Results } from '../components/game/Results';

export const Game = () => {
  const { hasCompletedQuiz } = useQuizCompletionCheck();

  if (hasCompletedQuiz) {
    return <Results />;
  }
  return <Questions />;
};
