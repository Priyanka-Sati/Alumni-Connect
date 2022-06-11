import React, { useState, useEffect, useContext } from "react";
import "./Connections.css";
import MyConnections from "./MyConnections";
import AddConnections from "./AddConnections";
import Requests from "./Requests";
import Sent from "./Sent";
import { AuthContext } from "../../Context/AuthContext";
import { database } from "../../firebase";
   
function Connections() {
  const [active, setActive] = useState("myconnection");
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

  const handleChange = (value) => {
    setActive(value);
  };

  return (
    <div className="connection">
      <div className="container_header">
        <h1>Connections</h1>
      </div>
      <div className="connection_container">
        <div className="menu">
          {active === "myconnection" ? (
            <div
              className="menu_items myconnection"
              onClick={() => handleChange("myconnection")}
            >
              My Connections
            </div>
          ) : (
            <div
              className="menu_items"
              onClick={() => handleChange("myconnection")}
            >
              My Connections
            </div>
          )}

          {active === "addconnection" ? (
            <div
              className="menu_items addconnection"
              onClick={() => handleChange("addconnection")}
            >
              Add Connections
            </div>
          ) : (
            <div
              className="menu_items"
              onClick={() => handleChange("addconnection")}
            >
              Add Connections
            </div>
          )}

          {active === "requests" ? (
            <div
              className="menu_items requests"
              onClick={() => handleChange("requests")}
            >
              Requests
            </div>
          ) : (
            <div
              className="menu_items"
              onClick={() => handleChange("requests")}
            >
              Requests
            </div>
          )}

          {active === "Sent" ? (
            <div
              className="menu_items Sent"
              onClick={() => handleChange("Sent")}
            >
              Sent
            </div>
          ) : (
            <div
              className="menu_items"
              onClick={() => handleChange("Sent")}
            >
              Sent
            </div>
          )}

        </div>

        <div className="result">
          {active === "myconnection" && <MyConnections userData={userData} />}
          {active === "addconnection" && <AddConnections userData={userData} />}
          {active === "requests" && <Requests userData={userData} />}
          {active === "Sent" && <Sent userData={userData} />}
        </div>
      </div>
    </div>
  );
}

export default Connections;
