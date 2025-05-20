import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { GridCellParams, GridRowsProp, GridColDef } from "@mui/x-data-grid";

function renderStatus(
  status:
    | "New"
    | "Contacted"
    | "Qualified"
    | "Proposal"
    | "Negotiation"
    | "Closed Won"
    | "Closed Lost",
) {
  const colors: {
    [index: string]:
      | "success"
      | "warning"
      | "info"
      | "error"
      | "secondary"
      | "primary"
      | "default";
  } = {
    New: "info",
    Contacted: "warning",
    Qualified: "primary",
    Proposal: "secondary",
    Negotiation: "warning",
    "Closed Won": "success",
    "Closed Lost": "error",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>,
) {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: "24px",
        height: "24px",
        fontSize: "0.85rem",
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Contact Name", flex: 1, minWidth: 180 },
  { field: "company", headerName: "Company", flex: 1, minWidth: 180 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 220 },
  { field: "phone", headerName: "Phone", flex: 0.7, minWidth: 130 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.7,
    minWidth: 130,
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: "value",
    headerName: "Deal Value",
    type: "number",
    headerAlign: "right",
    align: "right",
    flex: 0.7,
    minWidth: 100,
    valueFormatter: (params) => {
      if (params.value == null) {
        return "";
      }
      return `$${params.value.toLocaleString()}`;
    },
  },
  {
    field: "assignedTo",
    headerName: "Assigned To",
    flex: 0.7,
    minWidth: 130,
  },
  {
    field: "lastContact",
    headerName: "Last Contact",
    flex: 0.7,
    minWidth: 130,
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    name: "John Smith",
    company: "Acme Corporation",
    email: "john.smith@acme.com",
    phone: "(555) 123-4567",
    status: "Qualified",
    value: 75000,
    assignedTo: "Sarah Johnson",
    lastContact: "2023-05-10",
  },
  {
    id: 2,
    name: "Emily Davis",
    company: "TechSolutions Inc.",
    email: "emily.davis@techsolutions.com",
    phone: "(555) 234-5678",
    status: "Proposal",
    value: 120000,
    assignedTo: "Michael Williams",
    lastContact: "2023-05-12",
  },
  {
    id: 3,
    name: "Robert Johnson",
    company: "Global Enterprises",
    email: "robert.johnson@globalent.com",
    phone: "(555) 345-6789",
    status: "New",
    value: 45000,
    assignedTo: "Sarah Johnson",
    lastContact: "2023-05-15",
  },
  {
    id: 4,
    name: "Jennifer Brown",
    company: "Innovative Systems",
    email: "jennifer.brown@innovative.com",
    phone: "(555) 456-7890",
    status: "Contacted",
    value: 90000,
    assignedTo: "David Thompson",
    lastContact: "2023-05-18",
  },
  {
    id: 5,
    name: "Michael Wilson",
    company: "Dynamic Solutions",
    email: "michael.wilson@dynamic.com",
    phone: "(555) 567-8901",
    status: "Negotiation",
    value: 150000,
    assignedTo: "Michael Williams",
    lastContact: "2023-05-20",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    company: "Creative Designs",
    email: "lisa.anderson@creative.com",
    phone: "(555) 678-9012",
    status: "Closed Won",
    value: 85000,
    assignedTo: "Sarah Johnson",
    lastContact: "2023-05-22",
  },
  {
    id: 7,
    name: "David Thomas",
    company: "Future Technologies",
    email: "david.thomas@future.com",
    phone: "(555) 789-0123",
    status: "Proposal",
    value: 110000,
    assignedTo: "David Thompson",
    lastContact: "2023-05-25",
  },
  {
    id: 8,
    name: "Sarah Miller",
    company: "Strategic Solutions",
    email: "sarah.miller@strategic.com",
    phone: "(555) 890-1234",
    status: "Qualified",
    value: 65000,
    assignedTo: "Michael Williams",
    lastContact: "2023-05-28",
  },
  {
    id: 9,
    name: "James Wilson",
    company: "Premier Services",
    email: "james.wilson@premier.com",
    phone: "(555) 901-2345",
    status: "Closed Lost",
    value: 95000,
    assignedTo: "Sarah Johnson",
    lastContact: "2023-05-30",
  },
  {
    id: 10,
    name: "Patricia Moore",
    company: "Elite Enterprises",
    email: "patricia.moore@elite.com",
    phone: "(555) 012-3456",
    status: "New",
    value: 55000,
    assignedTo: "David Thompson",
    lastContact: "2023-06-02",
  },
  {
    id: 11,
    name: "Thomas Jackson",
    company: "Advanced Analytics",
    email: "thomas.jackson@advanced.com",
    phone: "(555) 123-4567",
    status: "Contacted",
    value: 70000,
    assignedTo: "Michael Williams",
    lastContact: "2023-06-05",
  },
  {
    id: 12,
    name: "Barbara White",
    company: "Digital Dynamics",
    email: "barbara.white@digital.com",
    phone: "(555) 234-5678",
    status: "Proposal",
    value: 130000,
    assignedTo: "Sarah Johnson",
    lastContact: "2023-06-08",
  },
  {
    id: 13,
    name: "Charles Harris",
    company: "Visionary Ventures",
    email: "charles.harris@visionary.com",
    phone: "(555) 345-6789",
    status: "Negotiation",
    value: 180000,
    assignedTo: "David Thompson",
    lastContact: "2023-06-10",
  },
  {
    id: 14,
    name: "Susan Martin",
    company: "Precision Products",
    email: "susan.martin@precision.com",
    phone: "(555) 456-7890",
    status: "Qualified",
    value: 85000,
    assignedTo: "Michael Williams",
    lastContact: "2023-06-12",
  },
  {
    id: 15,
    name: "Joseph Thompson",
    company: "Innovate Inc.",
    email: "joseph.thompson@innovate.com",
    phone: "(555) 567-8901",
    status: "New",
    value: 60000,
    assignedTo: "Sarah Johnson",
    lastContact: "2023-06-15",
  },
  {
    id: 16,
    name: "Margaret Garcia",
    company: "Enhanced Solutions",
    email: "margaret.garcia@enhanced.com",
    phone: "(555) 678-9012",
    status: "Contacted",
    value: 95000,
    assignedTo: "David Thompson",
    lastContact: "2023-06-18",
  },
  {
    id: 17,
    name: "Richard Martinez",
    company: "Superior Systems",
    email: "richard.martinez@superior.com",
    phone: "(555) 789-0123",
    status: "Closed Won",
    value: 110000,
    assignedTo: "Michael Williams",
    lastContact: "2023-06-20",
  },
  {
    id: 18,
    name: "Elizabeth Robinson",
    company: "Quantum Quality",
    email: "elizabeth.robinson@quantum.com",
    phone: "(555) 890-1234",
    status: "Proposal",
    value: 140000,
    assignedTo: "Sarah Johnson",
    lastContact: "2023-06-22",
  },
  {
    id: 19,
    name: "William Clark",
    company: "Excellent Enterprises",
    email: "william.clark@excellent.com",
    phone: "(555) 901-2345",
    status: "Negotiation",
    value: 165000,
    assignedTo: "David Thompson",
    lastContact: "2023-06-25",
  },
  {
    id: 20,
    name: "Helen Rodriguez",
    company: "Forward Focused",
    email: "helen.rodriguez@forward.com",
    phone: "(555) 012-3456",
    status: "Qualified",
    value: 80000,
    assignedTo: "Michael Williams",
    lastContact: "2023-06-28",
  },
  {
    id: 21,
    name: "Daniel Lewis",
    company: "Alliance Associates",
    email: "daniel.lewis@alliance.com",
    phone: "(555) 123-4567",
    status: "Closed Lost",
    value: 125000,
    assignedTo: "Sarah Johnson",
    lastContact: "2023-06-30",
  },
  {
    id: 22,
    name: "Betty Lee",
    company: "Synergy Solutions",
    email: "betty.lee@synergy.com",
    phone: "(555) 234-5678",
    status: "New",
    value: 70000,
    assignedTo: "David Thompson",
    lastContact: "2023-07-03",
  },
  {
    id: 23,
    name: "Donald Walker",
    company: "Pinnacle Performers",
    email: "donald.walker@pinnacle.com",
    phone: "(555) 345-6789",
    status: "Contacted",
    value: 95000,
    assignedTo: "Michael Williams",
    lastContact: "2023-07-05",
  },
  {
    id: 24,
    name: "Dorothy Hall",
    company: "Extraordinary Excellence",
    email: "dorothy.hall@extraordinary.com",
    phone: "(555) 456-7890",
    status: "Proposal",
    value: 115000,
    assignedTo: "Sarah Johnson",
    lastContact: "2023-07-08",
  },
  {
    id: 25,
    name: "Ronald Allen",
    company: "Master Management",
    email: "ronald.allen@master.com",
    phone: "(555) 567-8901",
    status: "Negotiation",
    value: 190000,
    assignedTo: "David Thompson",
    lastContact: "2023-07-10",
  },
  {
    id: 26,
    name: "Sandra Young",
    company: "Vanguard Ventures",
    email: "sandra.young@vanguard.com",
    phone: "(555) 678-9012",
    status: "Qualified",
    value: 85000,
    assignedTo: "Michael Williams",
    lastContact: "2023-07-12",
  },
  {
    id: 27,
    name: "George Hernandez",
    company: "United Unlimited",
    email: "george.hernandez@united.com",
    phone: "(555) 789-0123",
    status: "New",
    value: 65000,
    assignedTo: "Sarah Johnson",
    lastContact: "2023-07-15",
  },
  {
    id: 28,
    name: "Jessica King",
    company: "Tomorrow Technologies",
    email: "jessica.king@tomorrow.com",
    phone: "(555) 890-1234",
    status: "Closed Won",
    value: 130000,
    assignedTo: "David Thompson",
    lastContact: "2023-07-18",
  },
  {
    id: 29,
    name: "Kenneth Wright",
    company: "Horizon Holdings",
    email: "kenneth.wright@horizon.com",
    phone: "(555) 901-2345",
    status: "Contacted",
    value: 100000,
    assignedTo: "Michael Williams",
    lastContact: "2023-07-20",
  },
  {
    id: 30,
    name: "Ruth Scott",
    company: "Achieve Anything",
    email: "ruth.scott@achieve.com",
    phone: "(555) 012-3456",
    status: "Proposal",
    value: 150000,
    assignedTo: "Sarah Johnson",
    lastContact: "2023-07-22",
  },
];
