import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { database } from "../firebase";
import "./ResearchPaperForm.css";

function ResearchPaperForm() {
  const [paperTitle, setPaperTitle] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [date, setDate] = useState("");
  const [otherAuther, setOtherAuther] = useState("");
  const [paperDis, setPaperDis] = useState("");
  const [publicationLink, setPublicationLink] = useState("");

  const { user } = useContext(AuthContext);

  const submitResearchDetail = (event) => {
    event.preventDefault();

    const paperDetail = {
      paperTitle : paperTitle,
      publisherName : publisherName,
      date : date,
      otherAuther : otherAuther,
      paperDis : paperDis,
      paperLink : publicationLink
    }

    database.users.doc(user.uid).collection("ResearchPaperDetail").add(paperDetail).then(() => {
      alert("Research Paper Details Updated")
      setPaperTitle("")
      setPublisherName("")
      setDate("")
      setOtherAuther("")
      setPaperDis("")
      setPublicationLink("")
    })

  }


  return (
    <div className="researchPaperDetail">
      <h1>Research Paper</h1>
      <form className="researchPaper-form">
        <div className="researchPaper-title">
          <h3>Title</h3>
          <input type="text" placeholder="Title" value={paperTitle} onChange={(event) => setPaperTitle(event.target.value)}/>
        </div>

        <div className="publisher-name">
          <h3>Publisher Name</h3>
          <input type="text" placeholder="Publisher Name" value={publisherName} onChange={(event) => setPublisherName(event.target.value)}/>
        </div>

        <div className="published-date">
          <h3>Date</h3>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)}></input>
        </div>

        <div className="authers-name">
          <h3>Other Auther</h3>
          <input type="text" placeholder="Auther Name" value={otherAuther} onChange={(event) => setOtherAuther(event.target.value)}
          />
        </div>

        <div className="publication-link">
          <h3>Link</h3>
          <input type="url" placeholder='Publication link' 
          value={publicationLink}
          onChange={(event) => setPublicationLink(event.target.value)}
          />
        </div>

        <div className="researchPaper-detail">
          <h3>Description</h3>
          <textarea placeholder="Describe about research paper" value={paperDis} onChange={(event) => setPaperDis(event.target.value)}></textarea>
        </div>

        <button type="submit" className="pdetail-submit" onClick={submitResearchDetail}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ResearchPaperForm;
   