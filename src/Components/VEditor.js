import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  AlignDropdown,
  BoldButton,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  UnderlineButton,
} from "verbum";

import { useRef } from "react";
import SpeakButton from "./SpeakButton";
import "../Styles/SpeakBox.css";
import Card from "@mui/material/Card";

const NoteViewer = (props) => {
  const editorStateRef = useRef();

  return (
    <div className="speakBox">
      <Card
        variant="outlined"
        sx={{
          maxWidth: 610,
          paddingTop: "51px",
          borderRadius: "10px",
          borderColor: "secondary.dark",
          borderTop: "none",
          borderTopRightRadius: "0",
          borderTopLeftRadius: "0",
        }}
      >
        <EditorComposer>
          <Editor
            initialEditorState={undefined}
            placeholder={"Incantation awaits..."}
            hashtagsEnabled={true}
            autoLinkEnabled={true}
            emojisEnabled={true}
            onChange={(editorState) => (editorStateRef.current = editorState)}
          >
            <ToolbarPlugin
              defaultFontFamily="Courier New"
              defaultFontSize="20px"
            >
              <FontSizeDropdown />
              <BoldButton />
              <ItalicButton />
              <UnderlineButton />
              <InsertLinkButton />
              <InsertDropdown
                enablePoll={false}
                enableYoutube={true}
                enableHorizontalRule={true}
              />
              <AlignDropdown />
            </ToolbarPlugin>
          </Editor>
          <SpeakButton
            update={props.update}
            state={editorStateRef}
            wizard={props.wizard}
            tavern={props.tavern}
          />
        </EditorComposer>
      </Card>
    </div>
  );
};

export default NoteViewer;
