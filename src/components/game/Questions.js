import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchQuiz,
  addAnswer,
  selectQuizStatus,
  selectNumberOfQestions,
  selectNumberOfQestionsAnswered,
  selectCurrentQuestion,
} from '../../redux/slices/quizSlice';

import { Container } from '../base/Container';
import { SelectInputText } from '../base/Input'
import { ScreenTitle } from '../base/ScreenTitle';

import { showAlert } from '../../helpers/showAlert'

const styleSheet = StyleSheet.create({
  form: {
    marginBottom: 20,
    justifyContent: 'space-between',
    width: '100%'
  },
  inputView: {
    width: "100%",
    marginLeft: 10,
    marginBottom: 20
  },
  promptText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  submitText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F1F1F1'
  },
  submitBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#202020"
  }
});

const Question = ({ prompt, choices, onSelectChoice, selectedChoice }) => {
  const _renderChoices = choices => {
    return (
      <View style={styleSheet.inputView}>
        {choices.map((_, idx) => {
          const chr = String.fromCharCode(97 + idx)
          return (
            <SelectInputText key={_.id} isSelected={selectedChoice === _.id} onSelectText={() => onSelectChoice(_.id)}>
              {`${chr}) ${_.prompt}`}
            </SelectInputText>
          )
        })}
      </View>
    )
  }
  return (
    <View style={styleSheet.form}>
      <Text style={styleSheet.promptText}>{prompt}</Text>
      {_renderChoices(choices)}
    </View>
  )
}

export const Questions = () => {
  const [choice, setChoice] = useState(null);
  const dispatch = useDispatch();
  const quizStatus = useSelector(selectQuizStatus);
  const numberOfQuestions = useSelector(selectNumberOfQestions);
  const numberOfQuestionsAnswered = useSelector(selectNumberOfQestionsAnswered);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const lastQuestion = numberOfQuestionsAnswered + 1 === numberOfQuestions;

  useEffect(() => {
    if (!quizStatus) {
      dispatch(fetchQuiz());
    }

    if (quizStatus === "failed") {
      showAlert('Request Failed', 'Unable to get quiz questions. Try logging in again.');
    }
  }, [quizStatus])

  const onNext = () => {
    if (!choice) {
      showAlert('No Answer Selected', 'Please select an answer first to proceed.')
    } else {
      const answer = choice === 'NOTA' ? null : choice
      dispatch(addAnswer({ id: choice, question: currentQuestion.id, answer }))
    }
    setChoice(null)
  }

  return (
    <Container
      isLoading={quizStatus === "loading"}
      progress={currentQuestion ? `${numberOfQuestionsAnswered + 1}/${numberOfQuestions}` : null}
    >
      <ScreenTitle title={currentQuestion ? "Triva 101" : "Loading..."} />
      <Question
        prompt={currentQuestion?.prompt || 'Loading...'}
        selectedChoice={choice}
        choices={currentQuestion?.choices || []}
        onSelectChoice={setChoice}
      />
      {currentQuestion && (
        <TouchableOpacity style={styleSheet.submitBtn} onPress={onNext}>
          <Text style={styleSheet.submitText}>{lastQuestion ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      )}
    </Container>
  );
}
