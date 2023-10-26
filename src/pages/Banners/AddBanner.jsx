import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { PreviewImages } from "../../components/PreviewImages";
import { useHistory } from "react-router-dom";

export const AddBanner = () => {
  const [bannerImage, setBannerImage] = useState("");
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const handleSub = async (data) => {
    console.log({ ...data, imageLink: bannerImage });
    const result = await axios.post(
      "http://18.234.24.104/internal/api/admin/banner",
      { ...data, imageLink: bannerImage }
    );

    console.log();
    if ((result.data.data.status = "success")) {
      history.push("/banners");
    }
  };

  const onFileChange = async (e) => {
    console.log(e.target.files);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const result = await axios.post(
      "http://18.234.24.104/internal/api/admin/uploadImage",
      formData
    );
    console.log(result);
    if (result.status === 200) {
      setBannerImage(result.data.data.imageLink);
      console.log(bannerImage);
      toast("🎇 Image uploaded successfully!");
    } else {
      toast("🎇 Image uploaded failed!");
    }
  };
  return (
    <div className="mainpage">
      <form
        className="addForm"
        onSubmit={handleSubmit((data) => handleSub(data))}
      >
        <input
          className="form-item"
          {...register("redirectLink")}
          placeholder="Redirect Link"
        />
        <input className="m-2" type="file" onChange={(e) => onFileChange(e)} />
        <PreviewImages productImages={[bannerImage]} />
        <input
          className="form-item form-submit btn btn-primary"
          type="submit"
        />
      </form>
    </div>
  );
};
