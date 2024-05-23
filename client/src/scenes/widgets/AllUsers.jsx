import { Box, Divider, Typography } from "@mui/material";
import Friends from "components/Friends";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const AllUsers = () => {
  const token = useSelector((state) => state.token);
  const [users, setUsers] = useState([]);
  const { _id } = useSelector((state) => state.user);
  const getAllUsers = async () => {
    const response = await fetch(
      `https://socialmedia-numu.onrender.com/users/`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <WidgetWrapper mt="1rem">
      <Typography variant="h4" fontWeight="600" m="1rem 0">
        Suggested
      </Typography>
      <Divider />

      {users.map((user) =>
        user._id === _id ? null : (
          <Box>
            <Friends
              key={user._id}
              friendId={user._id}
              name={`${user.firstName} ${user.lastName}`}
              subtitle={user.occupation}
              userPicturePath={user.picturePath}
            />
            <Divider />
          </Box>
        )
      )}
    </WidgetWrapper>
  );
};

export default AllUsers;
