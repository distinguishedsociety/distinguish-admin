import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

 const BASE_URL = "https://www.thedistinguishedsociety.com/internal/api";
//const BASE_URL = "http://localhost:3002"

export const getOrders = async () => {
  let orders;
  let error;

  try {
    let result = await axios.get(`${BASE_URL}/admin/orders`, {
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

export const getOrder = async (id) => {
  let order;
  let error;

  try {
    let result = await axios.get(`${BASE_URL}/admin/order/${id}`, {
      headers: {},
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { order, error: "An error occurred." };
    }

    order = result.data.data;
    return { order, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { order, error };
  }
};

