import React from "react";
import { Box, Typography, Grid2, createTheme, ThemeProvider } from "@mui/material";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2", // MUI blue color
      contrastText: "#FFFFFF", // White text color for contrast
    },
  },
});

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          backgroundColor: "primary.main", // Use MUI blue color
          color: "primary.contrastText", // White text for contrast
          py: 4,
          mt: 4,
          textAlign: "center",
        }}
      >
        <Grid2 container spacing={2} justifyContent="center">
          <Grid2 xs={12} sm={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              About Us
            </Typography>
            <Typography variant="body2">
              We’re dedicated to delivering the best experience for our users.
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Contact
            </Typography>
            <Typography variant="body2">Email: info@example.com</Typography>
            <Typography variant="body2">Phone: +123 456 7890</Typography>
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Follow Us
            </Typography>
            <Typography variant="body2">Facebook | Twitter | Instagram</Typography>
          </Grid2>
        </Grid2>
        <Typography variant="caption" sx={{ mt: 2, display: "block" }}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
