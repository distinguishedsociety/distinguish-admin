import React, { useState, useEffect } from 'react'
import { Triangle } from "react-loader-spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import { deleteBlog, getBlogs } from '../../services/API/Blogs';
import { ToastContainer, toast } from "react-toastify";
import { EditBlog } from './EditBlog';


export const Blogs = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [fetchedBlogs, setFectchedBlogs] = useState([]);
    const history = useHistory()

    useEffect(() => {
        async function fetchBlogs() {
          var { blogs, error } = await getBlogs();
    
          if (error) {
            setLoading(!isLoading);
            setError(true);
            setErrorMessage("An error occurred.");
          }
    
          if (blogs) {
            console.log(blogs);
            setLoading(!isLoading);
            setFectchedBlogs(blogs);
            setLoading(false);
          }
        }
    
        fetchBlogs();
      }, []);

    const handleDeleteBlog = async (id) => {
        console.log(id)
        setLoading(true)
        const { blog, error } = await deleteBlog(id)
        if (error) {
            setLoading(false);
            setError(true);
            setErrorMessage(error);
            toast("🎇 Blog deletion failed!");
          }
    
          if (blog) {
            console.log(blog);
            setLoading(false);
            toast("🎇 Blog deleted successfully!");
            history.push("/blogs");
          }
    }

    const handleAddBlog = () => {
        history.push("/add-blog")
    }

    if (isLoading) {
        return (
          <div className="mainpage d-flex justify-content-center align-items-center flex-column">
            <Triangle ariaLabel="loading-indicator" color="black" />
          </div>
        );
      }

  return (
    <div className='mainpage'>
        <div className="d-flex justify-content-between">
            <h2 className='mb-2'>Blogs</h2>
            <button className="btn btn-primary mx-2 px-2 mb-4" onClick={() => handleAddBlog()}>Add Blog</button>
        </div>
        <div className="table-div">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className="p-2">
                  Title
                </TableCell>
                <TableCell align="center" className="p-2">
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
              {fetchedBlogs.map((blog, index) => (
                <TableRow
                  key={blog._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="p-2">
                    {blog.title}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {blog.description}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    <Link to={`/view-blog/${blog._id}`}>
                      <MdOutlineModeEditOutline className="icon" />
                    </Link>
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    <MdDeleteOutline className="icon" onClick={() => handleDeleteBlog(blog._id)} />
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
