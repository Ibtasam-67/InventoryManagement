import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
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
import IconButton from "@mui/material/IconButton";
import { BiFirstPage } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiLastPage } from "react-icons/bi";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === "rtl" ? <BiLastPage /> : <BiFirstPage />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === "rtl" ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === "rtl" ? <BiFirstPage /> : <BiLastPage />}
      </IconButton>
    </Box>
  );
}

export default function Tablee() {
  const [storeItems, setstoreItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          {storeItems.length ? (
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
                  {(rowsPerPage > 0
                    ? storeItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : storeItems
                  ).map((store, index) => {
                    return (
                      <TableRow
                        key={store._id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>{index}</TableCell>
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
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                      colSpan={3}
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
                  </TableRow>
                </TableFooter>
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

// export default Tablee;
