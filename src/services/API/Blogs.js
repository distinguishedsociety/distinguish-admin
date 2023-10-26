import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

 const BASE_URL = "http://18.234.24.104/internal/api";
//const BASE_URL = "http://localhost:3002"

export const getBlogs = async () => {
  let blogs;
  let error;

  try {
    let result = await axios.get(`${BASE_URL}/admin/blogs`, {
      headers: {},
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { blogs, error: "An error occurred." };
    }

    blogs = result.data.data;
    return { blogs, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { blogs, error };
  }
};

export const getBlog = async (id) => {
  let blog;
  let error;

  try {
    let result = await axios.get(`${BASE_URL}/admin/blog/${id}`, {
      headers: {},
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { blog, error: "An error occurred." };
    }

    blog = result.data.data;
    return { blog, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { blog, error };
  }
};

export const createBlog = async (data) => {
  let blog;
  let error;

  try {
    let result = await axios.post(`${BASE_URL}/admin/blog`, {
      ...data
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { blog, error: "An error occurred." };
    }

    blog = result.data.data;
    return { blog, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { blog, error };
  }
};

export const updateBlog = async (id, data) => {
  let blog;
  let error;

  try {
    let result = await axios.patch(`${BASE_URL}/admin/blog/${id}`, {
      ...data
    });

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { blog, error: "An error occurred." };
    }

    blog = result.data.data;
    return { blog, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { blog, error };
  }
};

export const deleteBlog = async (id) => {
  let blog;
  let error;

  try {
    let result = await axios.delete(`${BASE_URL}/admin/blog/${id}`);

    if (result.data.data.status === "error") {
      console.log(result.data);
      return { blog, error: "An error occurred." };
    }

    blog = result.data.data;
    return { blog, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { blog, error };
  }
};

