import { Diversity1 } from "@mui/icons-material";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetweenComponents";
import Friends from "components/Friends";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar/Navbar";
import ProfilePage from "scenes/profilePage/ProfilePage";
import MyPosts from "scenes/widgets/MyPosts";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import state from "state";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
          sx={{
            flexBasis: isNonMobileScreens ? "26%" : undefined,
          }}
        >
          <UserWidget userId={_id} picturePath={picturePath} />

          <WidgetWrapper mt="1rem">
            <Typography fontWeight="600" variant="h4" mb="1rem">
              Freinds List
            </Typography>
            <Divider />
            <Friends />
            <Friends />
          </WidgetWrapper>
        </Box>

        <Box
          mt={isNonMobileScreens ? undefined : "2rem "}
          sx={{
            flexBasis: isNonMobileScreens ? "42%" : undefined,
          }}
        >
          <MyPosts picturePath={picturePath} />
          {/* <PostsWidget /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
