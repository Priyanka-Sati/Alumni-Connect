import React, { useState, useContext, useEffect, useRef } from "react";
import "./ConnectionsUI.css";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { database } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import firebase from "firebase/compat/app";

function ConnectionsUI({ userArr, buttonValue, userData }) {
  const [friendData, setFriendData] = useState({});
  const [fID, setfID] = useState();
  const { user } = useContext(AuthContext);
  const firstUpdate = useRef(false);
  const addfn = useRef(false);
  const acceptfn = useRef(false);

  const handleAdd = (friendID) => {
    setfID(friendID);
    addfn.current = true;
    database.users.doc(friendID).onSnapshot((snapshot) => {
      setFriendData({ id: friendID, username: snapshot.data().username });
    });
  };

  const handleRemoveSent = (friendID) => {
    database.users
      .doc(user.uid)
      .collection("SentUserIds")
      .doc(friendID)
      .delete()
      .then(
        database.users
          .doc(friendID)
          .collection("RequestUserIds")
          .doc(user.uid)
          .delete()
      )
      .catch((error) => {
        alert("Error removing document: ", error);
      });
  };

  const handleRemoveConnection = (friendID) => {
    database.users
      .doc(user.uid)
      .collection("ConnectionUserIds")
      .doc(friendID)
      .delete()
      .then(
        database.users
          .doc(friendID)
          .collection("ConnectionUserIds")
          .doc(user.uid)
          .delete()
      )
      .catch((error) => {
        alert("Error removing document: ", error);
      });
  };

  const handleRemoveRequest = (friendID) => {
    database.users
      .doc(user.uid)
      .collection("RequestUserIds")
      .doc(friendID)
      .delete()
      .then(
        database.users
          .doc(friendID)
          .collection("SentUserIds")
          .doc(user.uid)
          .delete()
      )
      .catch((error) => {
        alert("Error removing document: ", error);
      });
  };

  const handleAccept = (friendID) => {
    setfID(friendID);
    acceptfn.current = true;
    database.users.doc(friendID).onSnapshot((snapshot) => {
      setFriendData({ id: friendID, username: snapshot.data().username });
      console.log(snapshot.data());
    });

    database.users
      .doc(friendID)
      .collection("SentUserIds")
      .doc(user.uid)
      .delete();

    database.users
      .doc(user.uid)
      .collection("RequestUserIds")
      .doc(friendID)
      .delete();
  };

  useEffect(() => {
    if (firstUpdate.current && addfn.current) {
      database.users
        .doc(user.uid)
        .collection("SentUserIds")
        .doc(fID)
        .set({
          id: fID,
          username: friendData.username,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(
          database.users
            .doc(fID)
            .collection("RequestUserIds")
            .doc(user.uid)
            .set({
              id: user.uid,
              username: userData.username,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        );
      addfn.current = false;
    }

    if (firstUpdate.current && acceptfn.current) {
      database.users
        .doc(user.uid)
        .collection("ConnectionUserIds")
        .doc(fID)
        .set({
          id: fID,
          username: friendData.username,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(
          database.users
            .doc(fID)
            .collection("ConnectionUserIds")
            .doc(user.uid)
            .set({
              id: user.uid,
              username: userData.username,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        );
      acceptfn.current = false;
    }

    firstUpdate.current = true;
  }, [friendData]);

  return (
    <div>
      {userArr.map(({ id, data }) => (
        <div key={id} className="connectionui_container">
          <div className="connectionui_container1">
            <Avatar
              className="postcard_avatar"
              alt={data.username}
              src="/static/images/avatar/1.jpg"
            />
            <h3>{data.username}</h3>
          </div>

          {buttonValue === "Add" && (
            <div
              className="connectionui_container2"
              onClick={() => handleAdd(id)}
            >
              <PersonAddIcon className="personicon" />
              <h3>Add</h3>
            </div>
          )}

          {buttonValue === "MyConnections" && (
            <div
              className="connectionui_container2"
              onClick={() => handleRemoveConnection(id)}
            >
              <PersonAddIcon className="personicon" />
              <h3>Remove</h3>
            </div>
          )}

          {buttonValue === "Sent" && (
            <div
              className="connectionui_container2"
              onClick={() => handleRemoveSent(id)}
            >
              <PersonAddIcon className="personicon" />
              <h3>Cancel</h3>
            </div>
          )}

          {buttonValue === "Request" && (
            <div className="connectionui_request">
              <div
                className="connectionui_container2"
                onClick={() => handleRemoveRequest(id)}
              >
                <PersonAddIcon className="personicon" />
                <h3>Cancel</h3>
              </div>
              <div
                className="connectionui_container2"
                onClick={() => handleAccept(id)}
              >
                <PersonAddIcon className="personicon" />
                <h3>Accept</h3>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ConnectionsUI;
