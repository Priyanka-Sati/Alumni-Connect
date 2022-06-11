import React, { useContext, useState, useEffect} from "react";
import Navbar from "../Headers/Navbar";
import { AuthContext } from "../../Context/AuthContext";
import { Avatar } from "@material-ui/core";
import { database } from "../../firebase";
import firebase from "firebase/compat/app";
import "./Chat.css";

function Chat() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const [userConn, setUserConn] = useState([]);
  const [messg, setMessg] = useState("");
  const [usermessg, setUserMessg] = useState([]);
  const [curruser, setCurrentUser] = useState("");

  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
    return () => {
      unsub();
    };
  }, [user]);

  useEffect(() => {
    database.users
      .doc(user.uid)
      .collection("ConnectionUserIds")
      .onSnapshot((snapshot) => {
        // console.log(snapshot)
        setUserConn(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const fetchChat = (data) => {
    // console.log(data);
    setCurrentUser(data);
    database.users
      .doc(user.uid)
      .collection("ChatRoom")
      .doc(data.id)
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        //   console.log(snapshot)
        setUserMessg(snapshot.docs.map((doc) => doc.data()));
      });
    console.log(usermessg);
  };

  const sendMessg = (event) => {
    event.preventDefault();
    // console.log("messg send");
    // console.log(user.uid);
    // console.log(curruser.id);

    database.users
      .doc(user.uid)
      .collection("ChatRoom")
      .doc(curruser.id)
      .collection("messages")
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        messg: messg,
        user: user.uid,
      });

    database.users
      .doc(curruser.id)
      .collection("ChatRoom")
      .doc(user.uid)
      .collection("messages")
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        messg: messg,
        user: user.uid,
      });

      setMessg("")
  };

  console.log(user.uid);
    console.log(curruser.id);

  return (
    <div className="chat">
      <Navbar userData={userData} />
      <div className="chat_container">
        <div className="chat_connection_container">
          {userConn.map((data) => (
            <div
              className="chat_conn"
              onClick={() => fetchChat(data)}
              key={data.id}
            >
              <div className="chat_conn_avatar">
                <Avatar alt="shubham" src="" />
              </div>
              <h4 className="chat_conn_name">{data.username}</h4>
            </div>
          ))}
        </div>

        <div className="chat_messg_container">
          <div className="chat_messg">
            {usermessg.map((data) => (
              <div>
                {data.user == user.uid ? (
                  <div className="my_messg">{data.messg}</div>
                ) : <div className="other_messg">{data.messg}</div>}
              </div>
            ))}
          </div>

          <div className="chat_messg_input">
            <form className="chat_messg_form">
              <input
                className="chat_input"
                type="text"
                placeholder="Type Message"
                value={messg}
                onChange={(e) => setMessg(e.target.value)}
              />

              <button
                className="chat_button"
                disabled={!messg && !curruser}
                type="submit"
                onClick={sendMessg}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
