import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditProduct.css";
import { PreviewImages } from "../../components/PreviewImages";
import { Triangle } from "react-loader-spinner";
import {
  getCategories,
  getCollections,
  getProduct,
  updateProduct,
} from "../../services/API/Products";
import { useParams, useHistory } from "react-router-dom";

export const EditProduct = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [data, setData] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [product, setProduct] = useState();

  let { slug } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      console.log(slug);
      var { product, errorProduct } = await getProduct(slug);
      var { categories, errorCategories } = await getCategories();
      var { collections, errorCollections } = await getCollections();

      if (errorCategories || errorCollections || errorProduct) {
        setLoading(false);
        setError(true);
        setErrorMessage("An error occurred.");
      }

      if (categories && collections && product) {
        console.log(categories, collections, product);
        setLoading(false);
        setProduct(product);
        setCategories(categories);
        setCollections(collections);
        setLoading(false);
        setValue("title", product.title);
        setValue("description", product.description);
        setValue("slug", product.slug);
        setValue("SKU", product.SKU);
        setValue("price", product.price);
        setValue("modelName", product.modelName);
        setValue("isLimitedEdition", product.isLimitedEdition);
        setValue("noOfUnitsOfLimitedEdition", product.noOfUnitsOfLimitedEdition)
        setProductImages(product.images);
      }
    }

    fetchData();
  }, []);

  const handleSub = async (data) => {
    console.log({ ...data, images: productImages });
    setLoading(true);
    const { product, error } = await updateProduct({
      ...data,
      images: productImages,
    });
    if (error) {
      setLoading(false);
      toast("🎇 Product update failed!");
    }

    if (product) {
      setLoading(false);
      toast("🎇 Product update successfull!");
      history.push("/products");
    }
  };

  const handleImageDelete = (image, index) => {
    console.log(image);
    const updatedList = productImages.filter((img) => img != image);
    console.log(updatedList);
    console.log(productImages);
    setProductImages(updatedList);
  };

  const onFileChange = async (e) => {
    console.log(e.target.files);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const result = await axios.post(
      "https://www.thedistinguishedsociety.com/internal/api/admin/uploadImage",
      formData
    );
    console.log(result);
    if (result.status === 200) {
      setProductImages([...productImages, result.data.data.imageLink]);
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
        <input type="file" onChange={(e) => onFileChange(e)} />
        <PreviewImages
          productImages={productImages}
          handleDelete={handleImageDelete}
        />
        <input
          className="form-item form-submit btn btn-primary"
          type="submit"
        />
      </form>
    </div>
  );
};
