import React from "react";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import axios from "axios";
import { $nodesOfType } from "lexical";
import { HashtagNode } from "@lexical/hashtag";

const SpeakButton = (props) => {
  // const { canUndo } = useContext(ToolbarContext);

  const [editor] = useLexicalComposerContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const state = editor.getEditorState();
    const tags = state.read(() => {
      return $nodesOfType(HashtagNode);
    });
    const content = JSON.stringify(state);
    const wizard = props.wizard.name;
    console.log(tags);
    if (state._nodeMap.size !== 2) {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        return axios
          .post("http://localhost:8080/posts", {
            content,
            wizard,
          })
          .then((response) => {
            console.log(response);
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
            props.update();
            editor.focus();
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
      <Box sx={{ m: 1, position: "relative" }}>
        <Button disabled={loading} variant="contained" onClick={handleSubmit}>
          {" "}
          Post{" "}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: "green.500",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default SpeakButton;
