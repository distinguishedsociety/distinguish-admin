import axios from "axios";

 const BASE_URL = process.env.REACT_APP_API_URL
// const BASE_URL = "http://localhost:3002/internal/api";

export const getProducts = async () => {
  let products;
  let error;

  try {
    let result = await axios.get(`${BASE_URL}/admin/products`, {
      headers: {},
    });

    if (result.data.data.status === "error")
      return { products, error: "User not authorised." };

    products = result.data.data;
    return { products, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { products, error };
  }
};

export const getProduct = async (slug) => {
  let product;
  let errorProduct;

  try {
    let result = await axios.get(`${BASE_URL}/admin/product/${slug}`, {
      headers: {},
    });

    if (result.data.data.status === "error")
      return { product, errorProduct: result.data.data.message };

    product = result.data.data;
    return { product, errorProduct };
  } catch (e) {
    console.log(e);
    errorProduct = e.message;
    return { product, errorProduct };
  }
};

export const createProduct = async (data) => {
  let product;
  let error;

  try {
    let result = await axios.post(`${BASE_URL}/admin/product`, {
      ...data,
    });

    if (result.data.data.status === "error")
      return { product, error: result.data.data.message };

    product = result.data.data;
    return { product, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { product, error };
  }
};

export const updateProduct = async (data) => {
  let product;
  let error;

  try {
    console.log(`${BASE_URL}/admin/product/${data.slug}`);
    let result = await axios.patch(`${BASE_URL}/admin/product/${data.slug}`, {
      ...data,
    });

    if (result.data.data.status === "error")
      return { product, error: result.data.data.message };

    product = result.data.data;
    return { product, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { product, error };
  }
};

export const deleteProduct = async (data) => {
  let product;
  let error;
  console.log(data._id)
  try {
    console.log(`${BASE_URL}/admin/product/${data.slug}`);
    let result = await axios.delete(`${BASE_URL}/admin/product/${data._id}`);

    if (result.data.data.status === "error")
      return { product, error: result.data.data.message };

    product = result.data.data;
    return { product, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { product, error };
  }
};

export const updateInventory = async (id, qty) => {
  let product;
  let error;
  console.log(qty);
  try {
    let result = await axios.patch(`${BASE_URL}/admin/inventory/${id}`, {
      XS: qty.XS,
      S: qty.S,
      M: qty.M,
      L: qty.L,
      XL: qty.XL,
    });

    if (result.data.data.status === "error")
      return { product, error: result.data.data.message };

    product = result.data.data;
    return { product, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { product, error };
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

export const createCategory = async (name) => {
  let category;
  let error;
  try {
    let result = await axios.post(`${BASE_URL}/admin/category`, {
      name : name
    });

    if (result.data.data.status === "error")
      return { category, error: result.data.data.message };

      category = result.data.data;
    return { category, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { category, error };
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

