import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader } from "../../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";

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

export default function AddCollectionModal({ open, handleClose, handleOpen }) {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSub = async (data) => {
    console.log(data);
    if (data.name !== "") {
      setIsLoading(true);
      const result = await axios.post(
        "http://18.234.24.104/internal/api/admin/collection",
        { title: data.title, description: data.description }
      );

      if (result.status == 200) {
        toast("✨ Collection created!");
        setIsLoading(false);
        handleClose();
      }
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
            Add new collection
          </Typography>
          <form
            className="addForm"
            onSubmit={handleSubmit((data) => handleSub(data))}
          >
            <input
              className="form-item mt-1 mb-1"
              {...register("title")}
              placeholder="Enter Name"
            />
            <textarea
              className="form-item mt-1 mb-1"
              {...register("description")}
              placeholder="Enter Description"
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
