import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function ConversionRateChart() {
  const theme = useTheme();

  const chartSetting = {
    yAxis: [
      {
        label: "Conversion Rate (%)",
      },
    ],
    width: 600,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Conversion rates (%) for different stages
  const leadToQualified = [
    16.2, 17.5, 18.1, 19.3, 20.5, 22.4, 23.1, 23.8, 24.2, 24.8, 25.3, 26.1,
  ];
  const qualifiedToProposal = [
    36.5, 37.2, 38.5, 39.1, 40.3, 41.5, 42.2, 42.8, 43.3, 43.9, 44.6, 45.1,
  ];
  const proposalToClosed = [
    21.3, 22.5, 23.4, 24.1, 24.8, 25.3, 25.9, 26.3, 26.8, 27.3, 27.8, 28.4,
  ];

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardHeader
        title={
          <Typography component="h2" variant="subtitle1">
            Conversion Rates by Stage
          </Typography>
        }
        subheader={
          <Typography
            component="span"
            variant="caption"
            sx={{ color: "text.secondary" }}
          >
            Last 12 months
          </Typography>
        }
        sx={{ pb: 0 }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          px: 1,
          pt: 0,
        }}
      >
        <LineChart
          xAxis={[{ data: months, scaleType: "point" }]}
          series={[
            {
              data: leadToQualified,
              label: "Lead to Qualified",
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.main
                  : theme.palette.primary.dark,
            },
            {
              data: qualifiedToProposal,
              label: "Qualified to Proposal",
              color:
                theme.palette.mode === "light"
                  ? theme.palette.info.main
                  : theme.palette.info.dark,
            },
            {
              data: proposalToClosed,
              label: "Proposal to Closed",
              color:
                theme.palette.mode === "light"
                  ? theme.palette.success.main
                  : theme.palette.success.dark,
            },
          ]}
          {...chartSetting}
        />
      </CardContent>
    </Card>
  );
}
