import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from "@mui/material";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getStore } from "../../services/dataServices";
import Loader from "../../common/loader/loader";
import CustomTableCell from "../../common/tableCell/tableCell";
import Pagination from "../../common/pagination/pagination";

function TablePaginationActions(props) {
  return <Pagination props={props} />;
}

export default function Tablee() {
  const [storeItems, setstoreItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
  useEffect(() => {
    callingApi();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {storeItems.length ? (
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <CustomTableCell name="Name" />
                    <CustomTableCell name="Category" />
                    <CustomTableCell name="Store" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? storeItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : storeItems
                  ).map((store) => {
                    return (
                      <TableRow
                        key={store._id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <CustomTableCell name={store.name} />
                        <CustomTableCell name={store.categories} />

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
                <TableRow>
                  {storeItems.length >= 5 && (
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                      count={storeItems.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page"
                        },
                        native: true
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  )}
                </TableRow>
              </Table>
            </TableContainer>
          ) : (
            <Typography style={{ display: "flex", justifyContent: "center", fontSize: "24px" }}>
              Nothing To Show
            </Typography>
          )}
        </div>
      )}
    </>
  );
}
