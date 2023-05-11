/* eslint-disable react/prop-types */
import Benefit from "./Benefit";

const CreditCard = ({ benefits, delBtn }) => {
  let benefitRows = [];

  {
    /* Go through each of the benefits and spit out the 
    benefit, exp and used checkmark
  */
  }
  benefits.benefits.forEach((benefit) => {
    benefitRows.push(<Benefit benefit={benefit} key={benefit.id} />);
  });

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>{benefits.name}</th>
          <th>
            <button onClick={() => delBtn(benefits.id)}>Delete Card</button>
          </th>
        </tr>
        <tr>
          <th>Benefit</th>
          <th>Expires</th>
          <th>Used</th>
        </tr>
      </thead>

      <tbody>{benefitRows}</tbody>
    </table>
  );
};

export default CreditCard;
