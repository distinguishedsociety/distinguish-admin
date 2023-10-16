import React, { useState } from "react";
import { useEffect } from "react";
import {
  getUsers
} from "../../services/API/Users";
import { DataGrid } from "@mui/x-data-grid";
import "./Users.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { getOrders } from "../../services/API/Orders";
import Moment from "react-moment";
import {GrView} from "react-icons/gr"

export const Users = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [fetchedUsers, setFectchedUsers] = useState([]);
  
  useEffect(() => {
    async function fetchUsers() {
      var { users, error } = await getUsers();
      

      if (error ) {
        setLoading(!isLoading);
        setError(true);
        setErrorMessage("An error occurred.");
      }

      if (users) {
        setLoading(!isLoading);
        setFectchedUsers(users);
        setLoading(false);
      }
    }

    fetchUsers();
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
      <h2>Users</h2>
      <div className="table-div">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="p-2">Name</TableCell>
                <TableCell align="center" className="p-2">
                  Email
                </TableCell>
                <TableCell align="center" className="p-2">
                  Orders
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="p-4 m-4">
              {fetchedUsers.map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="p-2">
                    {user.name}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {user.email}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    <Link to={`/user/orders/${user._id}`}>
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
