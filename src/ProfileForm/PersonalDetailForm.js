import React, { useState, useContext } from "react";
import "./PersonalDetailForm.css";
import {AuthContext} from ".././Context/AuthContext";
import { auth, database } from "../firebase";


function PersonalDetailForm() {
  const [fname, setUserFname] = useState("");
  const [lname, setUserLname] = useState("");
  const [branch, setUserBranch] = useState("");
  const [year, setUserYear] = useState("");
  const [session, setUserSession] = useState("");
  const [dob, setUserDOB] = useState("");
  const [address, setUserAddress] = useState("");
  const [about, setUserAbout] = useState("");
  const [websites, setUserWebsites] = useState("");
  const { user } = useContext(AuthContext);

  const submitDetail = (event) => {
    event.preventDefault();

    const Pdata = {   
        username: fname +" "+ lname,
        branch : branch,
        year : year,
        session : session,
        dateOfBirth : dob,
        address : address,
        about : about,
        websites : websites,
    }
    
    database.users.doc(user.uid).update(Pdata).then(() => {
      alert("Personal Details Updated")
      setUserFname("");
      setUserLname("");
      setUserBranch("");
      setUserYear("");
      setUserSession("");
      setUserDOB("");
      setUserAddress("");
      setUserAbout("");
      setUserWebsites("");
    });

  }

   

  return (
    <div className="personaldetailform">
      <h1>Personal Details</h1>
      <form className="pform">
        <div className="name-field">
          <div className="fname">
            <h3>First Name</h3>
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(event) => setUserFname(event.target.value)}
            />
          </div>

          <div className="lname">
            <h3>Last Name</h3>
            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(event) => setUserLname(event.target.value)}
            />
          </div>
        </div>

        <div className="branch-div">
          <h3>Branch</h3>
          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(event) => setUserBranch(event.target.value)}
          />
        </div>

        <div className="year-session">
          <div className="year">
            <h3>Year</h3>
            <input
              type="number"
              value={year}
              onChange={(event) => setUserYear(event.target.value)}
            ></input>
          </div>
          <div className="session">
            <h3>Session</h3>
            <input
              type="text"
              placeholder="Session"
              value={session}
              onChange={(event) => setUserSession(event.target.value)}
            />
          </div>
        </div>

        <div className="dob">
          <h3>Date of Birth</h3>
          <input
            type="date"
            value={dob}
            onChange={(event) => setUserDOB(event.target.value)}
          ></input>
        </div>

        <div className="address">
          <h3>Address</h3>
          <input
            type="textarea"
            placeholder="Address"
            value={address}
            onChange={(event) => setUserAddress(event.target.value)}
          />
        </div>

        <div className="about">
          <h3>About</h3>
          <textarea
            value={about}
            onChange={(event) => setUserAbout(event.target.value)}
          ></textarea>
        </div>

        <div className="website">
          <h3>Websites</h3>
          <input
            type="url"
            value={websites}
            onChange={(event) => setUserWebsites(event.target.value)}
          />
        </div>

        <button type="submit" className="pdetail-submit" onClick={submitDetail}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default PersonalDetailForm;
