import React, { useState, useEffect } from "react";
import {
  CardContent,
  MenuItem,
  TextField,
  Box,
  Divider,
  Typography,
  Button,
  InputLabel,
  Select,
  FormControl,
  Grid,
  CircularProgress
} from "@mui/material";
import { Toaster } from "react-hot-toast";
import { TOAST_SUCCESS_MESSAGE } from "../../utilities/constants";
import toast from "react-hot-toast";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/actions/productAction";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createProduct, getStoreById } from "../../services/dataServices";

function ProductForm() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const callingApi = () => {
      getStoreById(id)
        .then((res) => {
          setProducts(res.data.payload.data.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    callingApi();
  }, []);

  const dispatch = useDispatch();

  let navigate = useNavigate();
  let path = "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      name: name,
      category: category,
      price: price,
      quantity: quantity
    };
    const result = await createProduct(payload, id);
    if (name && quantity && price && category) {
      toast.success(TOAST_SUCCESS_MESSAGE);
    }
    setCategory("");
    setName("");
    setQuantity("");
    setPrice("");
    dispatch(addProduct(result.data.payload.data));
    setTimeout(() => {
      navigate(path);
    }, 1000);
    setLoading(false);
  };
  return (
    <Container>
      <Toaster position="top-right" reverseOrder={true} />
      <Grid
        sx={{
          mt: "5vh",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;"
        }}>
        <CardContent>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" ml="2vh">
              Add Product Details
            </Typography>
          </Grid>
          <Divider />
          <Box
            component="form"
            sx={{
              padding: "3%",
              display: "flex",
              flexDirection: "column"
            }}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}>
            <TextField
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="productName"
              label="Product Name"
              variant="outlined"
              value={name}
              sx={{ marginTop: "20px", width: "100%" }}
            />
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>

              <Select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                required>
                {products.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              type="number"
              id="productQsuantity"
              label="Product Quantity"
              variant="outlined"
              value={quantity}
              sx={{ marginTop: "20px", width: "100%" }}
            />
            <TextField
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              type="number"
              id="productPrice"
              label="Product Price"
              variant="outlined"
              value={price}
              sx={{ marginTop: "20px", width: "100%" }}
            />

            <Button
              disabled={name === "" || price === "" || quantity === "" || category?.length === 0}
              sx={{
                marginTop: "20px",
                bgcolor: "rgb(55,175,195)",
                fontSize: "18px",
                fontFamily: "Raleway sans-serif",
                "&:hover": {
                  background: "rgb(55,175,195)"
                }
              }}
              variant="contained"
              onClick={onSubmit}>
              {loading ? <CircularProgress /> : "Create"}
            </Button>
          </Box>
        </CardContent>
      </Grid>
    </Container>
  );
}

export default ProductForm;
