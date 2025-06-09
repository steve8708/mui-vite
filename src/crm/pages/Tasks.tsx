import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Tasks() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Tasks Page
      </Typography>
      <Typography paragraph>
        This is the tasks management page where you can track all your
        activities and follow-ups.
      </Typography>
    </Box>
  );
}
