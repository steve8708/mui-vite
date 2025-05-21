import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { Customer, RandomUserResponse } from "../types/customer";

// Number of customers to fetch
const CUSTOMERS_PER_PAGE = 25;

// Column definitions for the DataGrid
const columns: GridColDef[] = [
  {
    field: "avatar",
    headerName: "",
    width: 60,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<Customer>) => {
      if (!params.row || !params.row.picture || !params.row.name) {
        return <Avatar>?</Avatar>;
      }
      return (
        <Avatar
          src={params.row.picture.thumbnail}
          alt={`${params.row.name.first} ${params.row.name.last}`}
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 180,
    valueGetter: (params) => {
      if (!params.row || !params.row.name) return "";
      return `${params.row.name.first} ${params.row.name.last}`;
    },
    renderCell: (params: GridRenderCellParams<Customer>) => {
      if (!params.row || !params.row.name || !params.row.login) {
        return <Typography variant="body2">Loading...</Typography>;
      }
      return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {`${params.row.name.first} ${params.row.name.last}`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.login.username}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.5,
    minWidth: 220,
    renderCell: (params: GridRenderCellParams<Customer>) => {
      if (!params.row || !params.row.email) {
        return <Typography variant="body2">-</Typography>;
      }
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <MailOutlineRoundedIcon fontSize="small" color="action" />
          <Typography variant="body2">{params.row.email}</Typography>
        </Stack>
      );
    },
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 160,
    renderCell: (params: GridRenderCellParams<Customer>) => {
      if (!params.row || !params.row.phone) {
        return <Typography variant="body2">-</Typography>;
      }
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <PhoneRoundedIcon fontSize="small" color="action" />
          <Typography variant="body2">{params.row.phone}</Typography>
        </Stack>
      );
    },
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    minWidth: 180,
    valueGetter: (params) => {
      if (!params.row || !params.row.location) return "";
      return `${params.row.location.city}, ${params.row.location.country}`;
    },
    renderCell: (params: GridRenderCellParams<Customer>) => {
      if (!params.row || !params.row.location) {
        return <Typography variant="body2">-</Typography>;
      }
      return (
        <Typography variant="body2">
          {params.row.location.city}, {params.row.location.country}
        </Typography>
      );
    },
  },
  {
    field: "registered",
    headerName: "Customer Since",
    width: 150,
    valueGetter: (params) => {
      if (!params.row || !params.row.registered || !params.row.registered.date)
        return null;
      return new Date(params.row.registered.date);
    },
    renderCell: (params: GridRenderCellParams<Customer>) => {
      if (
        !params.row ||
        !params.row.registered ||
        !params.row.registered.date
      ) {
        return <Typography variant="body2">-</Typography>;
      }

      const date = new Date(params.row.registered.date);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
      return <Typography variant="body2">{formattedDate}</Typography>;
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: () => {
      // Randomly assign a status
      const statuses = ["Active", "Inactive", "New"];
      const colors: Record<string, "success" | "default" | "primary"> = {
        Active: "success",
        Inactive: "default",
        New: "primary",
      };
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      return (
        <Chip
          label={randomStatus}
          size="small"
          color={colors[randomStatus]}
          variant="outlined"
        />
      );
    },
  },
  {
    field: "actions",
    headerName: "",
    width: 60,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <IconButton size="small" aria-label="more options">
        <MoreVertRoundedIcon fontSize="small" />
      </IconButton>
    ),
  },
];

export default function CrmCustomersTable() {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  // Fetch customer data from randomuser.me API
  const fetchCustomers = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${CUSTOMERS_PER_PAGE}&inc=login,name,email,location,phone,cell,picture,registered&noinfo`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch customers: ${response.status}`);
      }

      const data: RandomUserResponse = await response.json();
      setCustomers(data.results);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  React.useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Filter customers based on search term
  const filteredCustomers = React.useMemo(() => {
    if (!searchTerm.trim()) return customers;

    const lowerCaseSearch = searchTerm.toLowerCase();
    return customers.filter(
      (customer) =>
        `${customer.name.first} ${customer.name.last}`
          .toLowerCase()
          .includes(lowerCaseSearch) ||
        customer.email.toLowerCase().includes(lowerCaseSearch) ||
        customer.phone.includes(searchTerm) ||
        customer.location.city.toLowerCase().includes(lowerCaseSearch) ||
        customer.location.country.toLowerCase().includes(lowerCaseSearch),
    );
  }, [customers, searchTerm]);

  // Each row needs a unique ID for the DataGrid
  const rowsWithIds = React.useMemo(
    () =>
      filteredCustomers.map((customer) => ({
        ...customer,
        id: customer.login.uuid,
      })),
    [filteredCustomers],
  );

  // Render loading state
  if (loading && customers.length === 0) {
    return (
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (error && customers.length === 0) {
    return (
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={fetchCustomers}>
                Retry
              </Button>
            }
          >
            Error loading customers: {error}
          </Alert>
        </CardContent>
      </Card>
    );
  }

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
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" component="h3">
            Customer Directory
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              placeholder="Search customers..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { xs: "100%", sm: 220 } }}
            />
            <Button
              variant="outlined"
              startIcon={<RefreshRoundedIcon />}
              onClick={fetchCustomers}
              disabled={loading}
            >
              Refresh
            </Button>
            <Button variant="contained" startIcon={<AddRoundedIcon />}>
              Add
            </Button>
          </Stack>
        </Stack>
      </CardContent>

      {/* Show message when filtering returns no results */}
      {filteredCustomers.length === 0 && !loading && (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography color="text.secondary">
            No customers found matching your search criteria.
          </Typography>
        </Box>
      )}

      {/* Show DataGrid when we have customers */}
      {filteredCustomers.length > 0 && (
        <Box sx={{ flexGrow: 1, position: "relative" }}>
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <DataGrid
            rows={rowsWithIds}
            columns={columns}
            checkboxSelection
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableColumnResize
            density="standard"
            autoHeight
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          />
        </Box>
      )}
    </Card>
  );
}
