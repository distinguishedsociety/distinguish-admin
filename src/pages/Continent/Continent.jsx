import React, { useState, useEffect } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineModeEditOutline, MdDeleteOutline, MdDelete  } from "react-icons/md";
import { FcInfo } from "react-icons/fc";
// import {  AiOutlineDelete } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { Tooltip, styled,tooltipClasses  } from '@mui/material';
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    padding: '5px',
    maragin: '5px'
  },
}));

export default function Continent(){
    const [data,setData] = useState([])
    const history = useHistory()
    const fetchContinent = async () => {
      try{
        const result = await axios.get(
          "https://api.thedistinguishedsociety.com/internal/api/admin/get-continent"
        );
        if(result.data.status == 'success'){
          const newData = result.data.data.map(item => {
            return {...item, name:item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          })
          setData(newData)
        }
      }catch(e){

      }
    }
    
    useEffect(() => {
      fetchContinent()
    },[])

    const addNewContinent = () => {
      history.push('/add-continent')
    }

    const deleteContinent =async (id) => {
      try{
        const result = await axios.post(
          "https://api.thedistinguishedsociety.com/internal/api/admin/delete-continent", {id: id}
        );
        if(result.data.status == 'success'){
          fetchContinent()
          toast.success('Continent deleted successfully')
        }else{
          toast.error('Something went wrong')
        }
      }catch(e){

      }
    }

    return(
        <div className='mainpage'>
        <ToastContainer theme="dark" />
        <div className="d-flex justify-content-between">
            <h2 className='mb-2'>Continent</h2>
            <button className="btn btn-primary mx-2 px-2 mb-4" onClick={() => addNewContinent()}>Add New Continent</button>
        </div>
        <div className="table-div">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className="p-2">
                  Name
                </TableCell>
                <TableCell align="center" className="p-2">
                  Currency Code
                </TableCell>
                <TableCell align="center" className="p-2 flex">
                  <div style={{display: 'flex', columnGap: '5px', justifyContent: 'center'}} ><div>Currency Rate </div>
                  <HtmlTooltip title={
                    <div className='marginforError' style={{padding: '5px',margin: '5px'}}>
                      <p style={{paddingLeft: '5px'}}>This is a value of 1 INR in respective currency.</p>
                      <a href='https://www.google.com/search?q=1+inr+to+usd&oq=1+inr+&gs_lcrp=EgZjaHJvbWUqBwgBEAAYgAQyBggAEEUYOTIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIGCAYQRRg8MgYIBxBFGDzSAQg1MDIwajFqN6gCALACAA&sourceid=chrome&ie=UTF-8' target='_blank'>Click Here To See The Example</a>
                    </div>
                  }   placement="right-start">
              <div><FcInfo/></div>
            </HtmlTooltip>
            </div>
                  
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
              {data.map((item, index) => (
                <TableRow
                  key={item}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="p-2">
                    {item.name}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {item.countryCode}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {item.currencyRate}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    <Link to={`/add-continent/${item._id}`}>
                      <MdOutlineModeEditOutline className="icon" />
                    </Link>
                  </TableCell>
                  <TableCell align="center" className="p-2">
                  <MdDeleteOutline  className="icon"style={{color: 'red', cursor: 'pointer'}} onClick={() => deleteContinent(item._id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    )
}