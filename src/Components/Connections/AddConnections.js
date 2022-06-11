import React, { useState, useEffect, useContext } from "react";
import { database } from "../../firebase";
import "./AddConnections.css";   
import { AuthContext } from "../../Context/AuthContext";
import ConnectionsUI from "./ConnectionsUI";

function AddConnections({userData}) {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    database.users.onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="addconnections">
      <ConnectionsUI userArr={users} buttonValue={"Add"} userData={userData}/>
    </div>
  );
}

export default AddConnections;
