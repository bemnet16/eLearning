import { useRef } from "react";
import classes from "./material.module.css";

const FilterMaterial = ({ filter }) => {
  const typeRef = useRef();
  const nameRef = useRef();
  const subRef = useRef();

  const filterHandler = (e) => {
    e.preventDefault();
    filter({
      type: typeRef.current.value,
      name: nameRef.current.value,
      subject: subRef.current.value,
    });
  };

  return (
    <>
      <h3>Filter Materials</h3>
      <form onSubmit={filterHandler}>
        <div className={classes.options}>
          <label htmlFor="type">Material Type: </label>
          <select ref={typeRef} name="type" id="type">
            <option value="">All</option>
            <option value="book"> Book</option>
            <option value="video"> Video</option>
          </select>
        </div>
        <div className={classes.options}>
          <label htmlFor="name">Material Name: </label>
          <select ref={nameRef} name="name" id="name">
            <option value="">All</option>
            <option value="Student ">Student Book</option>
            <option value="Extem Book">Extra Book</option>
          </select>
        </div>
        <div className={classes.options}>
          <label htmlFor="subject">Material Subject: </label>
          <select ref={subRef} name="subject" id="subject">
            <option value="">All</option>
            <option value="maths">Maths</option>
            <option value="english">English</option>
          </select>
        </div>
        <button>Filter</button>
      </form>
    </>
  );
};

export default FilterMaterial;
