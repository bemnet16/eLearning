import React from "react";
import classes from "./chat.module.css";
import ClassMates from "./classMates";
import ChatBoard from "./chatBoard";
import ClassMateProfile from "./classMateProfile";
import { useState } from "react";

const Chat = () => {
  const [myFreindId, setMyFreindId] = useState();

  const freindIdHandle = (id) => {
    setMyFreindId(id);
  };

  return (
    <div className={classes.container}>
      <ClassMates selectFreind={freindIdHandle} />
      <ChatBoard />
      <ClassMateProfile myFreindId={myFreindId} />
    </div>
  );
};

export default Chat;
