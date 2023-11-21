import React from "react";
import classes from "./chat.module.css";
import img from "../../assets/images/img_1.jpg";
import { useState } from "react";
import { useEffect } from "react";

const ClassMateProfile = ({ myFreindId }) => {
  const [profile, setProfile] = useState();
  const [freChats, setFreChats] = useState([]);

  useEffect(() => {
    async function fe() {
      const res = await fetch(
        `http://127.0.0.1:5000/student/info/${myFreindId}`
      );
      const data = await res.json();
      if (res.status === 200) setProfile(data);

      const chatres = await fetch(
        `http://127.0.0.1:5000/student_chat/${myFreindId}`
      );
      const chats = await chatres.json();
      if (chatres.status === 200) setFreChats(chats);
    }

    fe();
  }, [myFreindId]);

  const fre_chats =
    freChats.length > 0
      ? freChats.map((chat, idx) => {
          return (
            <p className={classes.freind_text} key={idx}>
              {chat.text}
            </p>
          );
        })
      : [
          <h3 style={{ color: "orange" }}>
            There is no Chat from {profile ? profile.firstname : ""}
          </h3>,
        ];

  if (!profile) return <div className={classes.myfreind}></div>;

  return (
    <div className={classes.myfreind}>
      <img src={img} alt="" />
      <h2>
        {profile.firstname} {profile.lastname}
      </h2>
      <h3>{profile.email}</h3>
      <h4>Rank {profile.rank}</h4>
      <h5>
        grade : {profile.grade}
        {profile.section}
      </h5>
      <p>
        BIO
        <span style={{ fontStyle: "italic" }}>
          " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
          non commodi eum, libero tempore corporis."
        </span>
      </p>

      <div>{fre_chats}</div>
    </div>
  );
};

export default ClassMateProfile;
