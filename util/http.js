import axios from "axios";
const BACKEND_URL = "https://task-manager-e2a69-default-rtdb.firebaseio.com/";
const API_KEY = "AIzaSyCPkp1z-qzZbyOgRwhlRQFMSLG2VwUsA44";

export async function storeTask(taskData) {
  const response = await axios.post(BACKEND_URL + "/tasks.json", taskData);
  const id = response.data.name;
  return id;
}
export async function fetchTasks() {
  console.log("in fetching");
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  };
  let response;
  console.log("Request Headers:", axiosConfig.headers);
  try {
    response = await axios.get(BACKEND_URL + "/tasks.json");
    // response = await axios.get(BACKEND_URL + "/expenses.json");
  } catch (error) {
    console.log("error in fetching");
    console.log(error);
    return [];
  }
  const tasks = [];
  console.log("2");
  console.log("returned response data" + response.data);
  for (const key in response.data) {
    tasks.push({
      id: key,
      name: response.data[key].name,
      details: response.data[key].details,
      // date: new Date(response.data[key].date),
      userEmail: response.data[key].userEmail,
      done: response.data[key].done,
      priorty: response.data[key].priorty,
    });
    console.log("UserEmail in http response: " + response.data[key].userEmail);
    console.log("id in http response: " + key);
  }
  console.log("Print fetched tasks: " + tasks);
  return tasks;
}

export async function deleteTask(id) {
  console.log(id);
  const response = await axios.delete(BACKEND_URL + "/tasks/" + id + ".json");
  return response;
}
export async function updateTask(id, expenseData) {
  console.log(id);
  const response = await axios.put(
    BACKEND_URL + "/tasks/" + id + ".json",
    expenseData
  );
  return id;
}

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  console.log("HTTP.js: email: ", email, " password: ", password)
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  console.log("HTTP.js: response: ", response)
  const token = response.data.idToken;
  console.log("HTTP.js: token: ", token)
  return token;
}

export async function createUser(email, password) {
  const token = await authenticate("signUp", email, password);
  return token;
}
export async function login(email, password) {
  const token = await authenticate("signInWithPassword", email, password);
  return token;
}
