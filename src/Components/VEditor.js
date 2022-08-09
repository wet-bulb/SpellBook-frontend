import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  AlignDropdown,
  BoldButton,
  FloatingLinkEditor,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  UnderlineButton,
  Divider,
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
        raised={true}
        // variant="outlined"
        sx={{
          maxWidth: 610,
          paddingTop: -20,
          borderRadius: "10px",
        }}
      >
        <EditorComposer>
          <Editor
            initialEditorState={undefined}
            placeholder={"Speak friend..."}
            hashtagsEnabled={true}
            autoLinkEnabled={true}
            emojisEnabled={true}
            onChange={(editorState) => (editorStateRef.current = editorState)}
          >
            <ToolbarPlugin
              defaultFontFamily="Courier New"
              defaultFontSize="20px"
            >
              {/* <FontFamilyDropdown /> */}
              <FontSizeDropdown />
              {/* <Divider /> */}
              <BoldButton />
              <ItalicButton />
              <UnderlineButton />
              <InsertLinkButton />
              {/* <Divider /> */}
              <InsertDropdown
                enablePoll={false}
                enableYoutube={true}
                enableHorizontalRule={true}
              />
              {/* <Divider /> */}
              <AlignDropdown />
            </ToolbarPlugin>
          </Editor>
          <SpeakButton
            update={props.update}
            state={editorStateRef}
            wizard={props.wizard}
          />
        </EditorComposer>
      </Card>
    </div>
  );
};

export default NoteViewer;
