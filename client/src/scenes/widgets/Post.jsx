import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import axios from "axios";
import Friends from "components/Friends";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Post = ({
  name,
  picturePath,
  userPicturePath,
  postId,
  description,
  postUserId,
  occupation,
  location,
}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  return (
    <WidgetWrapper m="1rem auto">
      <Friends
        friendId={postUserId}
        userPicturePath={userPicturePath}
        name={name}
        subtitle={location}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://socialmedia-numu.onrender.com/assets/${picturePath}`}
        />
      )}{" "}
    </WidgetWrapper>
  );
};

export default Post;
