import React from "react";
import { useState } from "react";
import VEditor from "./Components/VEditor";
import InviteOverlay from "./Components/InviteOverlay";
import Feed from "./Components/Feed";
import ButtonAppBar from "./Components/AppBar";
import SignIn from "./Components/SignIn";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import "./Styles/PlaygroundEditorTheme.css";
// import "./Styles/EditorComposer.css";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    type: "dark",
    primary: {
      main: "#a856b5",
    },
    secondary: {
      main: "#63b556",
    },
  },
  typography: {
    fontFamily: "monospace",
  },
});

const wizardsTower = {
  id: 1,
  name: "The Wizards Tower",
};

const App = () => {
  const [value, setValue] = useState(0);
  const [wizard, setWizard] = useState(
    JSON.parse(localStorage.getItem("wizard"))
  );
  const [tavern, setTavern] = useState(wizardsTower);

  const forceUpdate = () => {
    setValue((value) => value + 1);
  };

  const onInviteClose = () => {
    setWizard(JSON.parse(localStorage.getItem("wizard")));
  };

  const handleLogout = () => {
    setTavern(wizardsTower);
    localStorage.setItem("wizard", false);
    setWizard(false);
  };

  const handleTavernChange = (tavern) => {
    setTavern(tavern);
    forceUpdate();
  };

  const handleAddTavern = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    return axios
      .post(`/wizards/${wizard.id}/taverns`, {
        id: 1,
        name: data.get("tavern"),
      })
      .then((result) => {
        const newWizard = {
          ...wizard,
          taverns: [...wizard.taverns, result.data],
        };
        setWizard(newWizard);
        localStorage.setItem("wizard", JSON.stringify(newWizard));
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {!wizard && <SignIn setWizard={setWizard} />}

      {wizard && (
        <div className="speak">
          <ButtonAppBar
            wizard={wizard}
            handleLogout={handleLogout}
            handleTavernChange={handleTavernChange}
            handleAddTavern={handleAddTavern}
            wizardsTower={wizardsTower}
          />

          <VEditor
            key={value}
            update={forceUpdate}
            wizard={wizard}
            tavern={tavern}
          />
          <Feed updateDependency={value} tavern={tavern} />
        </div>
      )}
      {wizard && wizard.invites && (
        <InviteOverlay onClose={onInviteClose} wizard={wizard} />
      )}
      {/* <link rel="stylesheet" href="./Styles/EditorComposer.css" /> */}
    </ThemeProvider>
  );
};

export default App;
