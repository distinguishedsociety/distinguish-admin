import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const BASE_URL = "https://api.thedistinguishedsociety.com/internal/api";

export const getUsers = async () => {
  let users;
  let error;

  try {
    let result = await axios.get(`${BASE_URL}/admin/users`, {
      headers: {},
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { users, error: "An error occurred." };
    }

    users = result.data.data;
    return { users, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { users, error };
  }
};

export const getUserOrders = async (id) => {
  let orders;
  let error;

  try {
    let result = await axios.get(`${BASE_URL}/admin/user/orders/${id}`, {
      headers: {},
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { orders, error: "An error occurred." };
    }

    orders = result.data.data;
    return { orders, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { orders, error };
  }
};

export const deleteBanner = async (banner) => {
  let error;

  try {
    let result = await axios.delete(`${BASE_URL}/admin/banner/${banner._id}`, {
      headers: {},
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { error: "An error occurred." };
    }

    return { error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { error };
  }
};