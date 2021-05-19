export const validateAuth = (_username, _password) => {
  const username = _username.toLowerCase().trim();
  const password = _password.trim();

  const state = {
    error: null,
    creds: { username, password }
  }

  if (!username || !password) {
    state.error = { 
      title: "Invalid Fields",
      message: "Fields can not be empty or invalid"
    }
    return state
  }

  if (_username.length < 3) {
    state.error =  {
      title: "Invalid Username",
      message: "Username entered must be atleast 3 characters long"
    }
    return state
  }

  if (_password.length < 6) {
    state.error = {
      title: "Invalid Password",
      message: "Password entered must be atleast 3 characters long"
    }
    return state;
  }

  return state;
}
