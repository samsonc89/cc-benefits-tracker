/* eslint-disable react/prop-types */
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
const BENEFITS = [
  {
    id: 100,
    name: "Amex Platinum Personal",
    benefits: [
      {
        id: 1000,
        benefit: "$200 Saks Fifth Credit (first half)",
        expires: "May 31",
        used: true,
      },
      {
        id: 1001,
        benefit: "$200 Saks Fifth Credit (2nd half)",
        expires: "Dec 31",
        used: false,
      },
    ],
  },
  {
    id: 200,
    name: "Chase Sapphire",
    benefits: [
      {
        id: 2001,
        benefit: "300 Travel Credit",
        expires: "End of the year date",
        used: false,
      },
      {
        id: 2002,
        benefit: "TSA/Global Entry",
        expires: "End of the year date",
        used: false,
      },
    ],
  },
];

function App() {
  return (
    <>
      <BenefitsTable cards={BENEFITS} />
    </>
  );
}

export default App;
