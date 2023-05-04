/* eslint-disable react/prop-types */
import data from "./cardData.json";

const BenefitsTable = ({ cards }) => {
  let userCards = [];

  cards.forEach((card) => {
    userCards.push(<CreditCard benefits={card} key={card.id} />);
  });
  return <div>{userCards}</div>;
  // return;
  // <CreditCard benefits={benefits} />;
};

const CreditCard = ({ benefits }) => {
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
          <th colSpan={3}>{benefits.name}</th>
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

const Benefit = ({ benefit }) => {
  return (
    <tr>
      <td>{benefit.benefit}</td>
      <td>{benefit.expires}</td>
      <td>
        <input type="checkbox" checked={benefit.used ? true : false} readOnly />
      </td>
    </tr>
  );
};
const BENEFITS = data;

function App() {
  return (
    <>
      <BenefitsTable cards={BENEFITS} />
    </>
  );
}

export default App;
