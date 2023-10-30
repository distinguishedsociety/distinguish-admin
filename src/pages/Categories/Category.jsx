import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getCategories } from "../../services/API/Products";
import AddCategoryModal from "./AddCategoryModal";
import { Loader } from "../../components/Loader";
import { useLocation } from "react-router-dom";
import axios from "axios";
import EditCategoryModal from "./EditCategoryModal";
import { Triangle } from "react-loader-spinner";

export const Category = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [fetchedCategories, setFectchedCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleIsModalOpen = () => setIsModalOpen(true);
  const handleIsModalClose = () => setIsModalOpen(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleIsEditModalOpen = () => setIsEditModalOpen(true);
  const handleIsEditModalClose = () => setIsEditModalOpen(false);
  const [isDeleteLoading, setIsDeletingLoading] = useState(false);
  const [editItem , setEditItem] = useState({});
  let location = useLocation();

  useEffect(() => {
    async function fetchCategories() {
      var { categories, error } = await getCategories();
      if (error) {
        setLoading(!isLoading);
        setError(true);
        setErrorMessage(error.message);
      }
      console.log(categories);
      if (categories) {
        setLoading(!isLoading);
        setFectchedCategories(categories);
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    // add code
   
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    // add code
    setEditItem(category);
    console.log(category);
    setIsEditModalOpen(true);
   
  };
  const handleOnDelete = async (id) => {
    try {
      setIsDeletingLoading(true);
      const result = await axios.delete(
        "https://api.thedistinguishedsociety.com/internal/api/admin/category/" +
          id
      );
      console.log(result);
      if (result.status == 200) {
        toast("✨ Category Deleted!");
        window.location.reload();
      } else {
        setIsDeletingLoading(false);
        toast(result.data.message);
      }
    } catch (e) {
      setIsDeletingLoading(false);
      toast(e.message);
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
      <button
        className="btn btn-primary p-2 m-2"
        onClick={() => handleAddCategory()}
      >
        Add Category
      </button>
      <AddCategoryModal
        open={isModalOpen}
        handleOpen={handleIsEditModalOpen}
        handleClose={handleIsEditModalClose}
        setFectchedCategories={setFectchedCategories}
       
      />
    <EditCategoryModal
    open={isEditModalOpen}
    handleOpen={handleIsEditModalOpen}
    handleClose={handleIsEditModalClose}
    setFectchedCategories={setFectchedCategories}
    editItem = {editItem}
    />
      <div className="table-div">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className="p-2">
                  Category
                </TableCell>
                <TableCell align="center" className="p-2">
                  Edit
                </TableCell>
                <TableCell align="center" className="p-2">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="p-4 m-4">
              {fetchedCategories.map((category) => (
                <TableRow
                  key={category._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="p-2">
                    {category.name}
                  </TableCell>

                  <TableCell align="center" className="p-2">
                    <MdOutlineModeEditOutline
                       onClick={() => handleEditCategory(category)}
                      className="icon"
                    />
                  </TableCell>

                  <TableCell align="center" className="p-2">
                    {isDeleteLoading ? (
                      <Loader />
                    ) : (
                      <MdDeleteOutline
                        className="icon"
                        onClick={() => handleOnDelete(category._id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
