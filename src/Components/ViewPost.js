import * as React from "react";
import { Temporal } from "@js-temporal/polyfill";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { EditorComposer, Editor } from "verbum";
import "../Styles/ViewPost.css";

export default function ViewPost(props) {
  const current = Temporal.Now.plainDateTimeISO();
  const timestamp = Temporal.PlainDateTime.from(props.timestamp);
  const min = current.since(timestamp).minutes;
  const hour = current.since(timestamp).hours;
  const day = current.since(timestamp).days;
  const display =
    (day && `${day}d`) || (hour && `${hour}h`) || (min && `${min}m`) || "now";

  return (
    <div className="viewPost-container">
      <Card
        variant="outlined"
        sx={{
          maxWidth: 610,
          padding: 0,
          borderRadius: "10px",
          borderColor: "primary.dark",
        }}
      >
        <CardHeader
          sx={{ paddingBottom: 0 }}
          avatar={
            <Avatar
              src={props.wizard.avatar}
              sx={{ bgcolor: "primary.dark" }}
              aria-label="post"
            >
              R
            </Avatar>
          }
          title={props.wizard.name}
          titleTypographyProps={{
            fontFamily: "monospace",
            color: "secondary.dark",
          }}
          subheader={display}
          subheaderTypographyProps={{ fontFamily: "monospace" }}
        />

        <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
          <EditorComposer>
            <div className="viewPost">
              <Editor
                hashtagsEnabled={true}
                isReadOnly={true}
                initialEditorState={props.content}
              />
            </div>
          </EditorComposer>
        </CardContent>
      </Card>
    </div>
  );
}
