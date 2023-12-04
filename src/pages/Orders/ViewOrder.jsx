import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getOrder } from '../../services/API/Orders';
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

import "./ViewOrder.css"

export const ViewOrder = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [fetchedOrder, setFectchedOrder] = useState({});
  const {id} = useParams()
  console.log(id)
  
  useEffect(() => {
    async function fetchOrder() {
      var { order, error } = await getOrder(id);
      console.log(order)
      if (error ) {
        setLoading(false);
        setError(true);
        setErrorMessage("An error occurred.");
      }

      if (order) {
        setFectchedOrder(order);
        setLoading(false);
      }
    }

    fetchOrder();
  }, []);

  if (isLoading) {
    return (
      <div className="mainpage d-flex justify-content-center align-items-center flex-column">
        <Triangle ariaLabel="loading-indicator" color="black" />
      </div>
    );
  }
  return (
    <div className='mainpage'>
        <h4 className='page-heading mb-4'>Order Details</h4>
        <h3 className='user-name'></h3>
        <h6 className='user-email'></h6>
        <div className='d-flex flex-column'>
          <div className='d-flex flex-row mb-2'>
            <p className='col-2'>User: </p>
            <p className='col-10'>{fetchedOrder.user?.name} </p>
          </div>
          <div className='d-flex flex-row mb-2'>
            <p className='col-2'>Email: </p>
            <p className='col-10'>{fetchedOrder.user?.email}</p>
          </div>
          <div className='d-flex flex-row mb-2'>
            <p className='col-2'>Order ID: </p>
            <p className='col-10'>{fetchedOrder._id}</p>
          </div>
          <div className='d-flex flex-row mb-2'>
            <p className='col-2'>Order Status: </p>
            <p>{fetchedOrder.orderStatus}</p>
          </div>
          <div className='d-flex flex-row mb-2'>
            <p className='col-2'>Order Amount: </p>
            <p>{fetchedOrder.currCode ? fetchedOrder.currCode : 'Rs.'} {(fetchedOrder?.orderAmount)} </p>
          </div>
          <div className='d-flex flex-row mb-2'>
            <p className='col-2'>Coupon Code: </p>
            <p>{fetchedOrder?.couponCode ? `${fetchedOrder?.couponCode}` : 'Not applied'}</p>
          </div>
          <div className='d-flex flex-row mb-2'>
            <p className='col-2'>Coupon discount: </p>
            <p>{fetchedOrder.currCode ? fetchedOrder.currCode : 'Rs.'} {(fetchedOrder.discountPrice * fetchedOrder?.currRate).toFixed(2)} </p>
          </div>
          <div className='d-flex flex-row mb-2'>
            <p className='col-2'>Order Date: </p>
            <p>
              <Moment local>
                {fetchedOrder.createdAt.toString().substring(0, 24)}
              </Moment></p>
          </div>
          <div className='d-flex flex-row mb-2'>
            <p className='col-2'>Order Type: </p>
            <p>{fetchedOrder.orderType}</p>
          </div>
          {fetchedOrder.orderType === "Prepaid" 
              ? <div className='d-flex flex-row mb-4'>
                  <p className='col-2'>Payment ID: </p>
                  <p>{fetchedOrder.paymentId}</p>
                </div> 
              : ""
            }
          {/* <div className='d-flex flex-row mb-4'>
            <p className='col-2'>Payment Status: </p>
            <p>Pending</p>
          </div> */}
          <div className='d-flex flex-column mb-4'>
            <h4 className='mb-4'>Shipping Details</h4>
            <div className='d-flex flex-row mb-4'>
              <p className='col-2'>Firstname: </p>
              <p>{fetchedOrder.shippingDetails.firstName}</p>
            </div>
            <div className='d-flex flex-row mb-4'>
              <p className='col-2'>Lastname: </p>
              <p>{fetchedOrder.shippingDetails.lastName}</p>
            </div>
            <div className='d-flex flex-row mb-4'>
              <p className='col-2'>Phone number: </p>
              <p>{fetchedOrder.shippingDetails.phoneNumber}</p>
            </div>
            <div className='d-flex flex-row mb-4'>
              <p className='col-2'>Email Address: </p>
              <p>{fetchedOrder.shippingDetails.email}</p>
            </div>
            <div className='d-flex flex-row mb-4'>
              <p className='col-2'>Address </p>
              <p>{fetchedOrder.shippingDetails.address}</p>
            </div>
            
            <div className='d-flex flex-row mb-4'>
              <p className='col-2'>City: </p>
              <p>{fetchedOrder.shippingDetails.city}</p>
            </div>
            <div className='d-flex flex-row mb-4'>
              <p className='col-2'>State: </p>
              <p>{fetchedOrder.shippingDetails.state}</p>
            </div>
            <div className='d-flex flex-row mb-4'>
              <p className='col-2'>Country: </p>
              <p>{fetchedOrder.shippingDetails.country}</p>
            </div>
            <div className='d-flex flex-row mb-4'>
              <p className='col-2'>Pincode: </p>
              <p>{fetchedOrder.shippingDetails.pincode}</p>
            </div>
          </div>
          <div className='d-flex flex-column'>
            <h4 className='mb-4'>Products</h4>
            <div className="table-div">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="p-2">Image</TableCell>
                <TableCell align="center" className="p-2">
                  Name
                </TableCell>
                <TableCell align="center" className="p-2">
                  Size
                </TableCell>
                <TableCell align="center" className="p-2">
                  Quantity
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody className="p-4 m-4">
              {fetchedOrder.products.map((item, index) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="p-2">
                    <img src={item.product.images[0]} height="150" width="100" />
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {/* {order.user.email} */}
                    {item.product.title}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {item.size}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {item.qty}
                  </TableCell>
                </TableRow>
               ))} 
            </TableBody>
          </Table>
        </TableContainer>
      </div>
          </div>
        </div>
    </div>
  )
}
