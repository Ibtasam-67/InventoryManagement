import React from "react";
import { Container } from "@mui/system";
import { Typography, CardContent, Grid, Divider, Fab, Tooltip } from "@mui/material";
import { GrAddCircle } from "../../common/icons/icons";
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
            <Tooltip placement="right" title="Add Store">
              <Link to="/storeform">
                <Fab color="primary" aria-label="add">
                  <div style={{ marginTop: "10px" }}>
                    <GrAddCircle
                      color="white"
                      title="folder icon"
                      className="additional-class-name"
                    />
                  </div>
                </Fab>
              </Link>
            </Tooltip>
          </Grid>
          <Divider sx={{ mt: "4vh" }} />
          <Table />
        </CardContent>
      </Grid>
    </Container>
  );
};

export default LandingPage;
