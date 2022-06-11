import React from "react";
import TextPost from "./TextPost";
import ImageUpload from "./ImageUpload";
import "./PostUpload.css";
import VideoUpload from "./VideoUpload";

function PostUpload({userData}) {
  return (
    <div className="postupload">
      <div className="postupload_container1">
        <TextPost userData={userData}/>
      </div>
      <div className="postupload_container2">
        <ImageUpload userData={userData}/>
        <VideoUpload userData={userData}/>
      </div>
    </div>
  );
}

export default PostUpload;
