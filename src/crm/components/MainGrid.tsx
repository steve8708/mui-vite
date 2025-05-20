import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartLeadsBySource from "./ChartLeadsBySource";
import CustomizedTreeView from "./CustomizedTreeView";
import CustomizedDataGrid from "./CustomizedDataGrid";
import HighlightedCard from "./HighlightedCard";
import SalesRevenueChart from "./SalesRevenueChart";
import ConversionRateChart from "./ConversionRateChart";
import StatCard, { StatCardProps } from "./StatCard";

const data: StatCardProps[] = [
  {
    title: "Total Leads",
    value: "624",
    interval: "Last 30 days",
    trend: "up",
    data: [
      200, 224, 220, 260, 240, 280, 300, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 440, 440, 460, 440, 480, 460, 500, 480, 520,
    ],
  },
  {
    title: "Conversions",
    value: "145",
    interval: "Last 30 days",
    trend: "up",
    data: [
      140, 150, 170, 130, 150, 100, 120, 180, 90, 150, 120, 120, 140, 100, 120,
      180, 100, 160, 180, 140, 160, 120, 140, 100, 120, 180, 100, 160, 200, 220,
    ],
  },
  {
    title: "Revenue",
    value: "$251,240",
    interval: "Last 30 days",
    trend: "up",
    data: [
      50000, 46000, 51000, 53000, 52000, 60000, 53000, 52000, 51000, 73000,
      52000, 51000, 53000, 62000, 51000, 53000, 52000, 41000, 53000, 52000,
      61000, 53000, 52000, 61000, 53000, 42000, 51000, 43000, 52000, 51000,
    ],
  },
];

export default function MainGrid() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Sales Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ConversionRateChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SalesRevenueChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Leads & Opportunities
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <CustomizedTreeView />
            <ChartLeadsBySource />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
