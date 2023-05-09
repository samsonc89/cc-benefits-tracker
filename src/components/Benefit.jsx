import { useState } from "react";
import "./benefit.css";

/* eslint-disable react/prop-types */
const Benefit = ({ benefit }) => {
  const [status, setStatus] = useState(false);

  function finishBenefit() {
    if (status === false) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }
  return (
    <tr className={status ? "done" : ""}>
      <td>{benefit.benefit}</td>
      <td>{benefit.expires}</td>
      <td>
        <input type="checkbox" onClick={() => finishBenefit()} />
      </td>
    </tr>
  );
};

export default Benefit;
