import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import classes from "./projectDetail.module.css";
import { useState } from "react";
import img1 from "../../../assets/images/img_1.jpg";
import { useEffect } from "react";
import DetailCard from "./detailCard";
import ChatCard from "../../chatPage/chatCard";

import classess from "../../chatPage/chat.module.css";
import { useContext } from "react";
import { useRef } from "react";
import AuthContext from "../../../contexts/authContext";

const ProjectDetail = () => {
  const { authState } = useContext(AuthContext);
  const textRef = useRef();

  const { projectId } = useParams();
  const [project, setProject] = useState();
  const [projectReport, setProjectReport] = useState();
  const [projectChat, setProjectChat] = useState();
  const [isReport, setIsReport] = useState(true);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    async function fe() {
      const res = await fetch(`http://127.0.0.1:5000/project/${projectId}`);
      const data = await res.json();
      if (res.status === 200) setProject(data);

      const report = await fetch(
        `http://127.0.0.1:5000/project_report/${projectId}`
      );
      const Rdata = await report.json();
      if (report.status === 200) setProjectReport(Rdata);

      const chat = await fetch(
        `http://127.0.0.1:5000/project_chat/${projectId}`
      );

      const Cdata = await chat.json();
      if (chat.status === 200) setProjectChat(Cdata);
    }
    fe();
  }, [projectId]);

  const sendHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5000/project_chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        participantId: authState.user._id,
        participantRole: "student",
        text: textRef.current.value,
      }),
    });
    // const data = await res.json();
    if (res.status === 201) setUpdate(!update);
  };

  return (
    <>
      {project && (
        <div className={classes.project}>
          <h2>{project.title}</h2>
          <img className={classes.img} src={img1} alt="" />
          <p className={classes.text}>
            {project.description}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem
            laudantium soluta tenetur laboriosam facilis voluptates error
            eveniet voluptate optio facere? Cupiditate veritatis voluptates
            quibusdam quod architecto vitae. Incidunt quas, eaque illum eos
            repellat, necessitatibus sunt amet distinctio at illo perspiciatis
            nihil excepturi sed iure repellendus consequatur similique soluta
            consequuntur dicta, rerum accusamus et magni.
          </p>
        </div>
      )}
      <button onClick={() => setIsReport(!isReport)}>
        {isReport ? "Chat" : "Report"}
      </button>
      <div className={classes.project}>
        {isReport &&
          projectReport &&
          projectReport.map((rep, idx) => {
            return <DetailCard report={rep} key={idx} />;
          })}
      </div>

      {!isReport && (
        <div className={classess.chat}>
          {projectChat &&
            projectChat.map((chat, idx) => {
              return <ChatCard chat={chat} key={idx} />;
            })}
          <form onSubmit={sendHandler} className={classess.input}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              ref={textRef}
            ></textarea>
            <button>send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
