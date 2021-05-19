import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, selectAuthStatus, selectAuthState, resetAuthStatus } from '../../redux/slices/authSlice';

import { Container } from '../base/Container';
import { AuthForm } from './AuthForm';
import { ScreenTitle } from '../base/ScreenTitle';

import { validateAuth } from '../../helpers/formValidator'
import { showAlert } from '../../helpers/showAlert'

export const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const signUpStatus = useSelector(selectAuthStatus);
  const authState = useSelector(selectAuthState);
  const isFocused = navigation.isFocused();

  useEffect(() => {
    if (isFocused && signUpStatus === "failed") {
      showAlert('Signup Failed', 'Unable to create the account. That account username may already exist.');
      dispatch(resetAuthStatus())
    }

  }, [signUpStatus, authState])

  const reset = () => {
    setUsername("");
    setPassword("");
  }

  const onSignup = () => {
    const { error, creds } = validateAuth(username, password)
    reset();

    if (error) return showAlert(error.title, error.message)
    dispatch(signup(creds));
  }

  return (
    <Container
      isLoading={signUpStatus === "loading"}
    >
      <ScreenTitle title="Create Account" />
      <AuthForm
        usernameTitle="Enter Username"
        passwordTitle="Enter Password"
        submitButtonTitle="Create"
        authNavigateText="Already have an account?"
        username={username}
        password={password}
        onUsernameChange={(val) => setUsername(val)}
        onPasswordChange={(val) => setPassword(val)}
        onSubmit={onSignup}
        onAuthNavigate={() => navigation.navigate('Login')}
      />
    </Container>
  );
}
