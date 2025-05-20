import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function CrmCustomerDistributionMap() {
  const theme = useTheme();
  const [mapView, setMapView] = React.useState("customers");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setMapView(newValue);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" component="h3">
            Customer Distribution
          </Typography>
          <Tabs
            value={mapView}
            onChange={handleChange}
            aria-label="map view tabs"
            sx={{ minHeight: "auto", "& .MuiTabs-indicator": { height: 2 } }}
          >
            <Tab
              label="Customers"
              value="customers"
              disableRipple
              sx={{ px: 2, py: 1, minWidth: "auto", minHeight: "auto" }}
            />
            <Tab
              label="Revenue"
              value="revenue"
              disableRipple
              sx={{ px: 2, py: 1, minWidth: "auto", minHeight: "auto" }}
            />
            <Tab
              label="Growth"
              value="growth"
              disableRipple
              sx={{ px: 2, py: 1, minWidth: "auto", minHeight: "auto" }}
            />
          </Tabs>
        </Stack>

        <Box
          sx={{
            height: 300,
            width: "100%",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.03)",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="text.secondary">
            Map visualization would appear here
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
