import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Headers/Navbar";
import CloseIcon from "@material-ui/icons/Close";
import { AuthContext } from "../../Context/AuthContext";
import { database } from "../../firebase";
import "./MyPost.css";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const [posts, setPostData] = useState([]);

  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
    return () => {
      unsub();
    };
  }, [user]);

  useEffect(() => {
    database.posts.onSnapshot((snapshot) => {
      setPostData(
        snapshot.docs.map((post) => ({
          id: post.id,
          post: post.data(),
        }))
      );
    });
  }, [user]);

  console.log(posts);

  const handleClick = (postId) => {
    if (window.confirm("Do you want to delete this post")) {
      // Save it!
      database.posts.doc(postId).delete();
    }
  };

  return (
    <div className="myPost">
      <Navbar userData={userData} />
      <div className="myPost_div">
        <div className="postContainer">
          {posts.map(({ id, post }) => (
            <div className="post" key={id}>
              <div className="post_icon">
                <CloseIcon onClick={() => handleClick(id)} />
              </div>
              <div className="post_card">
                {post.photo && <img alt="missing" src={post.photo} />}

                {post.video && <video src={post.video} controls></video>}

                {!post.photo && !post.video && <div>{post.text}</div>}
              </div>

              <div className="post_caption">
                {post.video && post.text && <div>{post.text}</div>}

                {post.photo && post.text && <div>{post.text}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
