import React, { useState } from "react";
import { useEffect } from "react";
import {
  getCategories,
  getCollections,
  getProducts,
  deleteProduct
} from "../../services/API/Products";
import { DataGrid } from "@mui/x-data-grid";
import "./Coupons.css";
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
import { deleteCoupon, getCoupons } from "../../services/API/Coupons";

export const Coupons = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [fetchedCoupons, setFectchedCoupons] = useState([]);

  useEffect(() => {
    async function fetchCoupons() {
      var { coupons, error } = await getCoupons();

      if (error) {
        setLoading(!isLoading);
        setError(true);
        setErrorMessage("An error occurred.");
      }

      if (coupons) {
        setLoading(!isLoading);
        setFectchedCoupons(coupons);
        setLoading(false);
      }
    }

    fetchCoupons();
  }, []);

  async function handleDelete(data)
  {
      setLoading(true)
      const { coupon, error } = await deleteCoupon({
        ...data,
      });
      if (error) {
        setLoading(false);
        toast("🎇 Coupon delete failed!");
      }
  
      if (coupon) {
        setLoading(false);
        toast("🎇 Coupon delete successfull!");
        //setFectchedProducts(product);
        async function fetchCoupons() {
          var { coupons, error } = await getCoupons();
          
    
          if (error) {
            setLoading(!isLoading);
            setError(true);
            setErrorMessage("An error occurred.");
          }
    
          if (coupons) {
            setLoading(!isLoading);
            setFectchedCoupons(coupons)
            setLoading(false);
          }
        }
        fetchCoupons()
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
      <h2>Coupons</h2>
      <div className="table-div">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="p-2">Coupon Name</TableCell>
                <TableCell align="center" className="p-2">
                  Code
                </TableCell>
                <TableCell align="center" className="p-2">
                  Discount
                </TableCell>
                <TableCell align="center" className="p-2">
                  Expiry
                </TableCell>
                <TableCell align="center" className="p-2">
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="p-4 m-4">
              {fetchedCoupons.map((coupon, index) => (
                <TableRow
                  key={coupon.slug ?? index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="p-2">
                    {coupon.name ?? ""}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {coupon.code ?? ""}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {coupon.discount ?? ""}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {new Date(coupon.expiry).toLocaleString() ?? ""}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    <Link to={`/edit-coupon/${coupon._id}`}>
                      <MdOutlineModeEditOutline style={{color: "black" , opacity : "0.5"}} className="icon" />
                      
                    </Link>
                    <AiOutlineDelete style={{color: "black" , opacity : "0.5"}} className="icon" onClick={()=>handleDelete(coupon)}/>
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
