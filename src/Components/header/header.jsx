import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    // throw new Error("Not valid Data");
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="header-color">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}></IconButton>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="h4" sx={{ color: "white" }}>
              Luminogics
            </Typography>
          </Link>

          {/* <marquee
            style={{
              fontFamily: "Raleway sans-serif",
              fontSize: "34px"
            }}
            component="div"
            sx={{ flexGrow: 1 }}>
            Inventory Management System
          </marquee> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
