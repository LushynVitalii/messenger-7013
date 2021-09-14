import React, { useState } from "react";
import { FormControl, FilledInput, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage, uploadImage } from "../../store/utils/thunkCreators";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import InputUI from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: theme.spacing(2),
  },
  input: {
    height: 70,
    width: "100%",
    backgroundColor: "#F4F6FA",
    borderRadius: "8, 0, 0, 8",
    marginBottom: theme.spacing(2.5),
  },
  previewImg: {
    maxHeight: "100px",
    maxWidth: "100px",
    borderRadius: "5px",
    margin: theme.spacing(0.5),
  },
  sendImgContainer: {
    marginBottom: theme.spacing(2.5),
    backgroundColor: "hsl(218, 60%, 97%)",
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [imageSelectedArr, setImageSelectedArr] = useState([]);
  const [previewSource, setPreviewSource] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;
  const tempImgArr = [];

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text.trim() === "" && imageSelectedArr.length === 0) return;
    const imgUrlArray = [];
    let imgURL = null;
    if (imageSelectedArr) {
      for (
        let indexArr = 0, arrImgLength = imageSelectedArr.length;
        indexArr < arrImgLength;
        indexArr++
      ) {
        if (imageSelectedArr[indexArr].length > 0) {
          for (
            let nestedArrIndx = 0,
              nestedArrLength = imageSelectedArr[indexArr].length;
              nestedArrIndx < nestedArrLength;
              nestedArrIndx++
          ) {
            imgURL = await uploadImage(imageSelectedArr[indexArr][nestedArrIndx]);
            imgUrlArray.push(imgURL);
          }
        } else {
          imgURL = await uploadImage(imageSelectedArr[indexArr][0]);
          imgUrlArray.push(imgURL);
        }
      }
    }

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: text,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: imgUrlArray,
    };
    await postMessage(reqBody);
    setText("");
    setPreviewSource([]);
    setImageSelectedArr([]);
  };

  const previewFile = (file) => {
    for (let i = 0, j = file.length; i < j; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(file[i]);
      reader.onloadend = () => {
        setPreviewSource((oldValue) => [...oldValue, reader.result]);
      };
    }
  };

  const onChangeImgHandler = (event) => {
    tempImgArr.push.apply(tempImgArr, event.target.files);
    setImageSelectedArr((oldValue) => [...oldValue, tempImgArr]);
    previewFile(event.target.files);
  };

  const onChangePreviewSource = () => {
    setPreviewSource([]);
    setImageSelectedArr([]);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {previewSource && previewSource.length > 0 && (
        <Grid container alignItems="flex-start" justifyContent="flex-start">
          <IconButton onClick={onChangePreviewSource}>
            <HighlightOffIcon />
          </IconButton>
          {previewSource.map((img, index) => {
            return (
              <img
                key={index + img}
                src={img}
                alt="chosen"
                className={classes.previewImg}
              />
            );
          })}
        </Grid>
      )}
      <Grid container style={{ padding: 0 }}>
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
          className={classes.sendImgContainer}
        >
          <Grid item>
            <InputUI
              style={{ display: "none" }}
              accept="image/*"
              id="contained-button-file"
              inputProps={{ multiple: true }}
              type="file"
              onChange={(event) => onChangeImgHandler(event)}
              onClick={(event) => (event.target.value = null)}
            />
            <label htmlFor="contained-button-file">
              <IconButton component="span" style={{ padding: 0 }}>
                <PhotoLibraryIcon />
              </IconButton>
            </label>
          </Grid>
          <Grid item>
            <IconButton type="submit" style={{ padding: 0 }}>
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
