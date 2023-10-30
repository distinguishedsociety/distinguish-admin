import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getCollections } from "../../services/API/Products";
import { Loader } from "../../components/Loader";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AddCollectionModal from "./AddCollectionModal";
import { Triangle } from "react-loader-spinner";

export const Collection = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [fetchedCollections, setFectchedCollections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleIsModalOpen = () => setIsModalOpen(true);
  const handleIsModalClose = () => setIsModalOpen(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleIsEditModalOpen = () => setIsEditModalOpen(true);
  const handleIsEditModalClose = () => setIsEditModalOpen(false);
  const [isDeleteLoading, setIsDeletingLoading] = useState(false);

  let location = useLocation();

  useEffect(() => {
    async function fetchCollections() {
      var { collections, error } = await getCollections();
      if (error) {
        setLoading(!isLoading);
        setError(true);
        setErrorMessage(error.message);
      }
      console.log(collections);
      if (collections) {
        setFectchedCollections(collections);
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  const handleAddCollection = () => {
    // add code

    setIsModalOpen(true);
  };

  const handleOnDelete = async (id) => {
    try {
      setIsDeletingLoading(true);
      const result = await axios.delete(
        "https://api.thedistinguishedsociety.com/internal/api/admin/collection/" +
          id
      );
      console.log(result);
      if (result.status == 200) {
        toast("✨ Category created!");
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
        onClick={() => handleAddCollection()}
      >
        Add Collection
      </button>
      <AddCollectionModal
        open={isModalOpen}
        handleOpen={handleIsModalOpen}
        handleClose={handleIsModalClose}
      />

      <div className="table-div">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className="p-2">
                  Collection
                </TableCell>
                <TableCell align="left" className="p-2">
                  Description
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
              {fetchedCollections.map((collection) => (
                <TableRow
                  key={collection._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="p-2">
                    {collection.title}
                  </TableCell>

                  <TableCell component="th" scope="row" className="p-2">
                    {collection.description}
                  </TableCell>

                  <TableCell align="center" className="p-2">
                    <MdOutlineModeEditOutline
                      // onClick={() => handleEditCategory(category)}
                      className="icon"
                    />
                  </TableCell>

                  <TableCell align="center" className="p-2">
                    {isDeleteLoading ? (
                      <Loader />
                    ) : (
                      <MdDeleteOutline
                        className="icon"
                        onClick={() => handleOnDelete(collection._id)}
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
