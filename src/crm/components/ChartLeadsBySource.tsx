import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";

export default function ChartLeadsBySource() {
  const theme = useTheme();

  const data = [
    {
      id: 0,
      value: 35,
      label: "Website",
      color:
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.primary.dark,
    },
    {
      id: 1,
      value: 25,
      label: "Referral",
      color:
        theme.palette.mode === "light"
          ? theme.palette.success.main
          : theme.palette.success.dark,
    },
    {
      id: 2,
      value: 20,
      label: "Social",
      color:
        theme.palette.mode === "light"
          ? theme.palette.info.main
          : theme.palette.info.dark,
    },
    {
      id: 3,
      value: 15,
      label: "Email",
      color:
        theme.palette.mode === "light"
          ? theme.palette.warning.main
          : theme.palette.warning.dark,
    },
    {
      id: 4,
      value: 5,
      label: "Other",
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[400]
          : theme.palette.grey[700],
    },
  ];

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      variant="outlined"
    >
      <CardHeader
        title={
          <Typography component="h2" variant="subtitle1">
            Leads by Source
          </Typography>
        }
        subheader={
          <Typography
            component="span"
            variant="caption"
            sx={{ color: "text.secondary" }}
          >
            Current month
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
          position: "relative",
        }}
      >
        <PieChart
          series={[
            {
              data,
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 1,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 270,
              cx: 150,
              cy: 140,
            },
          ]}
          width={300}
          height={280}
        />
      </CardContent>
    </Card>
  );
}
