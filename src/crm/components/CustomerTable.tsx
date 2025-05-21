import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  picture: {
    thumbnail: string;
  };
  login: {
    uuid: string;
  };
  registered: {
    date: string;
  };
}

interface CustomerTableProps {
  onEditClick: (user: User) => void;
}

export default function CustomerTable({ onEditClick }: CustomerTableProps) {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(10);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://randomuser.me/api/?results=50&seed=crm123",
        );
        const data = await response.json();

        // Map the users to include an id field
        const formattedUsers = data.results.map((user: any) => ({
          ...user,
          id: user.login.uuid,
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "picture",
      headerName: "",
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
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
        `${params.row.name.first} ${params.row.name.last}`,
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
      flex: 1,
      minWidth: 180,
      valueGetter: (params) =>
        `${params.row.location.city}, ${params.row.location.country}`,
    },
    {
      field: "registered",
      headerName: "Customer Since",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        new Date(params.row.registered.date).toLocaleDateString(),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => onEditClick(params.row)}
        />,
      ],
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DataGrid
      rows={users}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize } },
      }}
      pageSizeOptions={[5, 10, 20, 50]}
      onPaginationModelChange={(model) => setPageSize(model.pageSize)}
      disableColumnResize
      density="standard"
      loading={loading}
      sx={{
        height: 650,
        width: "100%",
        "& .even": {
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.grey[50],
        },
      }}
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
}
