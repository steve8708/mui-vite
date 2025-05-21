import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CustomerTable, { User } from "../components/CustomerTable";
import CustomerEditDialog from "../components/CustomerEditDialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Customers() {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [userList, setUserList] = React.useState<User[]>([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = (updatedUser: User) => {
    // In a real application, this would send the update to a server API
    // For this demo, we'll just show a success message
    setSnackbarOpen(true);

    // If we had a state with all users, we would update it like:
    // setUserList(userList.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Customers
      </Typography>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 4,
          borderRadius: 2,
          backgroundImage: "none",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Customer Management
        </Typography>
        <Typography paragraph sx={{ mb: 3 }}>
          View and manage your customer data. Edit customer details by clicking
          the edit button on a row.
        </Typography>

        <CustomerTable onEditClick={handleEditClick} />
      </Paper>

      <CustomerEditDialog
        open={dialogOpen}
        user={selectedUser}
        onClose={handleDialogClose}
        onSave={handleUserUpdate}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Customer data updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
