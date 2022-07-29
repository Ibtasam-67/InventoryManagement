import React from "react";
import { TableCell, Typography } from "@mui/material";

const CustomTableCell = (props) => {
  return (
    <TableCell align="center">
      <Typography
        sx={{
          fontWeight: props.isHeader ? "600" : "400",
          fontSize: props.isHeader ? "20px" : "18px"
        }}>
        {props.name}
      </Typography>
    </TableCell>
  );
};

export default CustomTableCell;
