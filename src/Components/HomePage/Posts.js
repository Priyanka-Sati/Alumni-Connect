import React, { useState, useEffect, useContext } from "react";
import { database } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import PostCard from "./PostCard";
import "./Posts.css";

function Posts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    database.posts.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);   
              
  return (
    <div className="post">
      {posts.map(({ id, post }) => (
        <PostCard
          key={id}
          postId={id}
          user={user}
          username={post.username}
          caption={post.text}
          imgUrl={post.photo}
          videoUrl={post.video}
        />
      ))}
    </div>
  );
}

export default Posts;
