import React from "react";
import classes from "./chat.module.css";
import ClassMateCard from "./classMateCard";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";

const ClassMates = ({ selectFreind }) => {
  const { authState } = useContext(AuthContext);

  const [classMates, setClassMates] = useState([]);
  useEffect(() => {
    async function fe() {
      if (authState.user !== null) {
        const res = await fetch(
          `http://127.0.0.1:5000/student?grade=${
            authState.user ? authState.user.grade : null
          }&section=${authState.user ? authState.user.section : null}`
        );
        const data = await res.json();
        setClassMates(data);
      }
    }
    fe();
  }, [authState.user]);
  return (
    <div className={classes.students}>
      s<h2>My ClassMates</h2>
      {classMates.map((classMate, idx) => {
        return (
          <ClassMateCard
            classMate={classMate}
            selectFreind={selectFreind}
            key={idx}
          />
        );
      })}
    </div>
  );
};

export default ClassMates;
