import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditCoupon.css";
import { PreviewImages } from "../../components/PreviewImages";
import { Triangle } from "react-loader-spinner";
import {
  getCategories,
  getCollections,
  getProduct,
  updateProduct,
} from "../../services/API/Products";
import { useParams, useHistory } from "react-router-dom";
import { getCoupon, updateCoupon } from "../../services/API/Coupons";
import { formatDate } from "../../utils/utils";

export const EditCoupon = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [data, setData] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [coupon, setCoupon] = useState();
  const [couponID, setCouponID] = useState()

  let { slug } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      var { coupon, errorCoupon } = await getCoupon(slug);

      if (errorCoupon) {
        setLoading(false);
        setError(true);
        setErrorMessage("An error occurred.");
      }

      if (coupon) {
        setLoading(false);
        setCoupon(coupon);
        setLoading(false);
        setCouponID(coupon._id)
        setValue("name", coupon.name);
        setValue("code", coupon.code);
        setValue("discount", coupon.discount);
        setValue("expiry", formatDate(new Date(coupon.expiry)));
      }
    }

    fetchData();
  }, []);

  const handleSub = async (data) => {
    setLoading(true);
    console.log(data)
    const { coupon, error } = await updateCoupon({
      ...data
    }, couponID);
    if (error) {
      setLoading(false);
      toast("🎇 Coupon update failed!");
    }

    if (coupon) {
      setLoading(false);
      toast("🎇 Coupon update successfull!");
      history.push("/coupons");
    }
  };

  if (isLoading) {
    return (
      <div className="mainpage d-flex justify-content-center align-items-center flex-column">
        <Triangle ariaLabel="loading-indicator" color="black" />
      </div>
    );
  }

  return (
    <div className="mainpage">
      <ToastContainer theme="dark" />
      <form
        className="addForm"
        onSubmit={handleSubmit((data) => handleSub(data))}
      >
        <input
          className="form-item"
          {...register("name")}
          placeholder="Name"
        />
        <input
          className="form-item"
          {...register("code")}
          placeholder="Code"
        />
        <input className="form-item" {...register("discount")} placeholder="Discount in %" />
        <input className="form-item" {...register("expiry")} placeholder="Expiry" type="date"/>
        <input
          className="form-item form-submit btn btn-primary"
          type="submit"
        />
      </form>
    </div>
  );
};
