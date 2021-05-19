import React, { useEffect } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import {
  resetQuizStatus,
  getQuizResults,
  getQuizScore,
  selectQuizStatus,
  selectQuestionResults,
  selectNumberOfQestions,
  selectNumberOfCorrectedAnswers,
  selectQuizScore,
  resetQuiz
} from '../../redux/slices/quizSlice';
import { resetAuth } from '../../redux/slices/authSlice';

import { SelectInputText } from '../base/Input'

import { showAlert } from '../../helpers/showAlert'

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 60
  },
  form: {
    marginBottom: 20,
    justifyContent: 'space-between',
    width: '100%'
  },
  inputView: {
    marginLeft: 20,
    marginBottom: 20
  },
  promptText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    flexShrink: 1
  },
  submitText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F1F1F1'
  },
  submitBtn: {
    width: "45%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: "#202020"
  },
  btnWrap: {
    flex: 0.1,
    paddingTop: 5,
    paddingBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const Question = ({ idx, prompt, choices, rightChoice, selectedChoice }) => {
  const _renderChoices = choices => {
    return (
      <View style={styleSheet.inputView}>
        {choices.map((_, idx) => {
          const chr = String.fromCharCode(97 + idx)
          return (
            <SelectInputText italic={selectedChoice !== rightChoice && selectedChoice === _.id} disable key={_.id} isSelected={_.id === rightChoice}>
              {`${chr}) ${_.prompt}`}
            </SelectInputText>
          )
        })}
      </View>
    )
  }
  return (
    <View style={styleSheet.form}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <Text style={styleSheet.promptText}>{`${idx}) `}</Text>
        <Text style={styleSheet.promptText}>{prompt}</Text>
      </View>
      {_renderChoices(choices)}
    </View>
  )
}

const renderItem = ({ item, index }) => {
  return (
    <Question
      idx={index + 1}
      prompt={item.prompt}
      rightChoice={item.correctAnswer || 'NOTA'}
      selectedChoice={item.selectedAnswer}
      choices={item.choices}
    />
  );
};

export const Results = () => {
  const dispatch = useDispatch();
  const quizStatus = useSelector(selectQuizStatus);
  const quizResults = useSelector(selectQuestionResults);
  const numberOfCorrectedAnswers = useSelector(selectNumberOfCorrectedAnswers);
  const numberOfQestions = useSelector(selectNumberOfQestions);
  const score = useSelector(selectQuizScore);

  useEffect(() => {
    dispatch(resetQuizStatus());
  }, [])

  useEffect(() => {
    if (!quizStatus && score === null) {
      dispatch(getQuizResults());
      dispatch(getQuizScore());
    }

    if (quizStatus === "failed") {
      showAlert('Request Failed', 'Unable to get quiz questions. Try logging in again.');
      logout();
    }
  }, [quizStatus, score])

  const logout = () => {
    dispatch(resetAuth());
    dispatch(resetQuiz());
  }

  const showScores = () => {
    const totalQuestions = `\nTotal Questions: ${numberOfQestions}\n\n`;
    const totalCorrect = `Total Correct: ${numberOfCorrectedAnswers}\n\n`;
    const quizScore = `Quiz Score: ${((numberOfCorrectedAnswers / numberOfQestions) * 100).toFixed()}%\n\n`;
    const userScore = `User Score: ${score}\n`;

    const quizResultAlertBody = totalQuestions + totalCorrect + quizScore + userScore;

    showAlert(
      'Results:',
      quizResultAlertBody
    );
  }

  return (
    <View style={styleSheet.container}>
      {quizStatus === "loading" ? (
        <View style={styleSheet.loading}>
          <ActivityIndicator size='large' color="#1876D1" />
        </View>
      ) : (
        <>
          <View style={{ flex: 0.9 }}>
            <FlatList
              data={quizResults}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              stickyHeaderIndices={[0]}
              ListHeaderComponent={
                <View style={{ backgroundColor: 'white', paddingTop: 60 }}>
                  <Text style={styleSheet.title}>Quiz Results</Text>
                </View>
              }
            />
          </View>
          <View style={styleSheet.btnWrap}>
            <TouchableOpacity style={styleSheet.submitBtn} onPress={showScores}>
              <Text style={styleSheet.submitText}>Score</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styleSheet.submitBtn} onPress={logout}>
              <Text style={styleSheet.submitText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}
