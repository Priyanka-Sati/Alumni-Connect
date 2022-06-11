import React from "react";
import { Avatar } from "@material-ui/core";
import "./ProfileDetail.css"

function ProfileDetail({ userData }) {

  return (
    <div className="profiledetail">
      <div className="profiledetail_container1">
        <Avatar className="profiledetail_avtar" alt={userData.username} src="/static/images/avatar/1.jpg" />
        <h1>{userData.username}</h1>
      </div>

      <div className="profiledetail_container2">
        <h3>Branch : </h3> {userData.branch}
        <h3>Year : </h3> {userData.year}
        <h3>Network : </h3> 
      </div>
    </div>
  );
}

export default ProfileDetail;
