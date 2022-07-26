import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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

const ProductTable = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

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
                    {products.map((product) => {
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
                </Table>
                <Divider />
              </TableContainer>
            </CardContent>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ProductTable;
