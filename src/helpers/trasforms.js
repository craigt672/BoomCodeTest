export const quizChoiceTransform = q => ({
  ...q,
  choices: [
    ...q.choices,
    {
      id: 'NOTA',
      ans: null,
      prompt: "None of the above"
    }
  ]
});
