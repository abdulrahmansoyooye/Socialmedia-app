import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar/Navbar";
import FriendWidget from "scenes/widgets/FriendWidget";
import PostsWidget from "scenes/widgets/PostsWidget";

const ProfilePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath, firstName } = useSelector((state) => state.user);
  const { userId } = useParams();
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
      >
        <Box
          sx={{
            flexBasis: isNonMobileScreens ? "26%" : undefined,
          }}
        >
          <FriendWidget />
        </Box>

        <Box
          mt={isNonMobileScreens ? undefined : "2rem "}
          sx={{
            flexBasis: isNonMobileScreens ? "42%" : undefined,
          }}
        >
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
