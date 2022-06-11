import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { database } from "../../firebase";
import "./Certificates.css";
     
function Certificates({user}) {
  // const { user } = useContext(AuthContext);
  const [certificateData, setcertificateData] = useState([]);

  useEffect(() => {
    database.users
      .doc(user.uid)
      .collection("CertificateDetails")
      .onSnapshot((snapshot) => {
        // console.log(snapshot)
        setcertificateData(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="certificate">
      {certificateData.length > 0 ? <div className="certificate_heading">Certificates</div> : <div></div>}
      {certificateData.map((data) => (
        <div className="certificate_details">
          <h3>{data.certificateTitle}</h3>
          <p className="certificate_issuing_org">{data.organization}</p>
          <p className="certificate_date">
            {data.startDate} - {data.endDate}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Certificates;
