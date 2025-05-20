import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CrmDashboard from "./crm/CrmDashboard";
import Customers from "./crm/pages/Customers";
import Deals from "./crm/pages/Deals";
import Contacts from "./crm/pages/Contacts";
import Tasks from "./crm/pages/Tasks";
import Settings from "./crm/pages/Settings";
import Reports from "./crm/pages/Reports";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        404: Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you're looking for doesn't exist or has been moved.
      </Typography>
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route path="/" element={<CrmDashboard />}>
          <Route index element={<CrmDashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="deals" element={<Deals />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
