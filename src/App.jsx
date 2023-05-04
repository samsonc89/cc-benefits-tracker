/* eslint-disable react/prop-types */
const BenefitsTable = ({ benefits }) => {
  let rows = [];

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
        <Benefit benefit={benefits} />
      </tbody>
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
  card: "Amex Platinum Personal",
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
