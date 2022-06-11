import React, { useState, useEffect } from "react";
import "./PostCard.css";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MessageIcon from "@material-ui/icons/Message";
import firebase from "firebase/compat/app";
import { database } from "../../firebase";

function PostCard({ postId, username, user, caption, imgUrl, videoUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [userData, setUserData] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = database.posts
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
    return () => {
      unsub();
    };
  }, [user]);

  const postComment = (event) => {
    event.preventDefault();

    database.posts.doc(postId).collection("comments").add({
      text: comment,
      username: userData.username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  const handleLike = () => {
    setLike(!like);

    console.log(like);
  };

  return (
    <div className="postcard">
      {/* header -> avatar + username */}
      <div className="postcard_header">
        <Avatar
          className="postcard_avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      {/* image */}
      {imgUrl && (
        <div className="postcard_image">
          <img alt="missing" src={imgUrl} />
        </div>
      )}

      {/* video */}
      {videoUrl && (
        <div className="postcard_video">
          <video src={videoUrl} controls onClick={handleClick}></video>
        </div>
      )}

      {/* caption */}
      <h4 className="postcard_text">{caption}</h4>

      <div className="post_icon_container">
        {like == true ? (
          <FavoriteIcon className="post_icons_red" onClick={handleLike} />
        ) : (
          <FavoriteIcon className="post_icons" onClick={handleLike} />
        )}

        {/* <MessageIcon className="post_icons" /> */}

        {user && (
          <form className="postcard_commentBox">
            <input
              className="postcard_input"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className="postcard_button"
              disabled={!comment}
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
        )}
      </div>

      <div className="postcard_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username} :-</strong> {comment.text}
          </p>
        ))}   
      </div>
    </div>
  );
}

export default PostCard;
