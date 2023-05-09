import { useState } from "react";
import "./benefit.css";

/* eslint-disable react/prop-types */
const Benefit = ({ benefit }) => {
  const [completed, setCompleted] = useState(false);

  function finishBenefit() {
    if (completed === false) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }
  return (
    <tr className={completed ? "done" : ""}>
      <td>{benefit.benefit}</td>
      <td>{benefit.expires}</td>
      <td>
        <input type="checkbox" onClick={() => finishBenefit()} />
      </td>
    </tr>
  );
};

export default Benefit;
