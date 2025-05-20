import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CustomerType } from "../types/customer";
import { fetchCustomers } from "../services/api";

export default function CrmCustomersTable() {
  const [customers, setCustomers] = React.useState<CustomerType[]>([]);
  const [filteredCustomers, setFilteredCustomers] = React.useState<
    CustomerType[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const loadCustomers = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCustomers(50);
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (err) {
      setError("Failed to load customer data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  React.useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(lowercaseQuery) ||
          customer.email.toLowerCase().includes(lowercaseQuery) ||
          customer.location.toLowerCase().includes(lowercaseQuery),
      );
      setFilteredCustomers(filtered);
    }
    setPage(0);
  }, [searchQuery, customers]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const paginatedCustomers = filteredCustomers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // Render loading state
  if (loading && customers.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Render error state
  if (error && customers.length === 0) {
    return (
      <Alert
        severity="error"
        action={
          <IconButton
            color="inherit"
            size="small"
            onClick={() => loadCustomers()}
          >
            <RefreshIcon />
          </IconButton>
        }
      >
        {error}
      </Alert>
    );
  }

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent sx={{ pb: 0 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" component="h3">
            Customer List
          </Typography>
          <Box>
            <TextField
              size="small"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300 }}
            />
          </Box>
        </Stack>
      </CardContent>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ border: 0, boxShadow: "none" }}
      >
        <Table size="small" aria-label="customers table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomers.map((customer) => (
              <TableRow key={customer.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={customer.avatar}
                      alt={customer.name}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {customer.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Chip
                    label={customer.customerType}
                    size="small"
                    color={
                      customer.customerType === "Premium"
                        ? "primary"
                        : "default"
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={customer.status}
                    size="small"
                    color={customer.status === "Active" ? "success" : "default"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{formatDate(customer.registeredDate)}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" aria-label="more options">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Card>
  );
}
