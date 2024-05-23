import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box } from "@mui/material";
import FlexBetween from "components/FlexBetweenComponents";

const Error = ({ message }) => {
  return (
    <Box
      className="error-message"
      sx={{
        color: "#DC143C",
        display: "flex",
        justifyContent: "center",
        fontSize: "0.9rem",
      }}
    >
      <p
      // style={{
      //   display: "inline",
      // }}
      >
        {message}
      </p>
    </Box>
  );
};

export default Error;
