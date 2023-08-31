import { ManageAccountsOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import FlexBetween from "components/FlexBetweenComponents";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState([]);
  const token = useSelector((state) => state.token);
  const getUser = async () => {
    const response = await axios.get(`http://localhost:3001/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(response.data);
  };
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    firstName,
    lastName,
    location,
    occupation,
    friends,
    email,
    viewedProfile,
    impressions,
  } = user;
  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" padding="1.1rem">
        <FlexBetween>
          <Typography fontWeight="500">
            {firstName} {lastName}
          </Typography>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
    </WidgetWrapper>
  );
};

export default UserWidget;
