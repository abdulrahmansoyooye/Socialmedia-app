import { useTheme } from "@emotion/react";
import { EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import FlexBetween from "components/FlexBetweenComponents";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setLogin } from "state";
import * as Yup from "yup";
const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  occupation: Yup.string().required("Occupation is required"),
  location: Yup.string().required("Location is required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  occupation: "",
  location: "",
  picture: "",
};
const LogiInitialValues = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [picture, setPicture] = useState("");
  const handleLogin = async (values, onSubmitProps) => {
    const loggedIn = await axios.post(
      "http://localhost:3001/auth/login",
      values
    );
    onSubmitProps.resetForm();
    console.log(loggedIn);
    console.log(loggedIn.status === 200);
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.data.user,
          token: loggedIn.data.token,
        })
      );
      navigate("/home");
    }
  };
  const handleRegister = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (const value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picture", picture);
      const savedUser = axios.post(
        "http://localhost:3001/auth/register",
        formData
      );
      onSubmitProps.resetForm();
      if (savedUser) {
        setPageType("login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) handleLogin(values, onSubmitProps);
    if (isRegister) handleRegister(values, onSubmitProps);
  };
  const onDrop = (acceptedFiles) => {
    setPicture(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <Formik
      initialValues={isLogin ? LogiInitialValues : RegisterInitialValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors,
        touched,
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              div: {
                gridColumn: isNonMobileScreens ? undefined : "span 4",
              },
            }}
          >
            {isRegister ? (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error"
                />

                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  sx={{
                    gridColumn: "span 4",
                  }}
                />

                <TextField
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid `}
                  borderRadius="5px"
                  p="1rem"
                  sx={{
                    backgroundColor: "#0000",
                  }}
                  {...getRootProps()}
                >
                  <TextField {...getInputProps()}>
                    {isDragActive && (
                      <Typography>upload or drag STL files</Typography>
                    )}
                  </TextField>
                  <Typography>Upload your picture</Typography>
                </Box>
                <TextField
                  type="text"
                  label="Location"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <TextField
                  type="text"
                  label="Occupation"
                  name="occupation"
                  value={values.occupation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
              </>
            ) : (
              <>
                <TextField
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
              </>
            )}
          </Box>

          {/* Button */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                isLogin ? setPageType("register") : setPageType("login");
              }}
              sx={{
                textDecoration: "underline",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              textAlign="center"
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
