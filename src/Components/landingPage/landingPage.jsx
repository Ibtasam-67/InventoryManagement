import React from "react";
import { Container } from "@mui/system";
import { Typography, CardContent, Grid, Divider, Fab } from "@mui/material";
import { GrAddCircle } from "react-icons/gr";
import Table from "../storeTable/storeTable";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Container>
      <Grid
        sx={{
          mt: "5vh",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;"
        }}>
        <CardContent>
          <Grid sx={{ display: "flex", justifyContent: "space-between", width: "96%" }}>
            <Typography variant="h4" ml="2vh">
              Stores
            </Typography>
            <Link to="/storeform">
              <Fab color="primary" aria-label="add">
                <GrAddCircle />
              </Fab>
            </Link>
          </Grid>
          <Divider sx={{ mt: "4vh" }} />
          <Table />
        </CardContent>
      </Grid>
    </Container>
  );
};

export default LandingPage;
