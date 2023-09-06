import React, { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetweenComponents";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "./UserImage";
import {
  PersonAddOutlined,
  PersonOutline,
  PersonOutlineRounded,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import axios from "axios";
import state, { setFriends } from "state";

const Friends = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const [isAdd, setIsAdd] = useState(false);
  const token = useSelector((state) => state.token);
  const patchFriend = async () => {
    const response = await axios.patch(
      `http://localhost:3001/users/${_id}/${"64e7d33b9e6a5c2d0bda0589"}`,
      { done: "fine" },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setFriends({ firends: response.data }));
    console.log(response.data);
  };
  return (
    <FlexBetween m="1rem 0">
      <FlexBetween>
        <UserImage image={"Screenshot_20230720_125020.png"} />
        <Box>
          <Typography fontWeight="500" variant="h6">
            Muaz Adeyemi
          </Typography>
          <Typography>Lagos</Typography>
        </Box>
      </FlexBetween>
      <Box>
        {isAdd ? (
          <IconButton onClick={patchFriend}>
            <PersonAddOutlined />
          </IconButton>
        ) : (
          <IconButton onClick={patchFriend}>
            <PersonRemoveOutlined />
          </IconButton>
        )}
      </Box>
    </FlexBetween>
  );
};

export default Friends;
