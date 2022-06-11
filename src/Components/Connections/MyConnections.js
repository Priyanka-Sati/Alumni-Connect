import React, { useState, useEffect, useContext } from 'react';
import { database } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import ConnectionsUI from "./ConnectionsUI";


function MyConnections({userData}) {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    database.users.doc(user.uid).collection("ConnectionUserIds").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id : doc.data().id,
          data : doc.data()
        }))
      )
    })
  }, [])
     
  return (
    <div className="myconnections">
      <ConnectionsUI userArr={users} buttonValue={"MyConnections"} userData={userData} />
    </div>
  );
}

export default MyConnections;
