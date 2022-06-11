import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { database } from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import "./PersonalDetails.css";
   
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

function PersonalDetails({user1, userData}) {
  const { user } = useContext(AuthContext);
  // const [userData, setUserData] = useState("");
  const history = useHistory();
  const classes = useStyles();

  const handleEdit = () => {
    history.push("/profileform")
  }

  // useEffect(() => {
  //   const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
  //     setUserData(snapshot.data());
  //   });
  //   return () => {
  //     unsub();
  //   };
  // }, [user]);

  console.log(user)
  console.log(user1)

  return (
    <div className="personaldetail">
      <div className="personaldetail_div">
        {user1.uid == user.uid ? <button onClick={handleEdit}>Edit Profile</button> : <div></div>}
        <div className="personaldetail_info">
          <Avatar
            alt={userData.username}
            src="/static/images/avatar/1.jpg"
            className={classes.large}
          />
          <div className="personaldetail_info_div">
            <h2>{userData.username}</h2>
            <p className="branch">{userData.branch}</p>
            <p className="year">{userData.session}  _ {userData.year} year</p>
            <p className="dob">DOB - {userData.dateOfBirth}</p>
            <p className="address">{userData.address}</p>
          </div>
        </div>
      </div>

      <div className="personaldetail_bio">
        <p>
          {userData.about}
        </p>
      </div>

      {/* <div className="personaldetail_website">
        <h3>Websites</h3>
        <p>hjbfahjdfjdabs</p>
        <p>jhadsjlfkhsdd</p>
        <p>hahfgasdhjfgaks</p>
      </div> */}
    </div>
  );
}

export default PersonalDetails;
