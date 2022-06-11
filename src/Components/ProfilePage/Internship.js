import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { database } from "../../firebase";
import "./Internship.css";

function Internship({user}) {
  // const { user } = useContext(AuthContext);
  const [internshipData, setinternshipData] = useState([]);

  useEffect(() => {
    database.users
      .doc(user.uid)
      .collection("InternshipDis")
      .onSnapshot((snapshot) => {
        // console.log(snapshot)
        setinternshipData(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="internship">
      {internshipData.length > 0 ? <div className="internship_heading">Internship</div> : <div></div>}

      {internshipData.map((data) => (
        <div className="internship_detail">
          <div className="internship_company_detail">
            <h3>{data.title}</h3>
            <p className="internship_company">{data.company}. · Internship</p>
            <div className="internship_date">
              <p>
                {data.startDate} - {data.endDate}
              </p>
              <p>{data.location}</p>
            </div>
          </div>

          <div className="internship_explain">
            <p>{data.internshipDis}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Internship;
