import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Customer, CustomerFormData } from "../types/Customer";

interface CustomerEditModalProps {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSave: (formData: CustomerFormData) => void;
}

export default function CustomerEditModal({
  open,
  customer,
  onClose,
  onSave,
}: CustomerEditModalProps) {
  const [formData, setFormData] = React.useState<CustomerFormData>({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cell: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
  });

  // Initialize form with customer data when opened
  React.useEffect(() => {
    if (customer) {
      setFormData({
        title: customer.name.title,
        firstName: customer.name.first,
        lastName: customer.name.last,
        email: customer.email,
        phone: customer.phone,
        cell: customer.cell,
        street: `${customer.location.address.street.number} ${customer.location.address.street.name}`,
        city: customer.location.address.city,
        state: customer.location.address.state,
        country: customer.location.address.country,
        postcode: String(customer.location.address.postcode),
      });
    }
  }, [customer]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const name = e.target.name as string;
    const value = e.target.value as string;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle>Edit Customer</DialogTitle>
      <DialogContent sx={{ pb: 2 }}>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="title-label">Title</InputLabel>
              <Select
                labelId="title-label"
                name="title"
                value={formData.title}
                onChange={handleSelectChange}
                label="Title"
                required
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Miss">Miss</MenuItem>
                <MenuItem value="Ms">Ms</MenuItem>
                <MenuItem value="Dr">Dr</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              type="email"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="cell"
              label="Cell"
              value={formData.cell}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="street"
              label="Street Address"
              value={formData.street}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="city"
              label="City"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="state"
              label="State/Province"
              value={formData.state}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="country"
              label="Country"
              value={formData.country}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="postcode"
              label="Postal Code"
              value={formData.postcode}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
