import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { database } from "../../firebase";
import "./ResearchPaper.css";

function ResearchPaper({user}) {
  // const { user } = useContext(AuthContext);
  const [researchDetail, setResearchData] = useState([]);

  useEffect(() => {
    database.users
      .doc(user.uid)
      .collection("ResearchPaperDetail")
      .onSnapshot((snapshot) => {
        setResearchData(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="researchpaper">
      {researchDetail.length > 0 ? <div className="researchpaper_heading">ResearchPaper</div> : <div></div>}

      {researchDetail.map((data) => (
        <div className="researchpaper_detail">
          <div className="researchpaper_publication_detail">
            <h3>{data.paperTitle}</h3>
            <p className="researchpaper_publishier">{data.publisherName}</p>
            <div className="researchpaper_date">
              <p>{data.date}</p>
              <p>{data.otherAuther}</p>
            </div>
          </div>

          <a href={data.paperLink}><div className="researchpaper_link">publication_url</div></a>

          <div className="researchpaper_description">
            <p>
              {data.paperDis}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// title  publishier publication_date  other_auther
// publication_url  description

export default ResearchPaper;
