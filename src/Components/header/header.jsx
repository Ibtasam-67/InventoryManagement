/* eslint-disable no-empty-pattern */
import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Header = ({}) => {
  useEffect(() => {
    // throw new Error("Not valid Data");
  });

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="header-1">
      <AppBar position="static" className="header-color">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="h4" sx={{ color: "white" }}>
              Luminogics
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
