import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { GridColDef } from "@mui/x-data-grid";

interface RandomUserName {
  title: string;
  first: string;
  last: string;
}

interface RandomUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface RandomUserLocation {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string | number;
}

interface RandomUserLogin {
  uuid: string;
  username: string;
}

interface RandomUser {
  gender: string;
  name: RandomUserName;
  location: RandomUserLocation;
  email: string;
  phone: string;
  cell: string;
  picture: RandomUserPicture;
  nat: string;
  login: RandomUserLogin;
  registered: {
    date: string;
    age: number;
  };
}

interface RandomUserResponse {
  results: RandomUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

interface CustomerTableRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  country: string;
  avatar: { src: string; alt: string };
  username: string;
  customerSince: string;
  status: "Active" | "Inactive";
}

const renderStatus = (status: "Active" | "Inactive") => {
  const colors: { [index: string]: "success" | "default" } = {
    Active: "success",
    Inactive: "default",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
};

const renderAvatar = (params: any) => {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      src={params.value.src}
      alt={params.value.alt}
      sx={{ width: 40, height: 40 }}
    />
  );
};

export default function CustomerTable() {
  const [rows, setRows] = useState<CustomerTableRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);

  // Edit modal states
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerTableRow | null>(null);
  const [formData, setFormData] = useState<Partial<CustomerTableRow>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenEditModal = (customer: CustomerTableRow) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      location: customer.location,
      country: customer.country,
      username: customer.username,
      status: customer.status,
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedCustomer(null);
    setFormData({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStatusChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    setFormData({
      ...formData,
      status: e.target.value as "Active" | "Inactive",
    });
  };

  const handleSaveChanges = () => {
    if (!selectedCustomer) return;

    setIsSubmitting(true);

    // Simulate API update with a timeout
    setTimeout(() => {
      // Update the rows state with the edited data
      const updatedRows = rows.map((row) => {
        if (row.id === selectedCustomer.id) {
          return {
            ...row,
            ...formData,
          };
        }
        return row;
      });

      setRows(updatedRows);
      setIsSubmitting(false);
      handleCloseEditModal();

      // You could add a notification/alert here to indicate success
    }, 800);
  };

  const renderEditButton = (params: any) => {
    return (
      <IconButton
        color="primary"
        onClick={() => handleOpenEditModal(params.row)}
        size="small"
        aria-label="edit customer"
      >
        <EditIcon fontSize="small" />
      </IconButton>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "",
      width: 60,
      renderCell: renderAvatar,
      sortable: false,
    },
    { field: "name", headerName: "Customer Name", flex: 1, minWidth: 180 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
    { field: "location", headerName: "Address", flex: 1, minWidth: 200 },
    { field: "country", headerName: "Country", flex: 1, minWidth: 120 },
    { field: "username", headerName: "Username", flex: 1, minWidth: 130 },
    {
      field: "customerSince",
      headerName: "Customer Since",
      flex: 1,
      minWidth: 150,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) =>
        renderStatus(params.value as "Active" | "Inactive"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: renderEditButton,
      sortable: false,
      filterable: false,
    },
  ];

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = 100; // Total records to fetch
      const response = await fetch(
        `https://randomuser.me/api/?results=${results}&seed=customerdata&inc=name,email,phone,location,picture,login,registered,nat&noinfo`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data: RandomUserResponse = await response.json();
      setTotalRows(data.results.length);

      const formattedData: CustomerTableRow[] = data.results.map((user) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        phone: user.phone,
        location: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}`,
        country: user.location.country,
        avatar: {
          src: user.picture.medium,
          alt: `${user.name.first} ${user.name.last}`,
        },
        username: user.login.username,
        customerSince: user.registered.date,
        status: Math.random() > 0.2 ? "Active" : "Inactive", // 80% active customers
      }));

      setRows(formattedData);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch customers",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleRefresh = () => {
    fetchCustomers();
  };

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ mt: 2 }}
        action={
          <Button color="inherit" size="small" onClick={handleRefresh}>
            Try Again
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Box sx={{ width: "100%", height: 650 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Customer Database
          </Typography>
          <Button
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={loading}
            variant="outlined"
          >
            Refresh Data
          </Button>
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pagination
          pageSizeOptions={[5, 10, 25, 50, 100]}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          checkboxSelection
          disableRowSelectionOnClick
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          density="standard"
          sx={{
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          slotProps={{
            loadingOverlay: {
              sx: { backgroundColor: "rgba(255,255,255,0.8)" },
            },
          }}
        />
      </Box>

      {/* Edit Customer Modal */}
      <Dialog
        open={openEditModal}
        onClose={handleCloseEditModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Customer
          {selectedCustomer && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Avatar
                src={selectedCustomer.avatar.src}
                alt={selectedCustomer.avatar.alt}
                sx={{ mr: 1.5, width: 40, height: 40 }}
              />
              <Typography variant="subtitle1" component="span">
                {selectedCustomer.name}
              </Typography>
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Update the customer information below.
          </DialogContentText>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.email || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="phone"
                name="phone"
                label="Phone Number"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.phone || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="username"
                name="username"
                label="Username"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.username || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="location"
                name="location"
                label="Address"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.location || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="country"
                name="country"
                label="Country"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.country || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formData.status || ""}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseEditModal} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
