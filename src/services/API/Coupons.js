import axios from "axios";

 const BASE_URL = process.env.REACT_APP_API_URL
// const BASE_URL = "https://api.thedistinguishedsociety.com/internal/api";

export const getCoupons = async () => {
  let coupons;
  let error;

  try {
    let result = await axios.get(`${BASE_URL}/admin/coupons`, {
      headers: {},
    });

    if (result.data.data.status === "error")
      return { coupons, error: "User not authorised." };

      coupons = result.data.data;
    return { coupons, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { coupons, error };
  }
};

export const getCoupon = async (slug) => {
  let coupon;
  let errorCoupon;

  try {
    let result = await axios.get(`${BASE_URL}/admin/coupon/${slug}`, {
      headers: {},
    });

    if (result.data.data.status === "error")
      return { coupon, errorCoupon: result.data.data.message };

      coupon = result.data.data;
    return { coupon, errorCoupon };
  } catch (e) {
    console.log(e);
    errorCoupon = e.message;
    return { coupon, errorCoupon };
  }
};

export const createCoupon = async (data) => {
  let coupon;
  let error;

  try {
    let result = await axios.post(`${BASE_URL}/admin/coupon`, {
      ...data,
    });

    if (result.data.data.status === "error")
      return { coupon, error: result.data.data.message };

      coupon = result.data.data;
    return { coupon, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { coupon, error };
  }
};

export const updateCoupon = async (data, id) => {
  let coupon;
  let error;

  try {
    let result = await axios.patch(`${BASE_URL}/admin/coupon/${id}`, {
      ...data,
    });

    if (result.data.data.status === "error")
      return { coupon, error: result.data.data.message };

      coupon = result.data.data;
    return { coupon, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { coupon, error };
  }
};

export const deleteCoupon = async (data) => {
  let coupon;
  let error;
  console.log(data._id)
  try {
    console.log(`${BASE_URL}/admin/coupon/${data.slug}`);
    let result = await axios.delete(`${BASE_URL}/admin/coupon/${data._id}`);

    if (result.data.data.status === "error")
      return { coupon, error: result.data.data.message };

      coupon = result.data.data;
    return { coupon, error };
  } catch (e) {
    console.log(e);
    error = e.message;
    return { coupon, error };
  }
};

