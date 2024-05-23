import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import Post from "./Post";
import Loader from "components/Loader/Loader";
import { Box, Button, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetweenComponents";
import { useNavigate } from "react-router-dom";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://socialmedia-numu.onrender.com/posts",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const getUserPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://socialmedia-numu.onrender.com/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {posts.length !== 0 ? (
            posts.map(
              ({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
                occupation,
              }) => (
                <Post
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
                  occupation={occupation}
                />
              )
            )
          ) : (
            <Box>
              <Box
                fontSize={"1rem"}
                fontWeight={"500"}
                m="3rem"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                justifyContent={"center"}
                alignItems={"center"}
                gap="2rem"
              >
                You have No post yet
                <Button variant="outlined" onClick={() => navigate(`/home`)}>
                  Add a Post Here
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default PostsWidget;
