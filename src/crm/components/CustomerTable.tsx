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
import RefreshIcon from "@mui/icons-material/Refresh";
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
          loadingOverlay: { sx: { backgroundColor: "rgba(255,255,255,0.8)" } },
        }}
      />
    </Box>
  );
}
