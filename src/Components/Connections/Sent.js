import React, { useState, useEffect, useContext } from "react";
import "./Sent.css";
import { database } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import ConnectionsUI from "./ConnectionsUI";

function Sent({userData}) {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    database.users
      .doc(user.uid)
      .collection("SentUserIds")
      .onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.data().id,
            data: doc.data()    
          }))
        );
      });
  }, []);


  return (
    <div className="sentconnections">
      <ConnectionsUI userArr={users} buttonValue={"Sent"} userData={userData} />
    </div>
  );
}

export default Sent;
