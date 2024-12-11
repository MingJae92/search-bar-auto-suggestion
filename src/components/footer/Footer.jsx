import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "darkbrown",
        color: "white",
        py: 4,
        mt: 4,
        textAlign: "center",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            About Us
          </Typography>
          <Typography variant="body2">
            We’re dedicated to delivering the best experience for our users.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Contact
          </Typography>
          <Typography variant="body2">Email: info@example.com</Typography>
          <Typography variant="body2">Phone: +123 456 7890</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Follow Us
          </Typography>
          <Typography variant="body2">Facebook | Twitter | Instagram</Typography>
        </Grid>
      </Grid>
      <Typography variant="caption" sx={{ mt: 2, display: "block" }}>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
