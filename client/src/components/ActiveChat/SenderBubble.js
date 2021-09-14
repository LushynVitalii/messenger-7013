import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5),
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: theme.spacing(1),
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
    marginBottom: theme.spacing(2),
    textAlign: "right",
  },
  img: {
    maxHeight: "150px",
    maxWidth: "150px",
    borderRadius: "10px 10px 0 10px",
    margin: theme.spacing(1.1, 1.1, 0.6, 1.1),
    [theme.breakpoints.down("sm")]: {
      maxHeight: "100px",
      maxWidth: "100px",
    },
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        {attachments &&
          attachments.map((imageURL, index) => {
            return (
              <img
                key={index + imageURL}
                className={classes.img}
                src={imageURL}
                alt=""
              />
            );
          })}
        {text && <Typography className={classes.text}>{text}</Typography>}
      </Box>
    </Box>
  );
};

export default SenderBubble;
