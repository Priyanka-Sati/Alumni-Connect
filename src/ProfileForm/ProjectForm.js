import React, { useState, useContext } from 'react';
import {AuthContext} from ".././Context/AuthContext";
import { auth, database } from "../firebase";
import "./ProjectForm.css";

function ProjectForm() {

  const [projectName, setProjectName] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const { user } = useContext(AuthContext);

  const submitProjectDetail = (event) => {
    event.preventDefault();

    const projectD = {
      projectName : projectName,
      projectDetail : projectDetail,
      projectLink : projectLink
    }    

    database.users.doc(user.uid).collection("ProjectsDetail").add(projectD).then(() => {
      alert("Projects Details Updated")
      setProjectDetail("")
      setProjectName("")
      setProjectLink("")
    })

  }

  return (
    <div className="projectdetailform">
      <h1>Projects</h1>
      <form className="project-form">
        <div className="project-name">
            <h3>Project Name</h3>
            <input type="text" placeholder="Project Name"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            />
        </div>

        <div className="project-description">
          <h3>Description</h3>
          <textarea placeholder='Write about your project'
          value={projectDetail}
          onChange={(event) => setProjectDetail(event.target.value)}
          ></textarea>
        </div>

        <div className="project-link">
          <h3>Link</h3>
          <input type="url" placeholder='Project link' 
          value={projectLink}
          onChange={(event) => setProjectLink(event.target.value)}
          />
        </div>
        
        <button type="submit" className="pdetail-submit"
        onClick={submitProjectDetail}
        >
          Submit
        </button>
      </form>

      

    </div>
  )
}

export default ProjectForm