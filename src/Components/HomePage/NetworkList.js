import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Avatar } from "@material-ui/core";
import "./NetworkList.css";
import { database } from "../../firebase";

function NetworkList() {
  const { user } = useContext(AuthContext);
  const [userConn, setUserConn] = useState([]);

  useEffect(() => {
    database.users
      .doc(user.uid)
      .collection("ConnectionUserIds")
      .onSnapshot((snapshot) => {
        // console.log(snapshot)
        setUserConn(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="networkslist">
      <h3>Network List</h3>
      <div className="networklist_container">
        {userConn.map((data) => (
          <div className="network" >
            <div className="network_avatar">
              <Avatar alt="shubham" src="" />
            </div>
            <h4 className="network_name">{data.username}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NetworkList;
