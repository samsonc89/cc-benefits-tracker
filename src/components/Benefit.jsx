// import { useState, useEffect } from "react";
import "./benefit.css";

/* eslint-disable react/prop-types */
const Benefit = ({ benefit, onChange, state }) => {
  // const [completed, setCompleted] = useState(() => {
  //   const parsedCompleted = JSON.parse(localStorage.getItem("completed"));
  //   return parsedCompleted || benefit.status;
  // });

  // useEffect(() => {
  //   localStorage.setItem("completed", JSON.stringify(completed));
  // }, [completed]);

  // function finishBenefit(e) {
  //   setCompleted(!completed);

  //   console.log(completed);
  //   console.log(e.target.id);

  //   benefit.status = !benefit.status;
  // }
  return (
    <tr className={state ? "done" : ""}>
      <td>{benefit.benefit}</td>
      <td>{benefit.expires}</td>
      <td>
        <input
          type="checkbox"
          defaultChecked={benefit.status}
          // onChange={(e) => onChange(e)}
        />
      </td>
    </tr>
  );
};

export default Benefit;
