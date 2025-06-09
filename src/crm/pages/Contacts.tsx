import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Contacts() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Contacts Page
      </Typography>
      <Typography paragraph>
        This is the contacts management page where you can organize and manage
        your business contacts.
      </Typography>
    </Box>
  );
}
