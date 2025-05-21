import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Customer, CustomerFormData } from "../types/Customer";
import CustomerEditModal from "../components/CustomerEditModal";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  // Fetch customers from randomuser.me API
  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://randomuser.me/api/?results=25&seed=crm123",
      );
      const data = await response.json();

      // Transform the data to match our Customer type
      const formattedCustomers: Customer[] = data.results.map(
        (user: any, index: number) => ({
          id: user.login.uuid,
          gender: user.gender,
          name: user.name,
          email: user.email,
          phone: user.phone,
          cell: user.cell,
          location: {
            address: {
              street: user.location.street,
              city: user.location.city,
              state: user.location.state,
              country: user.location.country,
              postcode: user.location.postcode,
            },
          },
          dob: user.dob,
          registered: user.registered,
          picture: user.picture,
          nat: user.nat,
        }),
      );

      setCustomers(formattedCustomers);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleSaveCustomer = (formData: CustomerFormData) => {
    if (!selectedCustomer) return;

    // Update the customer in the customers array
    const updatedCustomers = customers.map((customer) => {
      if (customer.id === selectedCustomer.id) {
        return {
          ...customer,
          name: {
            title: formData.title,
            first: formData.firstName,
            last: formData.lastName,
          },
          email: formData.email,
          phone: formData.phone,
          cell: formData.cell,
          location: {
            ...customer.location,
            address: {
              street: {
                number: parseInt(formData.street.split(" ")[0]) || 0,
                name: formData.street.split(" ").slice(1).join(" "),
              },
              city: formData.city,
              state: formData.state,
              country: formData.country,
              postcode: formData.postcode,
            },
          },
        };
      }
      return customer;
    });

    setCustomers(updatedCustomers);
    setEditModalOpen(false);
    setSelectedCustomer(null);
  };

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    {
      field: "picture",
      headerName: "",
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<Customer>) => (
        <Avatar
          src={params.row.picture.thumbnail}
          alt={`${params.row.name.first} ${params.row.name.last}`}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 180,
      valueGetter: (params) =>
        `${params.row.name.title} ${params.row.name.first} ${params.row.name.last}`,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 220,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1.5,
      minWidth: 220,
      valueGetter: (params) =>
        `${params.row.location.address.city}, ${params.row.location.address.country}`,
    },
    {
      field: "registered",
      headerName: "Customer Since",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => {
        const date = new Date(params.row.registered.date);
        return date.toLocaleDateString();
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => {
        // Randomly assign a status based on the customer ID
        const statusOptions = ["Active", "Inactive", "Pending"];
        const statusColors = {
          Active: "success",
          Inactive: "default",
          Pending: "warning",
        };

        const idSum = params.row.id
          .split("")
          .reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const status = statusOptions[idSum % 3];

        return (
          <Chip
            label={status}
            color={statusColors[status as keyof typeof statusColors]}
            size="small"
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditCustomer(params.row)}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          Customers
        </Typography>
        <Button variant="contained" color="primary">
          Add New Customer
        </Button>
      </Box>

      <Box sx={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={customers}
          columns={columns}
          disableColumnResize={false}
          loading={loading}
          slots={{
            loadingOverlay: LinearProgress,
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          density="standard"
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </Box>

      {selectedCustomer && (
        <CustomerEditModal
          open={editModalOpen}
          customer={selectedCustomer}
          onClose={handleCloseEditModal}
          onSave={handleSaveCustomer}
        />
      )}
    </Box>
  );
}
