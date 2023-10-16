import React, { useState } from "react";
import { useEffect } from "react";
import {
  getCategories,
  getCollections,
  getProducts,
  deleteProduct
} from "../../services/API/Products";
import { DataGrid } from "@mui/x-data-grid";
import "./Products.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineModeEditOutline } from "react-icons/md";
import {AiOutlineDelete} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Products = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [fetchedProducts, setFectchedProducts] = useState([]);
  const [fetchedCategories, setFectchedCategories] = useState([]);
  const [fetchedCollections, setFectchedCollections] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      var { products, error } = await getProducts();
      var { categories, errorCategories } = await getCategories();
      var { collections, errorCollections } = await getCollections();

      if (error || errorCategories || errorCollections) {
        setLoading(!isLoading);
        setError(true);
        setErrorMessage("An error occurred.");
      }

      if (products && categories && collections) {
        setLoading(!isLoading);
        setFectchedProducts(products);
        setFectchedCategories(categories);
        setFectchedCollections(collections);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  async function handleDelete(data)
  {
      setLoading(true)
      const { product, error } = await deleteProduct({
        ...data,
      });
      if (error) {
        setLoading(false);
        toast("🎇 Product delete failed!");
      }
  
      if (product) {
        setLoading(false);
        toast("🎇 Product delete successfull!");
        //setFectchedProducts(product);
        async function fetchProducts() {
          var { products, error } = await getProducts();
          var { categories, errorCategories } = await getCategories();
          var { collections, errorCollections } = await getCollections();
    
          if (error || errorCategories || errorCollections) {
            setLoading(!isLoading);
            setError(true);
            setErrorMessage("An error occurred.");
          }
    
          if (products && categories && collections) {
            setLoading(!isLoading);
            setFectchedProducts(products);
            setFectchedCategories(categories);
            setFectchedCollections(collections);
            setLoading(false);
          }
        }
        fetchProducts()
      }
     
  }
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
      <h2>Products</h2>
      <div className="table-div">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="p-2">Product Name</TableCell>
                <TableCell align="center" className="p-2">
                  Category
                </TableCell>
                <TableCell align="center" className="p-2">
                  Collection
                </TableCell>
                <TableCell align="center" className="p-2">
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="p-4 m-4">
              {fetchedProducts.map((product, index) => (
                <TableRow
                  key={product.slug ?? index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="p-2">
                    {product.title ?? ""}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {product.category ? product.category?.name : ""}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {product.collectionName?.title ?? ""}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    <Link to={`/edit-product/${product.slug}`}>
                      <MdOutlineModeEditOutline style={{color: "black" , opacity : "0.5"}} className="icon" />
                      
                    </Link>
                    <AiOutlineDelete style={{color: "black" , opacity : "0.5"}} className="icon" onClick={()=>handleDelete(product)}/>
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
