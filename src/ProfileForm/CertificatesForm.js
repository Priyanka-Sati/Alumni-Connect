import React, { useState, useContext } from 'react';
import {AuthContext} from ".././Context/AuthContext";
import { auth, database } from "../firebase";
import "./CertificateForm.css"

function CertificatesForm() {

  const [certificateTitle, setCertificateTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { user } = useContext(AuthContext);

  const submitCertificateDetail = (event) => {
    event.preventDefault();

    const certificateDetail = {
      certificateTitle : certificateTitle,
      organization : organization,
      startDate : startDate,
      endDate : endDate
    }

    database.users.doc(user.uid).collection("CertificateDetails").add(certificateDetail).then(() => {
      alert("Certificate Details Updated")
      setCertificateTitle("")
      setOrganization("")
      setStartDate("")
      setEndDate("")
    })

  }

  return (
    <div className="certificateform">
      <h1>Certificates</h1>
      <form className="certificate-form">
        <div className="ctitle">
          <h3>Title</h3>
          <input type="text" placeholder="Title" value={certificateTitle} onChange={(event) => setCertificateTitle(event.target.value)} />
        </div>

        <div className="c-organization">
          <h3>Issuing Organization</h3>
          <input type="text" placeholder="Organization" value={organization} onChange={(event) => setOrganization(event.target.value)} />
        </div>

        <div className="certification-period">
          <div>
            <h3>Start Date</h3>
            <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)}></input>
          </div>

          <div>
            <h3>End Date</h3>
            <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)}></input>
          </div>
        </div>

        <button type="submit" className="pdetail-submit" onClick={submitCertificateDetail}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default CertificatesForm