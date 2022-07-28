import React from "react";
import { TableCell, Typography } from "@mui/material";

const CustomTableCell = (props) => {
  return (
    <TableCell align="center">
      <Typography sx={{ fontWeight: "600" }}>{props.name}</Typography>
    </TableCell>
  );
};

export default CustomTableCell;
