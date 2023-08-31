import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 2.25rem",
  borderRadius: "0.625rem",
  backgroundColor: theme.palette.background.alt,
}));

export default WidgetWrapper;
