import React, { useState } from "react";
import { useEffect } from "react";
import {
  getCategories,
  getCollections,
  getProducts,
  updateInventory,
} from "../../services/API/Products";
import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Inventory.css";

export const Inventory = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [fetchedProducts, setFectchedProducts] = useState([]);
  const history = useHistory();

  const [inEditMode, setInEditMode] = useState({
    status: false,
    productId: null,
  });

  const [qty, setQty] = useState({
    XS: null,
    S: null,
    M: null,
    L: null,
    XL: null,
  });

  const [xsQty, setXsQty] = useState(null);
  const [sQty, setSQty] = useState(null);
  const [mQty, setMQty] = useState(null);
  const [lQty, setLQty] = useState(null);
  const [xlQty, setXLQty] = useState(null);

  const onEdit = ({
    id,
    currentXsQty,
    currentSQty,
    currentMQty,
    currentLQty,
    currentXLQty,
  }) => {
    console.log(id);
    setInEditMode({
      status: true,
      productId: id,
    });
    setQty({
      XS: currentXsQty,
      S: currentSQty,
      M: currentMQty,
      L: currentLQty,
      XL: currentXLQty,
    });
    console.log(qty);
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      productId: null,
    });
    // reset the qty state value
    setQty({
      ...qty,
      XS: null,
      S: null,
      M: null,
      L: null,
      XL: null,
    });
  };

  const onSave = async (id, qty) => {
    console.log(qty);
    setLoading(true);
    const { product, error } = await updateInventory(id, qty);
    if (error) {
      setLoading(false);
      toast("🎇 Product update failed!");
    }
    if (product) {
      setLoading(false);
      toast("🎇 Product update successful!");
      history.push("/inventory");
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      var { products, error } = await getProducts();

      if (error) {
        setLoading(!isLoading);
        setError(true);
        setErrorMessage("An error occurred.");
      }

      if (products) {
        console.log(products);
        setLoading(!isLoading);
        setFectchedProducts(products);
        setLoading(false);
      }
    }

    fetchProducts();
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
      <div>{console.log(qty)}</div>
      <h2>Inventory</h2>
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
                  XS Qty
                </TableCell>
                <TableCell align="center" className="p-2">
                  S Qty
                </TableCell>
                <TableCell align="center" className="p-2">
                  M Qty
                </TableCell>
                <TableCell align="center" className="p-2">
                  L Qty
                </TableCell>
                <TableCell align="center" className="p-2">
                  XL Qty
                </TableCell>
                <TableCell align="center" className="p-2">
                  Total Qty
                </TableCell>
                <TableCell align="center" className="p-2">
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="p-4 m-4">
              {fetchedProducts.map((product) => (
                <TableRow
                  key={product.slug}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="p-2">
                    {product.title}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {product.category?.name}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {product.collectionName?.title}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {inEditMode.status &&
                    inEditMode.productId === product._id ? (
                      <input
                        type="number"
                        value={qty.XS}
                        onChange={(event) =>
                          setQty({ ...qty, XS: parseInt(event.target.value) })
                        }
                        className="qty-input"
                      ></input>
                    ) : (
                      product.inventory.XS
                    )}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {inEditMode.status &&
                    inEditMode.productId === product._id ? (
                      <input
                        type="number"
                        value={qty.S}
                        onChange={(event) =>
                          setQty({ ...qty, S: parseInt(event.target.value) })
                        }
                        className="qty-input"
                      ></input>
                    ) : (
                      product.inventory.S
                    )}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {inEditMode.status &&
                    inEditMode.productId === product._id ? (
                      <input
                        type="number"
                        value={qty.M}
                        onChange={(event) =>
                          setQty({ ...qty, M: parseInt(event.target.value) })
                        }
                        className="qty-input"
                      ></input>
                    ) : (
                      product.inventory.M
                    )}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {inEditMode.status &&
                    inEditMode.productId === product._id ? (
                      <input
                        type="number"
                        value={qty.L}
                        onChange={(event) =>
                          setQty({ ...qty, L: parseInt(event.target.value) })
                        }
                        className="qty-input"
                      ></input>
                    ) : (
                      product.inventory.L
                    )}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {inEditMode.status &&
                    inEditMode.productId === product._id ? (
                      <input
                        type="number"
                        value={qty.XL}
                        onChange={(event) =>
                          setQty({ ...qty, XL: parseInt(event.target.value) })
                        }
                        className="qty-input"
                      ></input>
                    ) : (
                      product.inventory.XL
                    )}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {product.inventory.XL +
                      product.inventory.L +
                      product.inventory.M +
                      product.inventory.S +
                      product.inventory.XS}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {inEditMode.status &&
                    inEditMode.productId === product._id ? (
                      <>
                        <button onClick={() => onSave(product._id, qty)}>
                          Save
                        </button>
                        <button onClick={() => onCancel()}>Cancel</button>
                      </>
                    ) : (
                      <MdOutlineModeEditOutline
                        className="icon"
                        onClick={() =>
                          onEdit({
                            id: product._id,
                            currentXsQty: product.inventory.XS,
                            currentSQty: product.inventory.S,
                            currentMQty: product.inventory.M,
                            currentLQty: product.inventory.L,
                            currentXLQty: product.inventory.XL,
                          })
                        }
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
