import classes from "./home.module.css";
import img1 from "../../assets/images/img_1.jpg";
import img2 from "../../assets/images/img_2.png";
import img3 from "../../assets/images/img_3.png";
import { Fragment } from "react";

const Home = () => {
  return (
    <Fragment>
      <div className={classes.cover}>
        <img className={classes.img} src={img1} alt="" />
        <p className={classes.text}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem
          laudantium soluta tenetur laboriosam facilis voluptates error eveniet
          voluptate optio facere? Cupiditate veritatis voluptates quibusdam quod
          architecto vitae. Incidunt quas, eaque illum eos repellat,
          necessitatibus sunt amet distinctio at illo perspiciatis nihil
          excepturi sed iure repellendus consequatur similique soluta
          consequuntur dicta, rerum accusamus et magni.
        </p>
      </div>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.circle}>
            <img className={classes.circle__img} src={img1} alt="" />
          </div>
          <div className={classes.rect}>
            <h3 className={classes.title}>CHAT</h3>
            <p className={classes.text}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo velit similique consectetur perferendis blanditiis totam
              numquam molestias! Tenetur, dicta non?
            </p>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.circle}>
            <img className={classes.circle__img} src={img2} alt="" />
          </div>
          <div className={classes.rect}>
            <h3 className={classes.title}>MATERIAL</h3>
            <p className={classes.text}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo velit similique consectetur perferendis blanditiis totam
              numquam molestias! Tenetur, dicta non?
            </p>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.circle}>
            <img className={classes.circle__img} src={img3} alt="" />
          </div>
          <div className={classes.rect}>
            <h3 className={classes.title}>EXAM</h3>
            <p className={classes.text}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo velit similique consectetur perferendis blanditiis totam
              numquam molestias! Tenetur, dicta non?
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
