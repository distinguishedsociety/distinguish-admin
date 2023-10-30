import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { createBlog } from '../../services/API/Blogs';
import { Triangle } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { PreviewImages } from '../../components/PreviewImages';


export const AddBlog = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [bannerImage, setBannerImage] = useState("");
    const history = useHistory();

      const handleSub = async (data) => {
        console.log({ ...data, bannerImage: bannerImage });
        setLoading(true);
        const { blog, error } = await createBlog({
          ...data,
          bannerLink: bannerImage,
        });
        if (error) {
          setLoading(false);
          toast(error);
        }
    
        if (blog) {
          toast("🎇 Blog created successfully!");
          history.push("/blogs");
        }
      };
    
      const handleImageDelete = (image, index) => {
        console.log(image);
        setBannerImage("");
      };
    
      const onFileChange = async (e) => {
        console.log(e.target.files);
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        setLoading(true)
        const result = await axios.post(
          "https://api.thedistinguishedsociety.com/internal/api/admin/uploadImage",
          formData
        );
        console.log(result);
        if (result.status === 200) {
          setBannerImage(result.data.data.imageLink);
          setLoading(false)
          toast("🎇 Image uploaded successfully!");
        } else {
          setLoading(false)
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
    <div className='mainpage'>
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
        <input
          className="form-item"
          {...register("videoLink")}
          placeholder="Video Link"
        />
        <label>Banner Image: </label>
        <input type="file" onChange={(e) => onFileChange(e)} />
        <PreviewImages
          productImages={bannerImage == "" ? [] : [bannerImage]}
          handleDelete={handleImageDelete}
        />
        <input
          className="form-item form-submit btn btn-primary"
          type="submit"
        />
      </form>
    </div>
  )
}
