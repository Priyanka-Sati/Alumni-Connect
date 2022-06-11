import React, { useState } from "react";
import "./Headersignin.css";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";

function Headersignin() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signin = (event) => {
    event.preventDefault(); // prevent from refreshing

    if (username === "" || password === "") {
      alert("Username or Password is missing");
      return;
    }

    auth
      .signInWithEmailAndPassword(username, password)
      .then((auth) => {
        history.push("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="header">
      <div className="header-input">
        <input
          type="text"
          placeholder="E-mail"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button onClick={signin}>Sign In</button>
      </div>
    </div>
  );
}

export default Headersignin;
