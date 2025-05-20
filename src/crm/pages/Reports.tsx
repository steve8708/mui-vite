import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Reports() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Reports Page
      </Typography>
      <Typography paragraph>
        This is the reports page where you can access and generate various
        analytics and insights.
      </Typography>
    </Box>
  );
}
