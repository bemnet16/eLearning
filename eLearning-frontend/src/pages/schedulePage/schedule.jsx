import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import classes from "./schedule.module.css";

const Schedule = () => {
  const { user } = useContext(AuthContext).authState;
  const grade_section = user.grade + user.section;
  const [regularSchedule, setRegularSchedule] = useState();
  const [specialSchedule, setSpecialSchedule] = useState();
  const [tasks, setTasks] = useState();
  const date = new Date().toString().split(" ")[0];

  useEffect(() => {
    async function fe() {
      const regularRes = await fetch(
        `http://127.0.0.1:5000/regular_schedule?grade_section=${grade_section}`
      );
      const Rdata = await regularRes.json();
      if (regularRes.status === 200) setRegularSchedule(Rdata);

      const specialRes = await fetch(
        `http://127.0.0.1:5000/special_schedule?grade_section=${grade_section}`
      );
      const Sdata = await specialRes.json();
      if (specialRes.status === 200) setSpecialSchedule(Sdata);

      const taskRes = await fetch(
        `http://127.0.0.1:5000/task?grade_section=${grade_section}`
      );
      const Tdata = await taskRes.json();
      if (taskRes.status === 200) setTasks(Tdata);
    }
    fe();
  }, [grade_section]);

  let row = [];
  if (regularSchedule) {
    for (let i in regularSchedule.schedule) {
      row.push(
        <tr className={i === date ? classes.cur : ""} key={i}>
          <th>{i}</th>
          {regularSchedule.schedule[i].map((sub, idx) => {
            return <td key={idx}>{sub}</td>;
          })}
        </tr>
      );
    }
  }

  return (
    <>
      <div className={classes.schedule}>
        <table>
          <tr>
            <th>Time</th>
            <td>2:00 - 2:40</td>
            <td>2:40 - 3:20</td>
            <td>3:20 - 4:00</td>
            <td>4:15 - 4:55</td>
            <td>4:55 - 5:35</td>
            <td>5:35 - 6:15</td>
          </tr>
          {row}
        </table>
      </div>
      <div>
        <h2>Special schedule</h2>
        {specialSchedule &&
          specialSchedule.map((sch, idx) => {
            return (
              <div key={idx}>
                <h5>
                  {sch.subject} {sch.title}
                </h5>
                <p>{sch.description}</p>
                <h6>
                  for {sch.for_student} students for date {sch.for_date}
                </h6>
              </div>
            );
          })}
      </div>
      <div>
        <h2>Tasks to do</h2>
        {tasks &&
          tasks.map((task, idx) => {
            return (
              <div key={idx}>
                <h5>
                  {task.subject} {task.title}
                </h5>
                <p>{task.description}</p>
                <h6>
                  for {task.for_student} students for date {task.for_date}
                </h6>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Schedule;
