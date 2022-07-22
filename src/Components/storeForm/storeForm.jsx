import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Toaster } from "react-hot-toast";
import { TOAST_SUCCESS_MESSAGE } from "../../utilities/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addStore } from "../../redux/actions/storeAction";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function StoreForm() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState("");
  const [stores, setStores] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let path = "/";

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setCategories([...categories, value]);
    setCategoryType([]);
  }

  function removeCategory(index) {
    setCategories(categories.filter((el, i) => i !== index));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const newStore = {
      id: uuidv4(),
      name: name,
      categories: categories
    };
    setStores([...stores, newStore]);
    setName("");
    setCategoryType("");
    setCategories([]);
    if (name && categoryType) {
      toast.success(TOAST_SUCCESS_MESSAGE);
    }
    dispatch(addStore(newStore));
    navigate(path);
  };
  return (
    <Container>
      <Toaster position="top-right" reverseOrder={true} />
      <Grid>
        <Card
          sx={{
            mt: "5vh",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;"
          }}>
          <CardContent>
            <Typography variant="h4" component="div" ml="4vh" mt="4vh">
              <b> Create Store</b>
            </Typography>
            <Box
              component="form"
              sx={{
                padding: "2%",
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
                id="storeName"
                label="Store Name"
                variant="outlined"
                value={name}
              />
              <TextField
                onChange={(e) => {
                  setCategoryType(e.target.value);
                }}
                id="storeCategory"
                label="Store Categories"
                variant="outlined"
                color="primary"
                value={categoryType}
                onKeyDown={handleKeyDown}
                sx={{ marginTop: "20px", width: "100%" }}
              />
              <Grid
                container
                sx={{
                  display: "flex",
                  gap: ".3em"
                }}>
                {categories.map((categories, index) => (
                  <Grid
                    item
                    key={index}
                    sx={{
                      backgroundColor: "rgb(218, 216, 216)",
                      padding: "5px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2vh"
                    }}>
                    {categories}
                    <Grid
                      item
                      sx={{
                        height: "20px",
                        width: "20px",
                        backgroundColor: "rgb(48, 48, 48)",
                        color: "#fff",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: ".3em",
                        fontSize: "18px",
                        cursor: "pointer"
                      }}
                      onClick={() => removeCategory(index)}>
                      &times;
                    </Grid>
                  </Grid>
                ))}
              </Grid>

              <Button
                disabled={name === "" || categories?.length === 0}
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
                Create
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}

export default StoreForm;
