import axios from 'axios';

const baseURL = "https://boom-sports-trivia-app-c5nredj4wq-uc.a.run.app"

async function getSession(username, password) {
  const response = await axios.post(`${baseURL}/session`,
    {
      username,
      password
    }
  );
  console.info('getSessionResponse: ', response);
  return { username, accessToken: response.data.token} ;
}

async function createUser(username, password) {
  const response = await axios.post(`${baseURL}/user`,
    {
      username,
      password
    }
  );
  console.info('createUserResponse: ', response);
  return response.data;
}

async function getUserScore(username) {
  const response = await axios.get(`${baseURL}/user/${username}`);
  console.info('getUserScoreResponse: ', response)
  return response.data;
}

async function getQuiz(token) {
  const response = await axios.get(`${baseURL}/quiz`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  console.info('getQuizResponse: ', response)
  return response.data;
}

async function submitQuizAnswers(token, choices) {
  const response = await axios.post(`${baseURL}/quiz`,
    { choices },
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  console.info('submitQuizAnswersResponse: ', response)
  return response.data;
}

export default {
  getSession,
  createUser,
  getUserScore,
  getQuiz,
  submitQuizAnswers
}
