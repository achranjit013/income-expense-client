import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
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

// delete
export const deleteTransaction = async (_id) => {
  try {
    const userId = getUserId();
    if (!userId) {
      return {
        status: "error",
        message: "User not found. Please log out and log in again.",
      };
    }

    const { data } = await axios.delete(tranAPI, {
      data: _id,
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
