import { useState } from "react";
import FilterMaterial from "./filterMaterial";
import classes from "./material.module.css";
import MaterialCard from "./materialCard";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";

const Material = () => {
  const { authState } = useContext(AuthContext);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    async function fe() {
      const bookRes = await fetch(
        `http://127.0.0.1:5000/book?grade=${
          authState.user ? authState.user.grade : null
        }`
      );
      let bookData;
      if (bookRes.status === 200) bookData = await bookRes.json();

      const videoRes = await fetch(
        `http://127.0.0.1:5000/video?grade=${
          authState.user ? authState.user.grade : null
        }`
      );
      let videoData;
      if (videoRes.status === 200) videoData = await videoRes.json();

      setMaterials((pre) => {
        return [...bookData, ...videoData];
      });
      setRawMaterials((pre) => {
        return [...bookData, ...videoData];
      });
    }
    fe();
  }, [authState.user]);

  const filter = (filterby) => {
    const filterd = rawMaterials.filter(
      (material) =>
        material[filterby.type] &&
        material.name.includes(filterby.name) &&
        material.subject.includes(filterby.subject)
    );
    setMaterials(filterd);
  };

  const searchHandler = (e) => {
    const filterby = e.target.value;
    const filterd = rawMaterials.filter(
      (material) =>
        material[filterby] ||
        material.name.includes(filterby) ||
        material.subject.includes(filterby)
    );
    setMaterials(filterd);
  };

  return (
    <div className={classes.materials}>
      <div className={classes.filtercon}>
        <FilterMaterial filter={filter} />
      </div>
      <div className={classes.materialcon}>
        <input
          onChange={searchHandler}
          className={classes.search}
          type="text"
        />
        <span className={classes.searchtext}>Search</span>
        {materials.map((material, idx) => {
          return <MaterialCard material={material} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default Material;
