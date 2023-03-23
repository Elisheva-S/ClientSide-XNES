import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../variables";
import resources from "./resources";
export default function Details() {
  const [departmentsRows, setDepartmentsRows] = useState([]);
  const [productsRows, setProductsRows] = useState([]);
  ////////////////////////////////////////// This function get all of depatrments for display
  const getDepartmentsData = async () => {
    try {
      const response = await axios.get(variables.BASE_URL + variables.GetDep);
      setDepartmentsRows(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  ////////////////////////////////////////// This function get all of products for display
  const getProductsData = async () => {
    try {
      const response = await axios.get(variables.BASE_URL + variables.GetPro);
      setProductsRows(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  ////////////////////////////////////////// This function load the departments list and products list for the display
  useEffect(() => {
    getDepartmentsData();
    getProductsData();
  });
  const navigate = useNavigate(); //This allow open another pages.
  ////////////////////////////////////////// This function delete department by id
  const deleteDepartmentById = async (id) => {
    try {
      //add check that there is no product in this department
      await axios.delete(variables.BASE_URL + variables.DeleteDep + id, id);
    } catch (err) {
      console.log(err);
    }
  };
  ////////////////////////////////////////// This function delete product by id
  const deleteProductById = async (id) => {
    try {
      await axios.delete(variables.BASE_URL + variables.DeletePro + id, id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">{resources.DepartmentId}</TableCell>
              <TableCell align="left">{resources.DepartmentName}</TableCell>
              <TableCell align="left">{resources.Description}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departmentsRows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {row.DepartmentId}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {row.DepartmentName}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {row.Description}
                </TableCell>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => {
                      navigate("/EditDep", {
                        state: row.DepartmentId.toString(),
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => {
                      deleteDepartmentById(row.DepartmentId);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <hr></hr>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">{resources.DepartmentName}</TableCell>
              <TableCell align="left">{resources.ProductId}</TableCell>
              <TableCell align="left">{resources.ProductName}</TableCell>
              <TableCell align="left">{resources.Price}</TableCell>
              <TableCell align="left">{resources.UnitsInStock}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsRows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {row.DepartmentId}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {row.ProductId}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {row.ProductName}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {row.Price}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {row.InStock}
                </TableCell>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => {
                      navigate("/EditPro", {
                        state: row.ProductId.toString(),
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => {
                      deleteProductById(row.ProductId);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
