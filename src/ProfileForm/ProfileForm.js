import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import CertificatesForm from './CertificatesForm';
import InternshipForm from './InternshipForm';
import PersonalDetailForm from "./PersonalDetailForm"
import "./ProfileForm.css";
import ProjectForm from './ProjectForm';
import ResearchPaperForm from './ResearchPaperForm';
import Navbar from '../Components/Headers/Navbar';
import { AuthContext } from "../Context/AuthContext";
import { database } from "../firebase";

function ProfileForm() {
    const [active, setActive] = useState("personaldetail");
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
    }

  return (
    <div className='profileform'>
      <Navbar userData={userData} />
        <div className="profilefome_menu">
          <div  onClick= {() => handleChange("personaldetail") }> Personal detail</div>   

          <div  onClick= {() => handleChange("projectform") }>Project</div>

          <div  onClick= {() => handleChange("internshipform") }>Internship</div>

          <div  onClick= {() => handleChange("ressearchpaper") }>Research Paper</div>

          <div  onClick= {() => handleChange("certificateform") }>Certificates</div>
        </div>

        <div className="profileform_field">
          {active === "personaldetail" && <PersonalDetailForm />}

          {active === "projectform" && <ProjectForm />}

          {active === "internshipform" && <InternshipForm  />}

          {active === "ressearchpaper" && <ResearchPaperForm  />}

          {active === "certificateform" && <CertificatesForm  />}
        </div>
    </div>
  )
}

export default ProfileForm