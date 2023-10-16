import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { getBlog, updateBlog } from '../../services/API/Blogs';
import { Triangle } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { PreviewImages } from '../../components/PreviewImages';
import { getIntroBanner, updateIntroBanner, createIntroBanner } from '../../services/API/Banners';


export const IntroBanner = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [fetchedIntroBanner, setFectchedIntroBanner] = useState([]);
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const {id} = useParams()
    const history = useHistory();

    useEffect(() => {
        async function fetchIntroBanner() {
          var { introBanner, error } = await getIntroBanner();
          console.log(introBanner)
          if (error ) {
            setLoading(false);
            setError(true);
            setErrorMessage("An error occurred.");
          }
    
          if (introBanner) {
            console.log(introBanner)
            if(introBanner.length > 0){
                setFectchedIntroBanner(introBanner[0]);
                setValue("heading", introBanner[0].heading)
                setValue("description", introBanner[0].description)
                setImage1(introBanner[0].image1)
                setImage2(introBanner[0].image2)
            }
            setLoading(false);
          }
        }
    
        fetchIntroBanner();
      }, []);

      const handleSub = async (data) => {
        console.log({ ...data, image1: image1, image2: image2 });
        setLoading(true);
        console.log(fetchedIntroBanner)
        const { introBanner, error } = 
            fetchedIntroBanner ? 
                await updateIntroBanner( fetchedIntroBanner._id, {
                ...data,
                image1: image1,
                image2: image2
                })
            : await createIntroBanner( {
                ...data,
                image1: image1,
                image2: image2
                });

        if (error) {
          setLoading(false);
          toast("🎇 Intro Banner update failed!");
        }
    
        if (introBanner) {
          setLoading(false);
          toast("🎇 Intro Banner update successfull!");
          history.push("/intro-banner");
        }
      };
    
      const handleImage1Delete = (image, index) => {
        console.log(image);
        setImage1("");
      };

      const handleImage2Delete = (image, index) => {
        console.log(image);
        setImage2("");
      };
    
      const onImage1Change = async (e) => {
        console.log(e.target.files);
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        setLoading(true)
        const result = await axios.post(
          "https://www.thedistinguishedsociety.com/internal/api/admin/uploadImage",
          formData
        );
        console.log(result);
        if (result.status === 200) {
          setImage1(result.data.data.imageLink);
          setLoading(false)
          toast("🎇 Image uploaded successfully!");
        } else {
          setLoading(false)
          toast("🎇 Image uploaded failed!");
        }
      };

      const onImage2Change = async (e) => {
        console.log(e.target.files);
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        setLoading(true)
        const result = await axios.post(
          "https://www.thedistinguishedsociety.com/internal/api/admin/uploadImage",
          formData
        );
        console.log(result);
        if (result.status === 200) {
          setImage2(result.data.data.imageLink);
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
          {...register("heading")}
          placeholder="Heading"
        />
        <textarea
          className="form-item"
          {...register("description")}
          placeholder="Description"
        />
        <label>Image 1: </label>
        <input type="file" onChange={(e) => onImage1Change(e)} />
        <PreviewImages
          productImages={image1 == "" ? [] : [image1]}
          handleDelete={handleImage1Delete}
        />
        <label>Image 2: </label>
        <input type="file" onChange={(e) => onImage2Change(e)} />
        <PreviewImages
          productImages={image2 == "" ? [] : [image2]}
          handleDelete={handleImage2Delete}
        />
        <input
          className="form-item form-submit btn btn-primary"
          type="submit"
        />
      </form>
    </div>
  )
}
