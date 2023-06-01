/* eslint-disable react/prop-types */

import "./app.css";

const CreditCard = ({ cardData, delBtn, onCheck }) => {
  return (
    <>
      <img src={cardData.img} className="content--card--image" />
      <table>
        <thead>
          <tr>
            <th colSpan={1}>{cardData.name}</th>
            <th>
              <button onClick={() => delBtn(cardData.id)}>Delete Card</button>
            </th>
          </tr>
          <tr>
            <th>Benefit</th>
            <th>Expires</th>
            <th>Used</th>
          </tr>
        </thead>
        {/* <tbody>{benefitRows}</tbody> */}
        <tbody>
          {cardData.benefits.map((benefit) => (
            <tr key={benefit.id} className={benefit.used ? "done" : ""}>
              <td>{benefit.benefit}</td>
              <td>
                {benefit.expires === "End of the year"
                  ? "12/31"
                  : benefit.expires}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={benefit.used}
                  onChange={() => onCheck(benefit.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CreditCard;
