import React from "react";
import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../../../contexts/authContext";

const DetailCard = ({ report: rep }) => {
  let like = 0;
  let disLike = 0;

  const auth = useContext(AuthContext);
  const user = auth.authState.user;
  const [report, setReport] = useState(rep);

  for (let i in report.likes) {
    if (report.likes[i]) like++;
    else disLike++;
  }

  const likeReport = async () => {
    const res = await fetch(
      `http://127.0.0.1:5000/project_report/${report._id}/like`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: user._id }),
      }
    );
    const data = await res.json();
    if (res.status === 201) setReport(data);
  };

  const disLikeReport = async () => {
    const res = await fetch(
      `http://127.0.0.1:5000/project_report/${report._id}/dislike`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: user._id }),
      }
    );
    const data = await res.json();
    if (res.status === 201) setReport(data);
  };

  return (
    <div>
      <h5>{report.title}</h5>
      <img src="" alt={report.images} />
      <p>{report.description}</p>
      <div>
        <button onClick={likeReport}>{like} Like</button>
        <button onClick={disLikeReport}>{disLike} disLike</button>
      </div>
    </div>
  );
};

export default DetailCard;
