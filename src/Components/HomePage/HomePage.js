import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Navbar from "../Headers/Navbar";
import "./HomePage.css";
import ProfileDetail from "./ProfileDetail";
import CollegePost from "./CollegePost";
import Feeds from "./Feeds";
import NetworkList from "./NetworkList";
import { database } from "../../firebase";

function HomePage() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
    
  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
    return () => {
      unsub();
    };
  }, [user]);

  return (
    <div className="homepage">
      <Navbar userData={userData} />
      {/* {user && <h1>{user.uid}</h1>} */}
      <div className="homepage_container">
        <div className="homepage_container_div leftdiv">
          <ProfileDetail userData={userData} />
          {/* <CollegePost /> */}
        </div>
        <div className="homepage_container_div middiv">
          <Feeds userData={userData} />
        </div>
        <div className="homepage_container_div rightdiv">
          <NetworkList />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
