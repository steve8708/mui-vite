import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import LinearProgress from "@mui/material/LinearProgress";
import MenuButton from "./MenuButton";

export default function HighlightedCard() {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundImage:
          "linear-gradient(to bottom right, hsl(210, 98%, 40%), hsl(210, 70%, 55%))",
        color: "white",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "start" }}
        >
          <Stack sx={{ gap: 3 }}>
            <div>
              <Typography
                component="h2"
                variant="subtitle2"
                sx={{ color: "hsla(210, 100%, 95%, 0.7)" }}
              >
                Monthly Goal
              </Typography>
              <Typography
                component="div"
                variant="h4"
                sx={{ mt: 1, mb: 1, lineHeight: 1.2 }}
              >
                $300,000
              </Typography>
            </div>
            <div>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "hsla(210, 100%, 95%, 0.7)" }}
                >
                  Progress
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  83.8%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={83.8}
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: "hsla(210, 100%, 95%, 0.2)",
                  [`& .MuiLinearProgress-bar`]: {
                    bgcolor: "white",
                  },
                }}
              />
            </div>
            <div>
              <Typography
                variant="body2"
                sx={{ color: "hsla(210, 100%, 95%, 0.7)" }}
              >
                ${(251240).toLocaleString()} achieved
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "hsla(210, 100%, 95%, 0.7)" }}
              >
                ${(300000 - 251240).toLocaleString()} remaining
              </Typography>
            </div>
          </Stack>
          <MenuButton>
            <MoreHorizRoundedIcon />
          </MenuButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
