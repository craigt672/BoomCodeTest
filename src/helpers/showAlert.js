import { Alert } from 'react-native';

export const showAlert = (title, message, buttons) => {
  return Alert.alert(
    title,
    message,
    buttons
  );
}
