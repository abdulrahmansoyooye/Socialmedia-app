import { Typography } from "@mui/material";
import axios from "axios";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const PostsWidget = () => {
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const getPosts = async () => {
    const response = await axios.get("http://localhost:3001/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setPosts({ posts: response.data }));
  };
  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return posts.map(
    ({
      _id,
      userId,
      firstName,
      lastName,
      description,
      picturePath,
      userPicturePath,
      likes,
      location,
      comments,
    }) => (
      <PostsWidget
        key={_id}
        postId={_id}
        postUserId={userId}
        name={`${firstName} ${lastName}`}
        description={description}
        location={location}
        picturePath={picturePath}
        userPicturePath={userPicturePath}
        likes={likes}
        comments={comments}
      />
    )
  );
};

export default PostsWidget;
