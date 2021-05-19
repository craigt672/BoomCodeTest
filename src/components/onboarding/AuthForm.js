import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { TextInput } from '../base/Input'

const styleSheet = StyleSheet.create({
  form: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  submitText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F1F1F1'
  },
  navText: {
    textAlign: 'center',
    fontSize: 18,
    color: "#202020"
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

export const AuthForm = ({
  containerStyles = {},
  usernameTitle,
  passwordTitle,
  submitButtonTitle,
  authNavigateText,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onAuthNavigate
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ ...styleSheet.form, ...containerStyles }}
    >
      <TextInput
        title={usernameTitle}
        value={username}
        onChangeText={onUsernameChange}
      />
      <TextInput
        secureTextEntry
        title={passwordTitle}
        value={password}
        onChangeText={onPasswordChange}
      />
      <TouchableOpacity style={styleSheet.submitBtn} onPress={onSubmit}>
        <Text style={styleSheet.submitText}>{submitButtonTitle}</Text>
      </TouchableOpacity>
      {authNavigateText && (
        <TouchableOpacity onPress={onAuthNavigate}>
          <Text style={styleSheet.navText}>{authNavigateText}</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}
