import { Box } from "@mui/material";
import React from "react";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        alt="user"
        height={size}
        width={size}
        src={`https://socialmedia-numu.onrender.com/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
