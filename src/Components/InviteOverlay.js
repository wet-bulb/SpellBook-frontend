import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { randomWizardName } from "wizard_name_generator";
import { tavern } from "fantastical";
import axios from "axios";
import { useState, useRef } from "react";
import CopyToClipboard from "./CopyToClipboard";

const InviteOverlay = (props) => {
  const [wizards, setWizards] = useState([]);
  const [summon, setSummon] = useState(true);
  const { wizard, onClose } = props;
  const name = wizard.name;
  const wizardId = wizard.id;

  const wizardNames = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const name = randomWizardName();
      result.push(name);
    }
    return result;
  };

  const wizardNamesList = useRef(wizardNames());
  const tavernName = useRef(tavern());

  const setInvitesFalse = () => {
    return axios
      .patch(`/wizards/invites?id=${wizardId}&bool=false`)
      .then((result) =>
        localStorage.setItem("wizard", JSON.stringify(result.data))
      )
      .catch((err) => console.log(err));
  };

  const postThreeWizards = () => {
    return axios
      .post(`/wizards/invites`, {
        id: wizardId,
        names: wizardNamesList.current,
      })
      .then((result) => setWizards(result.data))
      .then(() => setSummon(false))
      .catch((err) => console.log(err));
  };

  const addOneTavern = () => {
    return axios
      .post(`/wizards/${wizardId}/taverns`, {
        id: 0,
        name: tavernName.current,
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    postThreeWizards()
      .then(() => addOneTavern())
      .then(() => setInvitesFalse());
  };

  const handleClose = () => {
    return axios
      .patch(`/wizards/invites?id=${wizardId}&bool=false`)
      .then((result) => onClose(result.data))
      .catch((err) => console.log(err));
  };

  const wizardComponents = wizards.map((wizard) => (
    <CopyToClipboard>
      {({ copy }) => (
        <ListItem button onClick={() => copy(wizard.name)}>
          <ListItemAvatar>
            <Avatar src={wizard.avatar} sx={{ bgcolor: "primary.dark" }} />
          </ListItemAvatar>
          <ListItemText primary={wizard.name} />
        </ListItem>
      )}
    </CopyToClipboard>
  ));

  return (
    <Dialog
      PaperProps={{ variant: "outlined" }}
      onClose={handleClose}
      open={wizard.invites}
    >
      <DialogTitle>Welcome to Spelltome, {name}.</DialogTitle>
      <DialogContentText>
        The Wizards Tower. A place for all of wiz-kind. Here you will greet the
        souls of three ancient wizards. They are ephemeral, but their names hold
        great power. Curious! It appears the Arcane Lady has granted you
        attunement to a planar tavern, {tavernName.current}. Incantation awaits!
      </DialogContentText>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pb: 0,
        }}
      >
        <List sx={{ pt: 0 }}>{wizardComponents}</List>
      </DialogContent>
      <DialogActions>
        {summon && <Button onClick={handleClick}>Summon</Button>}
        {!summon && <Button onClick={handleClose}>Materialize</Button>}
      </DialogActions>
    </Dialog>
  );
};
export default InviteOverlay;
