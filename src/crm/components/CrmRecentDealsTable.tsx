import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Button from "@mui/material/Button";

// Sample data for recent deals
const recentDeals = [
  {
    id: 1,
    name: "Enterprise Software Package",
    customer: { name: "Acme Corp", avatar: "A" },
    value: 125000,
    stage: "Proposal",
    probability: 75,
    closingDate: "2023-09-30",
  },
  {
    id: 2,
    name: "Cloud Migration Service",
    customer: { name: "TechSolutions Inc", avatar: "T" },
    value: 87500,
    stage: "Negotiation",
    probability: 90,
    closingDate: "2023-10-15",
  },
  {
    id: 3,
    name: "Website Redesign Project",
    customer: { name: "Global Media", avatar: "G" },
    value: 45000,
    stage: "Discovery",
    probability: 60,
    closingDate: "2023-11-05",
  },
  {
    id: 4,
    name: "CRM Implementation",
    customer: { name: "RetailGiant", avatar: "R" },
    value: 95000,
    stage: "Closed Won",
    probability: 100,
    closingDate: "2023-09-15",
  },
  {
    id: 5,
    name: "IT Infrastructure Upgrade",
    customer: { name: "HealthCare Pro", avatar: "H" },
    value: 135000,
    stage: "Negotiation",
    probability: 85,
    closingDate: "2023-10-22",
  },
];

// Function to get color based on deal stage
const getStageColor = (
  stage: string,
): "default" | "primary" | "success" | "warning" | "info" => {
  switch (stage) {
    case "Discovery":
      return "info";
    case "Proposal":
      return "primary";
    case "Negotiation":
      return "warning";
    case "Closed Won":
      return "success";
    default:
      return "default";
  }
};

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export default function CrmRecentDealsTable() {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ pb: 0 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" component="h3">
            Recent Deals
          </Typography>
          <Button endIcon={<ArrowForwardRoundedIcon />} size="small">
            View All
          </Button>
        </Stack>
      </CardContent>
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table size="small" aria-label="recent deals table">
          <TableHead>
            <TableRow>
              <TableCell>Deal Name</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell align="right">Probability</TableCell>
              <TableCell>Closing Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentDeals.map((deal) => (
              <TableRow key={deal.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{deal.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      sx={{ width: 28, height: 28, fontSize: "0.875rem" }}
                    >
                      {deal.customer.avatar}
                    </Avatar>
                    <Typography variant="body2">
                      {deal.customer.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(deal.value)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={deal.stage}
                    size="small"
                    color={getStageColor(deal.stage)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">{deal.probability}%</TableCell>
                <TableCell>{formatDate(deal.closingDate)}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" aria-label="more options">
                    <MoreVertRoundedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
