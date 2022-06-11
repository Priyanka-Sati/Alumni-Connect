import React from "react";
import Posts from "./Posts";
import PostUpload from "./PostUpload";
import "./Feeds.css";
 
function Feeds({userData}) {

  return (
    <div className="feed">
      <div className="feed_container">
        <PostUpload userData={userData}/>
      </div>

      <div className="feed_container1">
        <Posts />
      </div>
    </div>
  );
}

export default Feeds;
