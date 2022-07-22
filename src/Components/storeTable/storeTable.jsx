/* eslint-disable prettier/prettier */
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import {AiFillEye} from "react-icons/ai"

const Tablee = () => {
  const data = useSelector((state) => state.store.data);
  return (
    <>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography sx={{ fontWeight: "600" }}>Store#</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontWeight: "600" }}>Name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontWeight: "600" }}>Category</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontWeight: "600" }}>Store</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((store, index) => {
              return (
                <TableRow key={store.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell sx={{color : "black" }}  align="center">{store.name}</TableCell>
                  <TableCell align="center">
                    {store.categories}
                  </TableCell>
                  <TableCell align="center">
                      <Link
                        style={{ textDecoration: "none", fontFamily: "Raleway sans-serif" }}          
                        to={{
                          pathname:`/producttable/${store.id}`
                        }}>
                        <AiFillEye style={{fontSize:"28px",color:"#1976D2"}}/>
                      </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Tablee;
