import { useTheme } from "@emotion/react";
import {
  AttachFileOutlined,
  AudiotrackOutlined,
  ClosedCaptionOutlined,
  DeleteOutlined,
  EditOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import FlexBetween from "components/FlexBetweenComponents";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPosts = ({ picturePath }) => {
  const [value, setValue] = useState("");
  const { palette } = useTheme();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", value);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    try {
      const response = await axios.post(
        "https://socialmedia-numu.onrender.com/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const posts = await response.data;
      dispatch(setPosts({ posts }));
      setValue("");
      setImage(null);
      setIsImage(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
        mb="2rem"
      >
        <FlexBetween gap="1rem">
          {picturePath && <UserImage image={picturePath} />}

          <InputBase
            placeholder="What's on your mind?"
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </FlexBetween>

        {isImage && (
          <Box
            border={`1px solid ${palette.neutral.mediumMain}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => {
                return (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      width="100%"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>Add Image Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <IconButton>
                            <EditOutlined />
                          </IconButton>
                        </FlexBetween>
                      )}
                    </Box>

                    {image && (
                      <IconButton onClick={() => setImage(null)}>
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBetween>
                );
              }}
            </Dropzone>
          </Box>
        )}
      </Box>
      <Divider />

      <FlexBetween mt="1rem" sx={{ color: palette.neutral.mediumMain }}>
        <FlexBetween
          gap="0.25rem"
          onClick={(e) => setIsImage(!isImage)}
          sx={{
            cursor: "pointer",
            " &:hover": {
              color: palette.primary.main,
            },
          }}
        >
          <Typography>Image</Typography>
          <ImageOutlined />
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <Typography>Audio</Typography>

              <AudiotrackOutlined />
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <Typography>Caption</Typography>
              <ClosedCaptionOutlined />
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <Typography>Attachment</Typography>
              <AttachFileOutlined />
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined />
          </FlexBetween>
        )}

        <Button
          disabled={value === "" ? true : false}
          sx={{
            backgroundColor: palette.primary.main,
            fontSize: "0.75rem",
            borderRadius: "2rem",
            color: palette.background.alt,
          }}
          onClick={handlePost}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPosts;
