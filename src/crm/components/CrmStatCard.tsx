import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { areaElementClasses } from "@mui/x-charts/LineChart";

export type CrmStatCardProps = {
  title: string;
  value: string;
  interval: string;
  trend: "up" | "down";
  trendValue: string;
  data: number[];
};

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

export default function CrmStatCard({
  title,
  value,
  interval,
  trend,
  trendValue,
  data,
}: CrmStatCardProps) {
  const theme = useTheme();

  const trendColors = {
    up:
      theme.palette.mode === "light"
        ? theme.palette.success.main
        : theme.palette.success.dark,
    down:
      theme.palette.mode === "light"
        ? theme.palette.error.main
        : theme.palette.error.dark,
  };

  const labelColors = {
    up: "success" as const,
    down: "error" as const,
  };

  const trendIcons = {
    up: <ArrowUpwardRoundedIcon fontSize="small" />,
    down: <ArrowDownwardRoundedIcon fontSize="small" />,
  };

  const color = labelColors[trend];
  const chartColor = trendColors[trend];
  const trendIcon = trendIcons[trend];

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography
          component="h3"
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}
        >
          <Stack sx={{ justifyContent: "space-between" }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography variant="h4" component="p" fontWeight="600">
                {value}
              </Typography>
              <Chip
                size="small"
                color={color}
                label={trendValue}
                icon={trendIcon}
                sx={{
                  "& .MuiChip-icon": {
                    marginLeft: "5px",
                    marginRight: "-4px",
                  },
                }}
              />
            </Stack>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {interval}
            </Typography>
          </Stack>
          <Box sx={{ width: "100%", height: 50 }}>
            <SparkLineChart
              color={chartColor}
              data={data}
              area
              showHighlight
              showTooltip
              xAxis={{
                scaleType: "band",
                data: Array.from(
                  { length: data.length },
                  (_, i) => `Day ${i + 1}`,
                ),
              }}
              sx={{
                [`& .${areaElementClasses.root}`]: {
                  fill: `url(#area-gradient-${title.replace(/\s+/g, "-").toLowerCase()})`,
                },
              }}
            >
              <AreaGradient
                color={chartColor}
                id={`area-gradient-${title.replace(/\s+/g, "-").toLowerCase()}`}
              />
            </SparkLineChart>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
