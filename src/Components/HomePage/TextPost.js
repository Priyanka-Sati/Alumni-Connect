import React, { useState, useContext } from "react";
import { Avatar } from "@material-ui/core";
import "./TextPost.css";
import { AuthContext } from "../../Context/AuthContext";
import firebase from "firebase/compat/app";

function TextPost({ userData }) {
  const [post, setPost] = useState("");
  const { user } = useContext(AuthContext);
  const { uploadpostdata } = useContext(AuthContext);

  const handleSetData = () => {
    if (post === "") {
      alert("first write post");
      return;
    }

    const postdata = {
      userID: user.uid,
      username: userData.username,
      video: null,
      photo: null,
      text: post,
      createdAt:firebase.firestore.FieldValue.serverTimestamp()
    };    
    // console.log("from textpost =", postdata);
    setPost("");
    uploadpostdata(postdata , userData);
  };
  return (
    <div className="textpost">
      <div className="textpost_avtar">
        <Avatar alt={userData.username} src="/static/images/avatar/1.jpg" />
      </div>
      <div className="textpost_input">
        <input
          type="text"
          placeholder="Start a post"
          value={post}
          onChange={(event) => setPost(event.target.value)}
        />
      </div>
      <div className="textpost_submit">
        <button type="submit" onClick={handleSetData}>
          Post
        </button>
      </div>
    </div>
  );
}

export default TextPost;
