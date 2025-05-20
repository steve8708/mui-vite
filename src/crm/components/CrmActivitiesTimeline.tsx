import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
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

        <Timeline position="right" sx={{ m: 0, p: 0 }}>
          {activities.map((activity) => (
            <TimelineItem key={activity.id} sx={{ minHeight: "auto" }}>
              <TimelineOppositeContent
                sx={{ m: 0, p: 1, width: "80px", flex: "none" }}
                color="text.secondary"
              >
                <Typography variant="caption">{activity.time}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={
                    activity.color as "primary" | "success" | "warning" | "info"
                  }
                  sx={{ m: 0, p: 0.75 }}
                >
                  {activity.icon}
                </TimelineDot>
                {activity.id < activities.length && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ py: "6px", px: 2 }}>
                <Typography variant="subtitle2" component="span">
                  {activity.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {activity.description}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
