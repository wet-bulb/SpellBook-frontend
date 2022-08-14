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
        color="transparent"
        enableColorOnDark={true}
        sx={{
          backgroundColor: "background.default",
        }}
      >
        <Box display="flex" justifyContent="center">
          <Paper
            variant="outlined"
            sx={{
              // margin: "0 auto 0 auto",
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
              {/* <Avatar
                src={props.wizard.avatar}
                variant="large"
                sx={{ width: 60, height: 60, bgcolor: "primary.dark" }}
              /> */}
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
