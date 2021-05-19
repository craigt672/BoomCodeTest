import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, selectAuthStatus, selectAuthState, resetAuthStatus } from '../../redux/slices/authSlice'
import { View, StyleSheet } from 'react-native';

import { Container } from '../base/Container';
import { AuthForm } from './AuthForm';
import { ScreenTitle } from '../base/ScreenTitle';

import { validateAuth } from '../../helpers/formValidator'
import { showAlert } from '../../helpers/showAlert'

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginStatus = useSelector(selectAuthStatus);
  const authState = useSelector(selectAuthState);
  const isFocused = navigation.isFocused();

  useEffect(() => {
    if (isFocused && loginStatus === "failed") {
      showAlert('Login Failed', 'Unable to login to this account')
      dispatch(resetAuthStatus())
    }
  }, [loginStatus, authState])

  const reset = () => {
    setUsername("");
    setPassword("");
  }

  const onLogin = () => {
    const { error, creds } = validateAuth(username, password)
    reset();

    if (error) return showAlert(error.title, error.message)
    dispatch(login(creds))
  }

  return (
    <Container isLoading={loginStatus === "loading"}>
      <>
        <ScreenTitle title="Log In" />
        <AuthForm
          usernameTitle="Username"
          passwordTitle="Password"
          submitButtonTitle="Log In"
          authNavigateText="Create an account"
          username={username}
          password={password}
          onUsernameChange={(val) => setUsername(val)}
          onPasswordChange={(val) => setPassword(val)}
          onSubmit={onLogin}
          onAuthNavigate={() => navigation.navigate('Signup')}
        />
      </>
    </Container >
  );
}
