import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { createBlog } from '../../services/API/Blogs';
import { Triangle } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from 'axios';


export const AddContinent = () => {
    const { register, handleSubmit, setValue,getValues, formState: { errors } } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const history = useHistory();
  const {id} = useParams()
  useEffect(() => {
    const data = async () => {
        const data = await axios.post('https://api.thedistinguishedsociety.com/internal/api/admin/id-continent',{id:id})
            console.log('data',data.data.data.name)
            setValue('name', data.data.data.name)
            setValue('currencyCode', data.data.data.countryCode)
            setValue('currencyRate', data.data.data.currencyRate)
      
    }
    if(id){
        data()
    }
  },[id])


  const onSubmit = async (data) => {
    setLoading(true);

    // Perform form data validation here before proceeding
    if (!data.name || !data.currencyRate || !data.currencyCode) {
      setLoading(false);
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
        let result;
        if(id){
          const cur = (+data.currencyRate).toFixed(4)
            result = await axios.post(
                "https://api.thedistinguishedsociety.com/internal/api/admin/update-continent",
                {...data,currencyRate: cur, id: id}
              );
        }else{
             result = await axios.post(
                "https://api.thedistinguishedsociety.com/internal/api/admin/create-continent",
                data
              );
        }
      

      if (result.data.status === 'success') {
        
          setLoading(false);
          toast.success("Blog created successfully!");
          history.push("/continent");
        
      } else {
        setLoading(false);
        toast.error("something went wrong");
      }
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong");
    }
  };

  const cancelform = () => {
    history.push('/continent')
  }

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
    <form className="addForm" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="form-item"
        {...register("name", { required: true })}
        placeholder="Name"
        defaultValue={getValues('name')} 
      />
      {errors.name && <span className="error-msg marginforError">Name is required</span>}

      <input
        className="form-item"
        {...register("currencyRate", { required: true })}
        placeholder="Currency Rate"
        type='number'
        defaultValue={getValues('currencyRate')} 
      />
      {errors.currencyRate ? <span className="error-msg marginforError">Currency Rate is required</span> : <span > <div className='marginforError' style={{padding: '5px',margin: '5px'}}>
                      <p style={{paddingLeft: '5px'}}>This is a value of 1 INR in respective currency.</p>
                      <a href='https://www.google.com/search?q=1+inr+to+usd&oq=1+inr+&gs_lcrp=EgZjaHJvbWUqBwgBEAAYgAQyBggAEEUYOTIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIGCAYQRRg8MgYIBxBFGDzSAQg1MDIwajFqN6gCALACAA&sourceid=chrome&ie=UTF-8' target='_blank'>Click Here To See The Example</a>
                    </div></span>}
      <input
        className="form-item"
        {...register("currencyCode", { required: true })}
        placeholder="Currency Code"
        defaultValue={getValues('currencyCode')} 
      />
      {errors.currencyCode && <span className="error-msg marginforError">Currency Code is required</span>}
      <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'start', columnGap: "10px", marginTop: '15px'}}>
      <button
        className="form-item form-submit btn btn-primary"
        type="button"
        onClick={cancelform}
        
      >Cancel</button>
      
      <input
        className="form-item form-submit btn btn-primary"
        type="submit"
      />
      </div>
    </form>
  </div>
  )
}
