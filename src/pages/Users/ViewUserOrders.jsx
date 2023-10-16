import React, { useState } from "react";
import { useEffect } from "react";
import {
  getUserOrders,
  getUsers
} from "../../services/API/Users";
import { DataGrid } from "@mui/x-data-grid";
import "./ViewUserOrders.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { getOrders } from "../../services/API/Orders";
import Moment from "react-moment";
import {GrView} from "react-icons/gr"

export const ViewUserOrders = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [fetchedUserOrders, setFectchedUserOrders] = useState([]);
  let { id } = useParams();
  
  useEffect(() => {
    async function fetchUserOrders() {
      var { orders, error } = await getUserOrders(id);
      

      if (error ) {
        setLoading(!isLoading);
        setError(true);
        setErrorMessage("An error occurred.");
      }

      if (orders) {
        setLoading(!isLoading);
        setFectchedUserOrders(orders);
        setLoading(false);
      }
    }

    fetchUserOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="mainpage d-flex justify-content-center align-items-center flex-column">
        <Triangle ariaLabel="loading-indicator" color="black" />
      </div>
    );
  }

  return (
    <div className="mainpage">
      <h2>User Orders</h2>
      <div className="table-div">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell className="p-2">Order id</TableCell>
                <TableCell align="center" className="p-2">
                  User
                </TableCell>
                <TableCell align="center" className="p-2">
                  Order Date
                </TableCell>
                <TableCell align="center" className="p-2">
                  Status
                </TableCell>
                <TableCell align="center" className="p-2">
                  View
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="p-4 m-4">
              {fetchedUserOrders.map((order, index) => (
                <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="p-2">
                  {order._id ?? ""}
                </TableCell>
                <TableCell align="center" className="p-2">
                  {order.user.email}
                </TableCell>
                <TableCell align="center" className="p-2">
                  <Moment local>
                  {order.createdAt.toString().substring(0, 24)}
                  </Moment>
                </TableCell>
                <TableCell align="center" className="p-2">
                  {order.orderStatus}
                </TableCell>
                <TableCell align="center" className="p-2">
                  <Link to={`/view-order/${order._id}`}>
                    <GrView className="icon" />
                  </Link>
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
