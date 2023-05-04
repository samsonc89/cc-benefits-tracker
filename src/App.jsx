/* eslint-disable react/prop-types */
const BenefitsTable = ({ benefits }) => {
  let cards = [];

  return (
    <table>
      <thead>
        <tr>
          <th>Benefit</th>
          <th>Expires</th>
          <th>Used</th>
        </tr>
      </thead>
      <tbody>
        <CreditCard benefits={benefits} />
      </tbody>
    </table>
  );
};

const CreditCard = ({ benefits }) => {
  return (
    <>
      <tr>
        <th colSpan={3}>{benefits.name}</th>
      </tr>

      <Benefit benefit={benefits} />
    </>
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
  benefit: "$200 Saks Fifth Credit (2nd half)",
  expires: "Dec 31",
  used: false,
};

function App() {
  return (
    <>
      <BenefitsTable benefits={BENEFITS} />
    </>
  );
}

export default App;
