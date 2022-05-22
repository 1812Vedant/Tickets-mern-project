import axios from "axios";
//Register User
const API_URL = "/api/users";
const register = async (userData) => {
  //making post request to server
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    //setting item in user storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
};

export default authService;
