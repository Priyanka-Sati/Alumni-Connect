import React, { useState } from "react";
import "./Navbar.css";
import { Avatar } from "@material-ui/core";
import ChaletIcon from "@mui/icons-material/Chalet";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import MessageIcon from "@mui/icons-material/Message";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

function Navbar({ userData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
    
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const HomePage = () => {
    history.push("/home");
  };
  const Signout = () => {
    auth.signOut();
    history.push("/");
  };
  const handleConnection = () => {
    history.push("/connections");
  }   
  const handleProfile = () => {
    history.push("/profile");
    handleClose();
  }
  const handleMyPost = () => {
    history.push("/myPost");
    handleClose();
  }
  const handleChat = () => {
    history.push("/Chat");
  }

  return (
    <div className="navbar">
      <div className="navbar-header" onClick={HomePage}>
        <h3 id="collegename1">Govind Ballabh Pant Engineering College</h3>
        <h3 id="collegename2">G B P I E T</h3>
      </div>
      <div className="navbar-header">
        <div className="navbar-container">
          <ChaletIcon className="icon" onClick = {HomePage} />
          {/* <span>Home</span> */}
        </div>
        {/* <div className="navbar-container">
          <NotificationsActiveIcon className="icon" />
          <span>Notification</span>
        </div> */}
        <div className="navbar-container">
          <MessageIcon className="icon" onClick = {handleChat}/>
          {/* <span>Chat</span> */}
        </div>
        <div className="navbar-container">
          <PeopleAltIcon className="icon" onClick={handleConnection}/>
          {/* <span>Connections</span> */}
        </div>
        <div className="navbar-container">
          <Avatar
            alt={userData.username}
            src="/static/images/avatar/1.jpg"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleMyPost}>My Post</MenuItem>
            <MenuItem onClick={Signout}>Sign Out</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
