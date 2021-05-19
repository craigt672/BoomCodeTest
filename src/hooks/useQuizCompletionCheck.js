import { useSelector } from 'react-redux';
import {
  selectNumberOfQestions,
  selectNumberOfQestionsAnswered,
} from '../redux/slices/quizSlice';

export function useQuizCompletionCheck() {
  const numberOfQuestions = useSelector(selectNumberOfQestions);
  const numberOfQuestionsAnswered = useSelector(selectNumberOfQestionsAnswered);

  const hasCompletedQuiz = numberOfQuestions && numberOfQuestions === numberOfQuestionsAnswered;

  return {
    hasCompletedQuiz,
  };
}
