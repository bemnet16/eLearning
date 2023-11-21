import classes from "./material.module.css";
import img from "../../assets/images/img_1.jpg";
import { useHistory } from "react-router-dom";

const MaterialCard = ({ material }) => {
  const history = useHistory();
  const seeDetail = () => {
    history.push(
      `/materials/${material._id}/${material.book ? "book" : "video"}`
    );
  };

  if (material.book) {
    return (
      <div onClick={seeDetail} className={classes.bookcard}>
        <img src={img} alt="" />
        <div className={classes.book_info}>
          <h2 className={classes.bookname}>{material.name}</h2>
          <h4 className={classes.booksubject}>{material.subject}</h4>
          <h5 className={classes.bookauthor}>{material.author}</h5>
        </div>
      </div>
    );
  }

  return (
    <div onClick={seeDetail} className={classes.videocard}>
      <img src={img} alt="" />
      <span className={classes.videoname}>{material.name}</span>
      <div className={classes.video_info}>
        <span className={classes.videosubject}>{material.subject}</span>
        <span className={classes.videoauthor}>{material.author}</span>
      </div>
    </div>
  );
};

export default MaterialCard;
