import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountMenu from "./AccountMenu";

export default function ButtonAppBar(props) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#121212f2",
        }}
      >
        <Box display="flex" justifyContent="center">
          <Paper
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: "610px",
              borderColor: "secondary.dark",
              borderTop: "none",
              borderBottom: "none",
              borderRadius: "0",
              bgcolor: "inherit",
            }}
          >
            <Toolbar sx={{ padding: "5px 5px 0px 5px" }} disableGutters>
              <Button onClick={scrollToTop} color="inherit">
                <Typography variant="h6">HOME</Typography>
              </Button>
              <Box component="div" sx={{ flexGrow: 1 }} />
              <AccountMenu
                wizard={props.wizard}
                handleLogout={props.handleLogout}
                handleTavernChange={props.handleTavernChange}
                handleAddTavern={props.handleAddTavern}
                wizardsTower={props.wizardsTower}
              />
            </Toolbar>
          </Paper>
        </Box>
      </AppBar>
    </Box>
  );
}
