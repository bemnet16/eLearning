import { useParams } from "react-router-dom";
import Comment from "../../../components/comment/comment";
import classes from "./materilaDetail.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../../contexts/authContext";
import { useRef } from "react";

const MaterilaDetail = () => {
  const { materialId, materialType } = useParams();
  const [material, setMaterial] = useState([]);
  const comment = useRef();
  const { _id } = useContext(AuthContext).authState.user;
  useEffect(() => {
    async function fe() {
      const res = await fetch(
        `http://127.0.0.1:5000/${materialType}/${materialId}`
      );
      const data = await res.json();
      if (res.status === 200) setMaterial(data);
    }
    fe();
  }, [materialId, materialType]);

  const sendHandle = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://127.0.0.1:5000/${materialType}/${materialId}/comment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, comment: comment.current.value }),
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      console.log(comment);
      comment.current.value = "";
      setMaterial(data);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.materilacon}>
        <div className={classes.materila_info}>
          <span className={classes.name}>{material.name}</span>
          <span className={classes.subject}>{material.subject}</span>
          <span className={classes.author}>{material.author}</span>
        </div>
        <div className={classes.content}>
          <p>{material[materialType]}</p>
        </div>
      </div>
      <div className={classes.comment}>
        <Comment
          comments={material.comments ? material.comments : {}}
          key={materialId}
        />
        <form onSubmit={sendHandle} className={classes.input}>
          <textarea
            ref={comment}
            name="comment"
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <button>send</button>
        </form>
      </div>
    </div>
  );
};

export default MaterilaDetail;
