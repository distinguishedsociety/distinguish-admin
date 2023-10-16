import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const getCurrentUser = async () => {
  let user;
  let error;

  try {
    let result = await axios.get("/moas/api/admin/users/get", {
      headers: {},
    });

    if (result.status != 200) return { user, error: "User not authorised." };

    user = result.data;
    return { user, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { user, error };
  }
};
