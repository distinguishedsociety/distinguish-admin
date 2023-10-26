import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

 const BASE_URL = "http://18.234.24.104/internal/api";
//const BASE_URL = "http://localhost:3002";

export const getBanners = async () => {
  let banners;
  let error;

  try {
    let result = await axios.get(`${BASE_URL}/admin/banners`, {
      headers: {},
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { banners, error: "An error occurred." };
    }

    banners = result.data.data;
    return { banners, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { banners, error };
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

export const getCategories = async () => {
  let categories;
  let errorCategories;

  try {
    let result = await axios.get(`${BASE_URL}/admin/categories`, {
      headers: {},
    });

    if (result.data.data.status === "error")
      return { categories, errorCategories: "User not authorised." };

    categories = result.data.data;
    return { categories, errorCategories };
  } catch (e) {
    console.log(e);
    errorCategories = e.message;
    return { categories, errorCategories };
  }
};

export const getCollections = async () => {
  let collections;
  let errorCollections;

  try {
    let result = await axios.get(`${BASE_URL}/admin/collections`, {
      headers: {},
    });

    if (result.data.data.status === "error")
      return { collections, errorCollections: "User not authorised." };

    collections = result.data.data;
    return { collections, errorCollections };
  } catch (e) {
    console.log(e);
    errorCollections = e.message;
    return { collections, errorCollections };
  }
};

export const getIntroBanner = async () => {
  let introBanner;
  let error;

  try {
    let result = await axios.get(`${BASE_URL}/admin/introBanner`, {
      headers: {},
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { introBanner, error: "An error occurred." };
    }

    introBanner = result.data.data;
    return { introBanner, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { introBanner, error };
  }
};

export const updateIntroBanner = async (id, data) => {
  let introBanner;
  let error;

  try {
    let result = await axios.patch(`${BASE_URL}/admin/introBanner/${id}`, {
      ...data
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { introBanner, error: "An error occurred." };
    }

    introBanner = result.data.data;
    return { introBanner, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { introBanner, error };
  }
};

export const createIntroBanner = async (data) => {
  let introBanner;
  let error;

  try {
    let result = await axios.post(`${BASE_URL}/admin/introBanner`, {
      ...data
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { introBanner, error: "An error occurred." };
    }

    introBanner = result.data.data;
    return { introBanner, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { introBanner, error };
  }
};
