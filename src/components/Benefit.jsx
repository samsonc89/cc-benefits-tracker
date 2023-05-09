import { useState } from "react";
import "./benefit.css";

/* eslint-disable react/prop-types */
const Benefit = ({ benefit }) => {
  const [status, setStatus] = useState("");

  function finishBenefit() {
    if (status === "") {
      setStatus("done");
    } else {
      setStatus("");
    }
  }
  return (
    <tr className={status}>
      <td>{benefit.benefit}</td>
      <td>{benefit.expires}</td>
      <td>
        <input type="checkbox" onClick={() => finishBenefit()} />
      </td>
    </tr>
  );
};

export default Benefit;
