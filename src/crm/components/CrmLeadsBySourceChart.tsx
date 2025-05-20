import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";

// Sample lead source data
const leadSources = [
  { id: 0, value: 35, label: "Website", color: "#3f51b5" },
  { id: 1, value: 25, label: "Referrals", color: "#2196f3" },
  { id: 2, value: 20, label: "Social Media", color: "#4caf50" },
  { id: 3, value: 15, label: "Email Campaigns", color: "#ff9800" },
  { id: 4, value: 5, label: "Other", color: "#9e9e9e" },
];

export default function CrmLeadsBySourceChart() {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          Leads by Source
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PieChart
            series={[
              {
                data: leadSources,
                arcLabel: (item) => `${item.value}%`,
                arcLabelMinAngle: 20,
                innerRadius: 60,
                paddingAngle: 2,
                cornerRadius: 4,
                valueFormatter: (value) => `${value}%`,
              },
            ]}
            height={280}
            slotProps={{
              legend: {
                position: { vertical: "middle", horizontal: "right" },
                direction: "column",
                itemMarkWidth: 10,
                itemMarkHeight: 10,
                markGap: 5,
                itemGap: 8,
              },
            }}
            margin={{ right: 120 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
