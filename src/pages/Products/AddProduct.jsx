import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Triangle } from "react-loader-spinner";
import "./EditProduct.css";
import { PreviewImages } from "../../components/PreviewImages";
import {
  getCategories,
  getCollections,
  updateProduct,
  createProduct,
} from "../../services/API/Products";
import { useHistory } from "react-router-dom";

export const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLimitedEdition, setIsLimitedEdition] = useState(false)
  const [noOfUnitsOfLimitedEdition, setNoOfUnitsOfLimitedEdition] = useState(0)
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      var { categories, errorCategories } = await getCategories();
      var { collections, errorCollections } = await getCollections();

      if (errorCategories || errorCollections) {
        setLoading(!isLoading);
        setError(true);
        setErrorMessage("An error occurred.");
      }

      if (categories && collections) {
        setLoading(!isLoading);
        setCategories(categories);
        setCollections(collections);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSub = async (data) => {
    setLoading(true);
    const tempData = { ...data, images: productImages };
    const { product, error } = await createProduct(tempData);

    if (error) {
      setLoading(false);
      toast("🎇 Product update failed!");
    }
    if (product) {
      setLoading(false);
      toast("🎇 Product created successfully!");
      history.push("/products");
    }
  };

  const onFileChange = async (e) => {
    console.log(e.target.files);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const result = await axios.post(
      "https://localhost:9000/internal/api/admin/uploadImage",
      formData
    );
    console.log(result);
    if (result.status === 200) {
      setProductImages([...productImages, result.data.data.imageLink]);
      console.log(productImages);
      toast("🎇 Image uploaded successfully!");
    } else {
      toast("🎇 Image uploaded failed!");
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
          {...register("title")}
          placeholder="Title"
        />
        <textarea
          className="form-item"
          {...register("description")}
          placeholder="Description"
        />
        <input className="form-item" {...register("slug")} placeholder="Slug" />
        <input className="form-item" {...register("SKU")} placeholder="SKU" />
        <input
          className="form-item"
          {...register("price")}
          placeholder="Price"
        />
        <input
          className="form-item"
          {...register("modelName")}
          placeholder="Model Name"
        />
        <select className="form-item" {...register("category")}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option value={category._id}>{category.name}</option>
          ))}
        </select>
        <select className="form-item" {...register("collectionName")}>
          <option value="">Select Collection</option>
          {collections.map((collection) => (
            <option value={collection._id}>{collection.title}</option>
          ))}
        </select>
        <select className="form-item" {...register("isLimitedEdition")}>
          <option value="">Is Limited Edition</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
        </select>
        <input className="form-item" type="number" defaultValue={0} placeholder="No of limited units" {...register("noOfUnitsOfLimitedEdition")} />
        <input className="m-2" type="file" onChange={(e) => onFileChange(e)} />
        <PreviewImages productImages={productImages} />
        <input
          className="form-item form-submit btn btn-primary"
          type="submit"
        />
      </form>
    </div>
  );
};
