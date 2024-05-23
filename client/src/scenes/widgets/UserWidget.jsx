import {
  LocationCity,
  LocationCityOutlined,
  LocationCityRounded,
  LocationOnOutlined,
  ManageAccountsOutlined,
  RemoveRedEyeOutlined,
  ViewSidebarOutlined,
  Work,
  WorkOutline,
} from "@mui/icons-material";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import FlexBetween from "components/FlexBetweenComponents";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState([]);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const getUser = async () => {
    const response = await axios.get(
      `https://socialmedia-numu.onrender.com/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
    impression,
  } = user;
  return (
    <WidgetWrapper
      onClick={() => navigate(`/profile/${userId}`)}
      style={{
        cursor: "pointer",
      }}
    >
      {/* First Row */}
      <FlexBetween gap="0.5rem" padding="1.1rem">
        <FlexBetween gap="1rem">
          {picturePath === "" ? null : <UserImage image={picturePath} />}
          <Typography fontWeight="500">
            {firstName} {lastName}
          </Typography>

          {/* <UserImage /> */}
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
      {/* Second Row */}
      <FlexBetween gap="0.5rem" padding="1.1rem">
        <FlexBetween>
          <Typography fontWeight="500">{location}</Typography>
        </FlexBetween>
        <LocationOnOutlined />
      </FlexBetween>
      <Divider />
      {/* Third Row */}
      <FlexBetween gap="0.5rem" padding="1.1rem">
        <FlexBetween>
          <Typography fontWeight="500">{occupation}</Typography>
        </FlexBetween>
        <WorkOutline />
      </FlexBetween>
      <Divider />
      {/* Fourth Row */}
      <FlexBetween gap="0.5rem" padding="1.1rem">
        <FlexBetween gap="0.5rem">
          <Typography fontWeight="500">Who's viewed your Profile</Typography>
        </FlexBetween>

        {viewedProfile}
      </FlexBetween>

      {/* Fifth Row */}
      <FlexBetween gap="0.5rem" padding="1.1rem">
        <FlexBetween>
          <Typography fontWeight="500">Impressions of your posts </Typography>
        </FlexBetween>

        {impression}
      </FlexBetween>
      <Divider />
    </WidgetWrapper>
  );
};

export default UserWidget;
