import React from "react";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import classes from "./project.module.css";
import img1 from "../../assets/images/img_1.jpg";
import { useHistory } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const { user } = useContext(AuthContext).authState;
  const history = useHistory();
  const paritcipate = project.participants[user._id];

  const onParticipate = async () => {
    if (paritcipate === undefined) {
      const res = await fetch(
        `http://127.0.0.1:5000/project/${project._id}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: user._id }),
        }
      );
      const data = await res.json();
      if (res.status === 201 || res.status === 203) console.log(data);
    }

    history.push(`/project/${project._id}`);
  };
  return (
    <div className={classes.project}>
      <h2>{project.title}</h2>
      <img className={classes.img} src={img1} alt="" />
      <p className={classes.text}>
        {project.description}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem
        laudantium soluta tenetur laboriosam facilis voluptates error eveniet
        voluptate optio facere? Cupiditate veritatis voluptates quibusdam quod
        architecto vitae. Incidunt quas, eaque illum eos repellat,
        necessitatibus sunt amet distinctio at illo perspiciatis nihil excepturi
        sed iure repellendus consequatur similique soluta consequuntur dicta,
        rerum accusamus et magni.
      </p>
      <button
        disabled={paritcipate === false}
        onClick={onParticipate}
        className={classes.participate}
      >
        {paritcipate === undefined
          ? "participate"
          : paritcipate === false
          ? "you can't login again"
          : "login"}
      </button>
    </div>
  );
};

export default ProjectCard;
