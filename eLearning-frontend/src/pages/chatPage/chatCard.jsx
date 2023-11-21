import img from "../../assets/images/img_1.jpg";
import React, { useContext } from "react";
import classes from "./chat.module.css";
import AuthContext from "../../contexts/authContext";
import { useState } from "react";
import { useEffect } from "react";

const ChatCard = ({ chat: propChat }) => {
  const [user, setUser] = useState();
  const [chat, setChat] = useState(propChat);
  const { authState } = useContext(AuthContext);
  const identify = chat.userId === authState.user._id ? "my" : "chat";
  const [likeDis, setLikeDis] = useState({ like: 0, dislike: 0, me: null });

  useEffect(() => {
    async function fe() {
      const res = await fetch(
        `http://127.0.0.1:5000/student/info/${chat.userId}`
      );
      const data = await res.json();
      if (res.status === 200) setUser(data);
    }
    fe();

    let like = 0;
    let dislike = 0;
    let me = null;
    for (let i in chat.likes) {
      if (i === authState.user._id) me = chat.likes[i];
      if (chat.likes[i]) {
        like++;
      } else {
        dislike++;
      }
    }
    setLikeDis({ like, dislike, me });
  }, [chat]);

  const likeChat = async () => {
    const res = await fetch(
      `http://127.0.0.1:5000/student_chat/${chat._id}/like`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: authState.user._id }),
      }
    );
    const data = await res.json();
    if (res.status === 201) setChat(data);
  };
  const disLikeChat = async () => {
    const res = await fetch(
      `http://127.0.0.1:5000/student_chat/${chat._id}/dislike`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: authState.user._id }),
      }
    );
    const data = await res.json();
    if (res.status === 201) setChat(data);
  };

  return (
    <>
      <div className={classes[`${identify}_con`]}>
        <img className={classes[`${identify}_img`]} src={img} alt="" />
        <div className={classes[`${identify}_text--con`]}>
          <p className={classes.chat_text}>{chat.text}</p>
          <h4 className={classes[`${identify}_name`]}>
            {user ? user.firstname : ""}
          </h4>
        </div>
        <div className={classes[`${identify}_reaction`]}>
          <button
            onClick={likeChat}
            style={{ backgroundColor: likeDis.me ? "green" : "#fff" }}
          >
            {likeDis.like} like
          </button>
          <button
            onClick={disLikeChat}
            style={{ backgroundColor: likeDis.me === false ? "red" : "#fff" }}
          >
            {likeDis.dislike} disL
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatCard;
