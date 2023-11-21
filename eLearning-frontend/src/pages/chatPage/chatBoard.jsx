import React from "react";
import classes from "./chat.module.css";
import ChatCard from "./chatCard";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const ChatBoard = () => {
  const { authState } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const textRef = useRef();

  useEffect(() => {
    async function fe() {
      const res = await fetch(
        `http://127.0.0.1:5000/student_chat?grade=${
          authState.user ? authState.user.grade : null
        }&section=${authState.user ? authState.user.section : null}`
      );
      const data = await res.json();
      if (res.status === 200) setChats(data);
    }
    fe();
    // const interval = setInterval(async () => {
    //   console.log("inte");
    //   const res = await fetch(
    //     `http://127.0.0.1:5000/student_chat?grade=${
    //       authState.user ? authState.user.grade : null
    //     }&section=${authState.user ? authState.user.section : null}`
    //   );
    //   const data = await res.json();
    //   if (res.status === 200 && data.length !== chats.length) setChats(data);
    // }, 500);
  }, [authState.user]);

  const sendHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5000/student_chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: authState.user._id,
        grade: authState.user.grade,
        section: authState.user.section,
        text: textRef.current.value,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className={classes.chat}>
      {chats.map((chat, idx) => {
        return <ChatCard chat={chat} key={idx} />;
      })}
      <form onSubmit={sendHandler} className={classes.input}>
        <textarea name="" id="" cols="30" rows="10" ref={textRef}></textarea>
        <button>send</button>
      </form>
    </div>
  );
};

export default ChatBoard;
