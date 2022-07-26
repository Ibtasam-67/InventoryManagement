import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { Rings } from "react-loader-spinner";
import { getStore } from "../../services/dataServices";

const Tablee = () => {
  const [storeItems, setstoreItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const callingApi = () => {
      setLoading(true);
      getStore()
        .then((res) => {
          setLoading(false);
          setstoreItems(res.data.payload.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    callingApi();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center ">
          <Rings color="#00BFFF" height={400} width={1500} />
        </div>
      ) : (
        <div>
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
                {storeItems.map((store, index) => {
                  return (
                    <TableRow
                      key={store._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell sx={{ color: "black" }} align="center">
                        {store.name}
                      </TableCell>
                      <TableCell align="center">{store.categories}</TableCell>
                      <TableCell align="center">
                        <Link
                          style={{ textDecoration: "none", fontFamily: "Raleway sans-serif" }}
                          to={{
                            pathname: `/producttable/${store._id}`
                          }}>
                          <AiFillEye style={{ fontSize: "28px", color: "#1976D2" }} />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default Tablee;
