import classes from "./comment.module.css";
import img from "../../assets/images/img_1.jpg";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { useEffect } from "react";
import { useState } from "react";

const CommentCard = ({ comment, userId }) => {
  const { _id } = useContext(AuthContext).authState.user;
  const [user, setUser] = useState({});
  const isMyComment = _id === userId ? "my" : "user";
  // console.log(isMyComment);

  useEffect(() => {
    async function fe() {
      const res = await fetch(`http://127.0.0.1:5000/student/info/${userId}`);
      const data = await res.json();
      if (res.status === 200) setUser(data);
    }
    fe();
  }, [userId]);
  return (
    <>
      <div className={classes[`comment_con`]}>
        <img className={classes[`comment_img`]} src={img} alt="" />
        <div className={classes[`comment_text--con`]}>
          <p className={classes.comment_text}>{comment}</p>
          <h4 className={classes[`comment_name`]}>
            {user.firstname} {user.lastname}
          </h4>
        </div>
      </div>
      {/* <div className={classes.my_con}>
        <img className={classes.my_img} src={img} alt="" />
        <div className={classes["my_text--con"]}>
          <p className={classes.comment_text}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            molestias pariatur dolores ad, minus aliquam provident dolore,
            quaerat aut veritatis sequi dolor? Omnis expedita beatae eaque
            debitis cupiditate necessitatibus maiores repellendus, ipsam
            doloribus id unde aspernatur perspiciatis eum molestiae veniam quod,
            deserunt quia in quaerat! Aspernatur impedit voluptates molestias
            sed! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Suscipit pariatur labore officia similique perspiciatis reiciendis
            deleniti optio obcaecati cumque, in, error, quibusdam vitae a
            provident nulla vero iste eum earum consequuntur. Odio itaque eos
            assumenda. Ab, sint vitae, modi distinctio, inventore omnis voluptas
            ex in ad ullam illum minus architecto commodi! Cum, nisi nam
            perferendis porro quas corporis officia natus inventore dolores
            repellat, tempore animi? Maiores corporis impedit voluptate quos.
          </p>
          <h4 className={classes.my_name}>User Name</h4>
        </div>
      </div> */}
    </>
  );
};

export default CommentCard;
