import React, { useState, useContext } from "react";
import "./VideoUpload.css";
import VideocamIcon from "@material-ui/icons/Videocam";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { storage } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import firebase from "firebase/compat/app";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    height: "50vh",
    width: "80vw",
    display: "flex",
    alignItems: "center",
  },
}));

function VideoUpload({ userData }) {
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const { uploadpostdata } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (video === null) {
      alert("Please Choose any video.");
      return;
    }

    if (video.size / (1024 * 1024) > 100) {
      alert("This video is very big");
      return;
    }

    const uploadTask = storage.ref(`videos/${video.name}`).put(video);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function.......
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function .........
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function......
        storage
          .ref("videos")
          .child(video.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            const postdata = {
              userID: user.uid,
              username: userData.username,
              video: url,
              photo: null,
              text: caption,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            };
            uploadpostdata(postdata, userData);
            setProgress(0);
            setCaption("");
            setVideo(null);
            handleClose();
          });
      }
    );
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div className="videoupload">
      <div className="videoupload_container" onClick={handleClickOpen}>
        <VideocamIcon className="videoupload_icon" />
        <p>Video</p>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle>Upload Video and Caption</DialogTitle>
        <progress className="imageupload_progress" value={progress} max="100" />
        <DialogContent className="dialog_content">
          <div className="dialog_content_block">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleChange(e)}
              id="upload-input"
              className="dialog_box_fileinput"
            />
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Caption"
            type="text"
            fullWidth
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />
        </DialogContent>
        <DialogActions className="dialog_buttons">
          <button onClick={handleClose} className="dialog_buttons_close">
            Close
          </button>
          <button onClick={handleUpload} className="dialog_buttons_upload">
            Upload
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VideoUpload;
