import { Typography } from "@mui/material";
import axios from "axios";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Post = ({
  firstName,
  lastName,
  picturePath,
  userPicturePath,
  description,
}) => {
  return (
    <WidgetWrapper m="2rem auto">
      <Typography>{firstName}</Typography>
      <Typography>{lastName}</Typography>
      <Typography>{picturePath}</Typography>
      <Typography>{userPicturePath}</Typography>
      <Typography>{description}</Typography>
    </WidgetWrapper>
  );
};

export default Post;
