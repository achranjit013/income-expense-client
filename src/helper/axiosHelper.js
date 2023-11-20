import axios from "axios";

const rootAPI = "http://localhost:8000/api/v1";
const userAPI = rootAPI + "/user";
const tranAPI = rootAPI + "/transaction";

const getUserId = () => {
  const userJson = sessionStorage.getItem("user");
  const userObj = JSON.parse(userJson);
  return userObj?._id || null;
};

// user api
// signup
export const postUser = async (userObj) => {
  try {
    const { data } = await axios.post(userAPI, userObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// login
export const loginUser = async (userObj) => {
  try {
    const { data } = await axios.post(userAPI + "/login", userObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// transaction api
// post
export const postTransaction = async (tranObj) => {
  try {
    const userId = getUserId();
    console.log("first");
    console.log(userId);
    if (!userId) {
      return {
        status: "error",
        message: "User not found. Please log out and log in again.",
      };
    }

    const { data } = await axios.post(tranAPI, tranObj, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// get
export const getTransaction = async () => {
  try {
    const userId = getUserId();
    if (!userId) {
      return {
        status: "error",
        message: "User not found. Please log out and log in again.",
      };
    }

    const { data } = await axios.get(tranAPI, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
