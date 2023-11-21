import classes from "./comment.module.css";
import CommentCard from "./commentCard";

const Comment = ({ comments }) => {
  // const sendHandler = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className={classes.comment}>
      {Object.keys(comments).map((_id, idx) => {
        return <CommentCard comment={comments[_id]} userId={_id} key={idx} />;
      })}
      {/* {temp.map((ch, idx) => {
        return <CommentCard ch={ch} key={idx} />;
      })} */}
      {/* <form onSubmit={sendHandler} className={classes.input}>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button>send</button>
      </form> */}
    </div>
  );
};

export default Comment;
