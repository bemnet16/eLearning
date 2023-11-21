import React from "react";
import classes from "./chat.module.css";
import img from "../../assets/images/img_1.jpg";

const ClassMateCard = ({ classMate, selectFreind }) => {
  const selectMyFreind = () => {
    selectFreind(classMate._id);
  };
  return (
    <div onClick={selectMyFreind} className={classes.student}>
      <img className={classes.img} src={img} alt="" />
      <div>
        <h4 style={{ margin: "0" }}>
          {classMate.firstname} {classMate.lastname}
        </h4>
        <h6 style={{ margin: "0" }}>{classMate.email}</h6>
      </div>
    </div>
  );
};

export default ClassMateCard;
