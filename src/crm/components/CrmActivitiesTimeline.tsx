import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

// Sample activities data
const activities = [
  {
    id: 1,
    type: "email",
    title: "Email sent to Acme Corp",
    description: "Proposal follow-up email sent",
    time: "11:30 AM",
    icon: <EmailRoundedIcon fontSize="small" />,
    color: "primary",
  },
  {
    id: 2,
    type: "call",
    title: "Call with TechSolutions Inc",
    description: "Discussed implementation timeline",
    time: "10:15 AM",
    icon: <PhoneRoundedIcon fontSize="small" />,
    color: "success",
  },
  {
    id: 3,
    type: "meeting",
    title: "Meeting scheduled",
    description: "Demo for Global Media next Monday",
    time: "Yesterday",
    icon: <MeetingRoomRoundedIcon fontSize="small" />,
    color: "warning",
  },
  {
    id: 4,
    type: "note",
    title: "Note added",
    description: "Added details about RetailGiant requirements",
    time: "Yesterday",
    icon: <EditNoteRoundedIcon fontSize="small" />,
    color: "info",
  },
];

export default function CrmActivitiesTimeline() {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 }, flexGrow: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ p: 2, pb: 1 }}
        >
          <Typography variant="h6" component="h3">
            Recent Activities
          </Typography>
          <Button endIcon={<ArrowForwardRoundedIcon />} size="small">
            View All
          </Button>
        </Stack>

        <Box sx={{ p: 2 }}>
          {activities.map((activity) => (
            <Box
              key={activity.id}
              sx={{
                display: "flex",
                mb: 2,
                gap: 2,
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  bgcolor: `${activity.color}.main`,
                  borderRadius: "50%",
                  p: 0.75,
                  display: "flex",
                  color: "white",
                }}
              >
                {activity.icon}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle2" component="span">
                    {activity.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {activity.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
