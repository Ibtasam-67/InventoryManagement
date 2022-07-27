import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import { GrAddCircle } from "react-icons/gr";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/dataServices";
import { Rings } from "react-loader-spinner";
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

const ProductTable = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  console.log(products, "products");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
      getProducts(id)
        .then((res) => {
          setLoading(false);
          setProducts(res.data.payload.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    callingApi();
  }, []);

  return (
    <>
      <Container>
        {loading ? (
          <div className="flex justify-center items-center ">
            <Rings color="#00BFFF" height={400} width={1500} />
          </div>
        ) : (
          <Grid
            sx={{
              mt: "5vh",
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;"
            }}>
            <CardContent>
              <Grid sx={{ display: "flex", justifyContent: "space-between", width: "91%" }}>
                <Typography variant="h4" ml="2vh">
                  Products
                </Typography>
                <Link to={`/productform/${id}`}>
                  <Fab color="primary" aria-label="add">
                    <GrAddCircle style={{ color: "white" }} />
                  </Fab>
                </Link>
              </Grid>
              <Divider sx={{ mt: "4vh" }} />

              {products.length ? (
                <TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Typography sx={{ fontWeight: "600" }}>Name</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography sx={{ fontWeight: "600" }}>Category</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography sx={{ fontWeight: "600" }}>Quantity</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography sx={{ fontWeight: "600" }}>Price</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : products
                      ).map((product) => {
                        return (
                          <TableRow
                            key={product.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell align="center">{product.name}</TableCell>
                            <TableCell align="right">{product.category}</TableCell>
                            <TableCell align="right">{product.quantity}</TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[2, 5, 10, { label: "All", value: -1 }]}
                          colSpan={3}
                          count={products.length}
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
                  <Divider />
                </TableContainer>
              ) : (
                <Typography style={{ display: "flex", justifyContent: "center", fontSize: "24px" }}>
                  Nothing To Show
                </Typography>
              )}
            </CardContent>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ProductTable;
