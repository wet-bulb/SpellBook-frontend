import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import spelltome from "../Assets/spelltome.png";
import axios from "axios";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Spelltome
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn(props) {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("loading");
    const data = new FormData(event.currentTarget);
    console.log({
      wizard: data.get("wizard"),
    });
    return axios
      .get(`http://localhost:8080/wizards?name=${data.get("wizard")}`)
      .then((wizard) => {
        if (!wizard.data) {
          setStatus("Invalid");
          setError(true);
        } else if (wizard.data.active) {
          setStatus("Active");
          setError(true);
        } else {
          setStatus("success");
          props.setWizard(wizard.data);
          localStorage.setItem("wizard", JSON.stringify(wizard.data));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img alt="" src={spelltome} />
        {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <FontAwesomeIcon icon={faHatWizard} />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={error}
            margin="normal"
            required
            fullWidth
            id={error ? "outlined-error-helper-text" : "wizard"}
            label={error ? "Error" : "Wizard Name"}
            helperText={error ? `${status} wizard.` : null}
            name="wizard"
            autoComplete="wizard"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            EVOKE WIZARD
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
