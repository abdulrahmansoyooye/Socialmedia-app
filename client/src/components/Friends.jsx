import React, { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetweenComponents";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "./UserImage";
import {
  EditOffOutlined,
  EditOutlined,
  PersonAddOutlined,
  PersonOutline,
  PersonOutlineRounded,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import axios from "axios";
import state, { setFriends } from "state";
import { useNavigate } from "react-router-dom";

const Friends = ({ friendId, userPicturePath, name, subtitle }) => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const isFriend = user.friends.find((friend) => friend._id === friendId);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const patchFriend = async () => {
    const response = await fetch(
      `https://socialmedia-numu.onrender.com/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  return (
    <FlexBetween
      m="1rem 0"
      style={{
        cursor: "pointer",
      }}
    >
      <FlexBetween
        gap="0.5rem"
        onClick={() => navigate(`/profile/${friendId}`)}
      >
        {userPicturePath && <UserImage image={userPicturePath} />}

        <Box>
          <Typography fontWeight="500" variant="h6">
            {name}
          </Typography>
          <Typography>{subtitle}</Typography>
        </Box>
      </FlexBetween>
      {friendId === _id ? (
        <IconButton>
          <EditOutlined />
        </IconButton>
      ) : (
        <Box>
          {!isFriend ? (
            <IconButton onClick={() => patchFriend()}>
              <PersonAddOutlined />
            </IconButton>
          ) : (
            <IconButton onClick={() => patchFriend()}>
              <PersonRemoveOutlined />
            </IconButton>
          )}
        </Box>
      )}
    </FlexBetween>
  );
};

export default Friends;
