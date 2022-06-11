import React, { useState } from "react";
import "./Signup.css";
import Headersignin from "../Headers/Headersignin";
import { auth , database } from "../../firebase";
import { useHistory } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, seterror] = useState("");
  const history = useHistory();
  // const {user} = useContext(AuthContext);


  const createUser = (event) => {
    event.preventDefault(); // this will prevent screen from refreshing

    if (username === "" || email === "") {
      seterror("* All fields are mandatory to fill.");
      return;
    }

    if (password === "" || password !== repassword) {
      seterror("* Password doesn't match.");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userObj) => {
        if (userObj) {
          database.users.doc(userObj.user.uid).set({
            username: username,
            email: email,
            password: password,
          })
          .then(() => {
            history.push("/home");
          })
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <div className="login-outer-div">
      <Headersignin />
      <div className="login">
        <div className="login_data">
          {/* {user && <h4>{user.uid}</h4>} */}
          <h1>Alumini Connect</h1>
          <h2>GBPIET Pauri Garhwal</h2>
          <p>
            A platform to connect, network & leverage your private alumni
            network. AlmaConnect gets up news & updates of your alums and help
            you interact with alums ...
          </p>
        </div>

        <div className="login_container">
          <h1>Sign-UP</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="password"
              placeholder="Retype Password"
              value={repassword}
              onChange={(event) =>  setRepassword(event.target.value)}
            />
            {error && <p style={{ color: "#D8000C" }}>{error}</p>}
            <button type="submit" className="login-signup" onClick={createUser}>
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
