import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { database } from "../../firebase";
import "./Projects.css";
    
function Projects({user}) {
  // const { user } = useContext(AuthContext);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    database.users
      .doc(user.uid)
      .collection("ProjectsDetail")
      .onSnapshot((snapshot) => {
        // console.log(snapshot)
        setProjectData(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
   
  // console.log(projectData);

  return (
    <div className="project">
      {projectData.length > 0 ? <div className="project_heading">Projects</div> : <div></div>}

      {projectData.map((data ) => (
        <div className="project_detail">
          <h3>{data.projectName}</h3>
          <p>
            {data.projectDetail}
          </p>
          <a href={data.projectLink}><div className="project_link">Project Link</div></a>
        </div>
      ))}
    </div>
  );
}

export default Projects;
