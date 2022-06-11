import React, { useState, useContext } from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import "./ImageUpload.css";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { storage } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";import firebase from "firebase/compat/app";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    height: "50vh",
    width: "80vw",
    display: "flex",
    alignItems: "center",
  },
}));

function ImageUpload({ userData }) {
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const { uploadpostdata } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    if (image === null) {
      alert("Please Choose any image.");
      return;
    }

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

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
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            const postdata = {
              userID: user.uid,
              username: userData.username,
              video: null,
              photo: url,
              text: caption,
              createdAt:firebase.firestore.FieldValue.serverTimestamp()
            };
            uploadpostdata(postdata, userData);
            setProgress(0);
            setCaption("");
            setImage(null);
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
    <div className="imageupload">
      <div className="imageupload_container" onClick={handleClickOpen}>
        <AddAPhotoIcon className="imageupload_icon" />
        <p>Photo</p>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle>Upload Photo and Caption</DialogTitle>
        <progress className="imageupload_progress" value={progress} max="100" />
        <DialogContent className="dialog_content">
          <div className="dialog_content_block">
            <input
              type="file"
              accept="image/*"
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
            value={caption} 
            onChange={(event) => setCaption(event.target.value)}
            fullWidth
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

export default ImageUpload;
