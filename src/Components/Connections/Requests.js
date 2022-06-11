import React, { useState, useEffect, useContext } from "react";
import "./Requests.css";
import { database } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import ConnectionsUI from "./ConnectionsUI";

function Requests({userData}) {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    database.users
      .doc(user.uid)
      .collection("RequestUserIds")
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
    <div className="requestconnections">
      <ConnectionsUI userArr={users} buttonValue={"Request"} userData={userData} />
    </div>  
  );
}

export default Requests;
