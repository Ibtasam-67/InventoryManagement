import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
  Fab,
  Grid,
  CardContent,
  TablePagination,
  Tooltip
} from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/dataServices";
import { GrAddCircle } from "react-icons/gr";
import Loader from "../../common/loader/loader";
import CustomTableCell from "../../common/tableCell/tableCell";
import Pagination from "../../common/pagination/pagination";

function TablePaginationActions(props) {
  return <Pagination props={props} />;
}

const ProductTable = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
  useEffect(() => {
    callingApi();
  }, []);

  return (
    <>
      <Container>
        {loading ? (
          <Loader />
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

                <Fab color="primary" aria-label="add">
                  <Link to={`/productform/${id}`}>
                    <Tooltip placement="right" title="Add Product">
                      <div>
                        <GrAddCircle
                          fontSize="1.0em"
                          style={{ cursor: "pointer", marginTop: "10px" }}
                        />
                      </div>
                    </Tooltip>
                  </Link>
                </Fab>
              </Grid>
              <Divider sx={{ mt: "4vh" }} />

              {products.length ? (
                <TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <CustomTableCell name="Name" />
                        <CustomTableCell name="Category" />
                        <CustomTableCell name="Quantity" />
                        <CustomTableCell name="Price" />
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
                            <CustomTableCell name={product.name} />
                            <CustomTableCell name={product.category} />
                            <CustomTableCell name={product.quantity} />
                            <CustomTableCell name={product.price} />
                          </TableRow>
                        );
                      })}
                    </TableBody>
                    <TableRow>
                      {products.length >= 5 && (
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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
                      )}
                    </TableRow>
                  </Table>
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
