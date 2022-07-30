import React, { useEffect } from "react";
import { Toolbar, AppBar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    // throw new Error("Not valid Data");
  });

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="header-1">
      <AppBar position="static" className="header-color">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
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
