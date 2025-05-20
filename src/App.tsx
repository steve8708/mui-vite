import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Slider from "@mui/material/Slider";
import PopoverMenu from "./PopOverMenu";
import ProTip from "./ProTip";
import { BrowserRouter, Routes, Route, Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="sm">
        <div className="my-4">
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Material UI Vite example with Tailwind CSS in TypeScript
          </Typography>
          <nav style={{ marginBottom: 16 }}>
            <Link component={RouterLink} to="/" sx={{ mr: 2 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/second">
              Second Page
            </Link>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Slider
                    className="my-4"
                    defaultValue={30}
                    classes={{ active: "shadow-none" }}
                    slotProps={{ thumb: { className: "hover:shadow-none" } }}
                  />
                  <PopoverMenu />
                  <ProTip />
                </>
              }
            />
            <Route path="/second" element={<Typography variant="h6">This is the second page!</Typography>} />
          </Routes>
          <Copyright />
        </div>
      </Container>
    </BrowserRouter>
  );
}
