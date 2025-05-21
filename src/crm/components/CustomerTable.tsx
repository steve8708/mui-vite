import * as React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
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

// Mock data to use instead of the API call
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: {
      first: "John",
      last: "Doe",
    },
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: {
      city: "New York",
      state: "NY",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
    },
    login: {
      uuid: "1",
    },
    registered: {
      date: "2018-05-12T12:15:31.921Z",
    },
  },
  {
    id: "2",
    name: {
      first: "Jane",
      last: "Smith",
    },
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    location: {
      city: "Los Angeles",
      state: "CA",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/2.jpg",
    },
    login: {
      uuid: "2",
    },
    registered: {
      date: "2019-08-24T09:42:53.822Z",
    },
  },
  {
    id: "3",
    name: {
      first: "Robert",
      last: "Johnson",
    },
    email: "robert.johnson@example.com",
    phone: "(555) 234-5678",
    location: {
      city: "Chicago",
      state: "IL",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
    },
    login: {
      uuid: "3",
    },
    registered: {
      date: "2017-03-15T15:23:12.321Z",
    },
  },
  {
    id: "4",
    name: {
      first: "Sarah",
      last: "Williams",
    },
    email: "sarah.williams@example.com",
    phone: "(555) 345-6789",
    location: {
      city: "Houston",
      state: "TX",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/4.jpg",
    },
    login: {
      uuid: "4",
    },
    registered: {
      date: "2020-01-05T08:12:45.567Z",
    },
  },
  {
    id: "5",
    name: {
      first: "Michael",
      last: "Brown",
    },
    email: "michael.brown@example.com",
    phone: "(555) 456-7890",
    location: {
      city: "Phoenix",
      state: "AZ",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/5.jpg",
    },
    login: {
      uuid: "5",
    },
    registered: {
      date: "2019-11-20T14:35:28.912Z",
    },
  },
  {
    id: "6",
    name: {
      first: "Emily",
      last: "Davis",
    },
    email: "emily.davis@example.com",
    phone: "(555) 567-8901",
    location: {
      city: "Philadelphia",
      state: "PA",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/6.jpg",
    },
    login: {
      uuid: "6",
    },
    registered: {
      date: "2021-04-12T10:52:33.444Z",
    },
  },
  {
    id: "7",
    name: {
      first: "David",
      last: "Miller",
    },
    email: "david.miller@example.com",
    phone: "(555) 678-9012",
    location: {
      city: "San Antonio",
      state: "TX",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/7.jpg",
    },
    login: {
      uuid: "7",
    },
    registered: {
      date: "2018-09-30T19:18:57.789Z",
    },
  },
  {
    id: "8",
    name: {
      first: "Jessica",
      last: "Wilson",
    },
    email: "jessica.wilson@example.com",
    phone: "(555) 789-0123",
    location: {
      city: "San Diego",
      state: "CA",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/8.jpg",
    },
    login: {
      uuid: "8",
    },
    registered: {
      date: "2020-07-17T11:23:45.678Z",
    },
  },
  {
    id: "9",
    name: {
      first: "Matthew",
      last: "Taylor",
    },
    email: "matthew.taylor@example.com",
    phone: "(555) 890-1234",
    location: {
      city: "Dallas",
      state: "TX",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/9.jpg",
    },
    login: {
      uuid: "9",
    },
    registered: {
      date: "2017-12-08T20:42:31.234Z",
    },
  },
  {
    id: "10",
    name: {
      first: "Jennifer",
      last: "Anderson",
    },
    email: "jennifer.anderson@example.com",
    phone: "(555) 901-2345",
    location: {
      city: "San Jose",
      state: "CA",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/10.jpg",
    },
    login: {
      uuid: "10",
    },
    registered: {
      date: "2021-02-25T13:47:59.876Z",
    },
  },
  {
    id: "11",
    name: {
      first: "Christopher",
      last: "Thomas",
    },
    email: "christopher.thomas@example.com",
    phone: "(555) 012-3456",
    location: {
      city: "Austin",
      state: "TX",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/11.jpg",
    },
    login: {
      uuid: "11",
    },
    registered: {
      date: "2019-05-14T16:33:22.567Z",
    },
  },
  {
    id: "12",
    name: {
      first: "Elizabeth",
      last: "Jackson",
    },
    email: "elizabeth.jackson@example.com",
    phone: "(555) 123-4567",
    location: {
      city: "Indianapolis",
      state: "IN",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/12.jpg",
    },
    login: {
      uuid: "12",
    },
    registered: {
      date: "2018-11-09T08:15:47.123Z",
    },
  },
  {
    id: "13",
    name: {
      first: "Daniel",
      last: "White",
    },
    email: "daniel.white@example.com",
    phone: "(555) 234-5678",
    location: {
      city: "Jacksonville",
      state: "FL",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/13.jpg",
    },
    login: {
      uuid: "13",
    },
    registered: {
      date: "2020-03-30T21:12:34.987Z",
    },
  },
  {
    id: "14",
    name: {
      first: "Ashley",
      last: "Harris",
    },
    email: "ashley.harris@example.com",
    phone: "(555) 345-6789",
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/14.jpg",
    },
    login: {
      uuid: "14",
    },
    registered: {
      date: "2019-10-05T17:28:39.654Z",
    },
  },
  {
    id: "15",
    name: {
      first: "Andrew",
      last: "Martin",
    },
    email: "andrew.martin@example.com",
    phone: "(555) 456-7890",
    location: {
      city: "Columbus",
      state: "OH",
      country: "USA",
    },
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/15.jpg",
    },
    login: {
      uuid: "15",
    },
    registered: {
      date: "2018-07-22T14:55:21.321Z",
    },
  },
];

export default function CustomerTable({ onEditClick }: CustomerTableProps) {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(10);

  React.useEffect(() => {
    // Simulate loading data with a slight delay
    setLoading(true);

    // Using mock data instead of API call to avoid CORS issues
    const loadMockData = () => {
      setTimeout(() => {
        setUsers(MOCK_USERS);
        setLoading(false);
      }, 800); // Adding a small delay to simulate loading
    };

    loadMockData();

    // Previous API call approach that failed
    // const fetchUsers = async () => {
    //   try {
    //     const response = await fetch(
    //       "https://randomuser.me/api/?results=50&seed=crm123"
    //     );
    //     const data = await response.json();
    //
    //     // Map the users to include an id field
    //     const formattedUsers = data.results.map((user: any) => ({
    //       ...user,
    //       id: user.login.uuid,
    //     }));
    //
    //     setUsers(formattedUsers);
    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
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
