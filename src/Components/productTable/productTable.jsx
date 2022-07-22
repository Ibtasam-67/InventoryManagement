import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import { GrAddCircle } from "react-icons/gr";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";
const ProductTable = () => {
  const { id } = useParams();
  const data = useSelector((state) => {
    return state.product.data?.filter((pro) => pro.category.id === id);
  });
  console.log(data);
  return (
    <>
      <Container>
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
                  {data.map((store) => {
                    return (
                      <TableRow
                        key={store.name}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell align="center">{store.name}</TableCell>
                        <TableCell align="right">{store.category.categories}</TableCell>
                        <TableCell align="right">{store.quantity}</TableCell>
                        <TableCell align="right">{store.price}</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Divider />
            </TableContainer>
          </CardContent>
        </Grid>
      </Container>
    </>
  );
};

export default ProductTable;
