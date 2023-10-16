import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Triangle } from "react-loader-spinner";
import "./EditCoupon.css";
import { PreviewImages } from "../../components/PreviewImages";
import {
  getCategories,
  getCollections,
  updateProduct,
  createProduct,
} from "../../services/API/Products";
import { useHistory } from "react-router-dom";
import { createCoupon } from "../../services/API/Coupons";

export const AddCoupon = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLimitedEdition, setIsLimitedEdition] = useState(false)
  const [noOfUnitsOfLimitedEdition, setNoOfUnitsOfLimitedEdition] = useState(0)
  const history = useHistory();

  const handleSub = async (data) => {
    setLoading(true);
    const { coupon, error } = await createCoupon(data);

    if (error) {
      setLoading(false);
      toast("🎇 Coupon creation failed!");
    }
    if (coupon) {
      setLoading(false);
      toast("🎇 Coupon created successfully!");
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
