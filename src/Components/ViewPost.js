import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { EditorComposer, Editor } from "verbum";
import "../Styles/ViewPost.css";

export default function ViewPost(props) {
  return (
    <div className="viewPost-container">
      <Card
        // variant="outlined"
        sx={{ maxWidth: 610, padding: 0, borderRadius: "10px" }}
      >
        <CardHeader
          sx={{ paddingBottom: 0 }}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={props.wizard}
          titleTypographyProps={{ fontFamily: "monospace" }}
          subheader="19hr"
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
        <CardActions sx={{ margin: 0, padding: 0 }} disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
