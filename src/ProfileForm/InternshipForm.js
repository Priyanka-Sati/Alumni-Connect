import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { database } from "../firebase";
import "./InternshipForm.css";

function InternshipForm() {

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [internshipDis, setInternshipDis] = useState("");
  const {user} = useContext(AuthContext);

  const submitInternshipDis = (event) =>{
    event.preventDefault();

    const internshipDiscription = {
      title : title,
      company : company,
      location : location,
      startDate : startDate,
      endDate : endDate,
      internshipDis : internshipDis
    }

    database.users.doc(user.uid).collection("InternshipDis").add(internshipDiscription).then(() => {
      alert("Internship Details Updated")
      setTitle("")
      setCompany("")
      setLocation("")
      setStartDate("")
      setEndDate("")
      setInternshipDis("")
    })

  }

  return (
    <div className="internshipDetail">
      <h1>Internships</h1>
      <form className="pform">
        <div className="interndhip-title">
          <h3>Title</h3>
          <input type="text" placeholder="Title"
          value = {title}
          onChange={(event) => setTitle(event.target.value)}  
          />
        </div>

        <div className="company-name">
          <h3>Company Name</h3>
          <input type="text" placeholder="Company" 
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          />
        </div>

        <div className="location">
          <h3>Location</h3>
          <input type="text" placeholder="Location" 
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>

        <div className="intership-period">
          <div>
            <h3>Start Date</h3>
            <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)}></input>
          </div>

          <div>
            <h3>End Date</h3>
            <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)}></input>
          </div>
        </div>

        <div className="internship-detail">
          <h3>Description</h3>
          <textarea value={internshipDis} onChange={(event) => setInternshipDis(event.target.value)}></textarea>
        </div>

        <button type="submit" className="pdetail-submit" onClick={submitInternshipDis}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default InternshipForm;
