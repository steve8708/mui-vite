import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomerTable from "../components/CustomerTable";
import Paper from "@mui/material/Paper";

export default function Customers() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Customers Management
      </Typography>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : theme.palette.background.paper,
        }}
      >
        <CustomerTable />
      </Paper>
    </Box>
  );
}
