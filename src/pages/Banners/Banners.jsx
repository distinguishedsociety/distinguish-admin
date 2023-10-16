import React, { useEffect, useState } from "react";
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
import { getBanners, deleteBanner } from "../../services/API/Banners";
import { AiOutlineDelete } from "react-icons/ai";

export const Banners = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [fetchedBanners, setFectchedBanners] = useState([]);
  const [rerender, setRerender] = useState(0);

  useEffect(() => {
    async function fetchBanners() {
      var { banners, error } = await getBanners();

      if (error) {
        setLoading(!isLoading);
        setError(true);
        setErrorMessage("An error occurred.");
      }

      if (banners) {
        console.log(banners);
        setLoading(!isLoading);
        setFectchedBanners(banners);
        setLoading(false);
      }
    }

    fetchBanners();
  }, [rerender]);

  const handleDelete = async (banner) => {
    setLoading(true);
    var { error } = await deleteBanner(banner);

    if (error) {
      setLoading(!isLoading);
      setError(true);
      setErrorMessage("An error occurred.");
    }

    setRerender(rerender + 1);
    // fetchedBanners.filter((item) => item._id != banner._id);

    // setFectchedBanners(fetchedBanners);
  };

  const handleAddBanner = () => {};

  if (isLoading) {
    return (
      <div className="mainpage d-flex justify-content-center align-items-center flex-column">
        <Triangle ariaLabel="loading-indicator" color="black" />
      </div>
    );
  }
  return (
    <>
      <div className="mainpage">
        <h2>Banners</h2>
        <Link to={`/add-banner`}>
          <button className="btn btn-primary p-2 m-2">Add Banner</button>
        </Link>
        <div className="table-div">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="p-2">
                    ID
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    Image
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    Redirect Link
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="p-4 m-4">
                {fetchedBanners.map((banner, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" className="p-2">
                      {index + 1}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      className="p-2"
                    >
                      <img
                        height={200}
                        width={400}
                        src={banner.imageLink}
                      ></img>
                    </TableCell>
                    <TableCell align="center" className="p-2">
                      {banner.redirectLink}
                    </TableCell>

                    <TableCell align="center" className="p-2">
                      <Link to={`/edit-banner/${banner._id}`}>
                        <MdOutlineModeEditOutline className="icon" />
                      </Link>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDelete(banner)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};
