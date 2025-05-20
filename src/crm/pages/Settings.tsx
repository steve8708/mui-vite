import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Settings() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Settings Page
      </Typography>
      <Typography paragraph>
        This is the settings page where you can configure your CRM preferences
        and manage your account.
      </Typography>
    </Box>
  );
}
