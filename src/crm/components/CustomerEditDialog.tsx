import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { User } from "./CustomerTable";

interface CustomerEditDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export default function CustomerEditDialog({
  open,
  user,
  onClose,
  onSave,
}: CustomerEditDialogProps) {
  const [formData, setFormData] = React.useState<Partial<User> | null>(null);

  React.useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof User] || {}),
            [child]: value,
          },
        };
      });
    } else {
      setFormData((prev) => {
        if (!prev) return prev;
        return { ...prev, [name]: value };
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && user) {
      onSave({ ...user, ...formData });
    }
    onClose();
  };

  // Return null if user or formData is not available
  if (!user || !formData) return null;

  const fullName = `${formData.name?.first || ""} ${formData.name?.last || ""}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 1 }}>
            <Avatar
              src={user.picture?.thumbnail}
              alt={fullName}
              sx={{ width: 64, height: 64, mr: 2 }}
            />
            <Typography variant="h6">{fullName}</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="name.first"
                value={formData.name?.first || ""}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="name.last"
                value={formData.name?.last || ""}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="location.city"
                value={formData.location?.city || ""}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="location.state"
                value={formData.location?.state || ""}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="location.country"
                value={formData.location?.country || ""}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
