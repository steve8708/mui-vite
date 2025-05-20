import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

export default function CrmSelectCompany() {
  const [company, setCompany] = React.useState("acme");

  const handleChange = (event: SelectChangeEvent) => {
    setCompany(event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth size="small">
        <Select
          labelId="company-select-label"
          id="company-select"
          value={company}
          onChange={handleChange}
          sx={{
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              gap: 1,
            },
          }}
        >
          <MenuItem value="acme">
            <BusinessRoundedIcon
              fontSize="small"
              sx={{ color: "primary.main" }}
            />
            Acme Corporation
          </MenuItem>
          <MenuItem value="globex">
            <BusinessRoundedIcon
              fontSize="small"
              sx={{ color: "secondary.main" }}
            />
            Globex Inc.
          </MenuItem>
          <MenuItem value="initech">
            <BusinessRoundedIcon
              fontSize="small"
              sx={{ color: "success.main" }}
            />
            Initech Technologies
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
