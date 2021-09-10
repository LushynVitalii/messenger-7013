import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    width: "100%",
    backgroundColor: "#F4F6FA",
    borderRadius: "8, 0, 0, 8",
    marginBottom: 20,
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text.trim() === "" && imageSelected === "") return;
    const imgURL = await uploadImage();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: text,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: [imgURL],
    };
    await postMessage(reqBody);
    setText("");
    setPreviewSource("");
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "meof5088");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dd9xp5jlw/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const file = await res.json();
    console.log(file);
    return file.url;
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onChangeImgHandler = (event) => {
    setImageSelected(event.target.files[0]);
    previewFile(event.target.files[0]);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {previewSource && (
        <Grid container alignItems="flex-start" justifyContent="flex-start">
          <IconButton onClick={() => setPreviewSource("")}>
            <HighlightOffIcon />
          </IconButton>
          <img
            src={previewSource}
            alt="chosen"
            style={{
              maxHeight: "100px",
              maxWidth: "100px",
              borderRadius: "5px",
            }}
          />
        </Grid>
      )}
      <Grid container style={{padding: 0}}>
        <Grid item xs={11}>
          <FormControl fullWidth hiddenLabel>
            <FilledInput
              classes={{ root: classes.input }}
              disableUnderline
              placeholder="Type something..."
              value={text}
              name="text"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid
          item
          container
          xs={1}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          style={{marginBottom: "20px", backgroundColor: "hsl(218, 60%, 97%)"}}
        >
          <Grid item>
            <input
              style={{ display: "none" }}
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(event) => onChangeImgHandler(event)}
            />
            <label htmlFor="contained-button-file">
              <IconButton
                component="span"
                style={{ padding: 0 }}
              >
                <PhotoLibraryIcon />
              </IconButton>
            </label>
          </Grid>
          <Grid item>
            <IconButton
              type="submit"
              style={{ padding: 0 }}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
