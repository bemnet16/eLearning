import React from "react";
import classes from "./project.module.css";
import ProjectCard from "./projectCard";
import { useEffect } from "react";
import { useState } from "react";

const Project = () => {
  const [projects, setProjects] = useState();

  useEffect(() => {
    async function fe() {
      const res = await fetch("http://127.0.0.1:5000/project");
      const data = await res.json();
      if (res.status === 200) setProjects(data);
    }
    fe();
  }, []);

  return (
    <div className={classes.container}>
      {projects &&
        projects.map((project, idx) => {
          return <ProjectCard project={project} key={idx} />;
        })}
    </div>
  );
};

export default Project;
