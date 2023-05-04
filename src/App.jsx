/* eslint-disable react/prop-types */
const BenefitsTable = ({ benefits }) => {
  let cards = [];

  return <CreditCard benefits={benefits} />;
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
const BENEFITS = {
  name: "Amex Platinum Personal",
  benefits: [
    {
      id: 0,
      benefit: "$200 Saks Fifth Credit (first half)",
      expires: "May 31",
      used: true,
    },
    {
      id: 1,
      benefit: "$200 Saks Fifth Credit (2nd half)",
      expires: "Dec 31",
      used: false,
    },
  ],
};

function App() {
  return (
    <>
      <BenefitsTable benefits={BENEFITS} />
    </>
  );
}

export default App;
