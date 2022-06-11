import React, { useContext, useState, useEffect } from 'react';
import PersonalDetailRight from './PersonalDetailRight';
import PersonalDetails from './PersonalDetails';
import Navbar from '../Headers/Navbar';
import { AuthContext } from "../../Context/AuthContext";
import { database } from "../../firebase";
import "./Profile.css";

function Profile() {
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
    <div>
      <Navbar userData={userData} />
      <div className="profile">
        <PersonalDetails user1={user} userData={userData}/>
        <PersonalDetailRight user={user}/>
      </div>
    </div>
  )  
}

export default Profile