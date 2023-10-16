import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Loader } from "../../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { getCategories } from "../../services/API/Products";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export default function EditCategoryModal(props) {
  console.log(props)
  const { register, handleSubmit, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
 
  const handleSub = async (data) => {
    console.log(data.name , props.editItem._id);
    if (data.name !== "") {
      setIsLoading(true);
      const result = await axios.patch(
        `https://www.thedistinguishedsociety.com/internal/api/admin/category/${props.editItem._id}`,
        { name: data.name }
      );
      if (result.status == 200) {
        toast("✨ Category updated!");
        setIsLoading(false);
        var { categories, error } = await getCategories();
          if (error) {
            setIsLoading(!isLoading);
          }
          console.log(categories);
          if (categories) {
            setIsLoading(!isLoading);
            props.setFectchedCategories(categories);
            setIsLoading(false);
          }
        props.handleClose();
      }
    }
  };

  useEffect(() => {
    setValue("name");
  }, []);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="p-2"
          >
            Add new category
          </Typography>
          <form
            className="addForm"
            onSubmit={handleSubmit((data) => handleSub(data))}
          >
            <input
              className="form-item mt-1 mb-1"
              {...register("name")}
              placeholder="Enter Name"
          
            />
            <button
              type="submit"
              className="form-item form-submit btn btn-primary"
            >
              {isLoading ? <Loader /> : "Add"}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
