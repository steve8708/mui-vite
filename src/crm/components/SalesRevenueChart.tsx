import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function SalesRevenueChart() {
  const theme = useTheme();

  const chartSetting = {
    yAxis: [
      {
        label: "Sales ($)",
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

  const dataset = [
    {
      month: "Jan",
      deals: 65300,
      services: 32400,
      upsells: 24350,
    },
    {
      month: "Feb",
      deals: 59600,
      services: 35800,
      upsells: 23400,
    },
    {
      month: "Mar",
      deals: 68500,
      services: 37700,
      upsells: 28600,
    },
    {
      month: "Apr",
      deals: 72400,
      services: 39200,
      upsells: 31500,
    },
    {
      month: "May",
      deals: 68800,
      services: 36900,
      upsells: 29700,
    },
    {
      month: "Jun",
      deals: 78900,
      services: 41300,
      upsells: 34800,
    },
  ];

  const valueFormatter = (value: number) => `$${value.toLocaleString()}`;

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardHeader
        title={
          <Typography component="h2" variant="subtitle1">
            Revenue by Product Type
          </Typography>
        }
        subheader={
          <Typography
            component="span"
            variant="caption"
            sx={{ color: "text.secondary" }}
          >
            Last 6 months
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
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            {
              dataKey: "deals",
              label: "New Deals",
              valueFormatter,
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.main
                  : theme.palette.primary.dark,
            },
            {
              dataKey: "services",
              label: "Services",
              valueFormatter,
              color:
                theme.palette.mode === "light"
                  ? theme.palette.info.main
                  : theme.palette.info.dark,
            },
            {
              dataKey: "upsells",
              label: "Upsells",
              valueFormatter,
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
