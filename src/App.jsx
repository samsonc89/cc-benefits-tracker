const ProductTable = ({ product }) => {
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
        <Benefit bene={product} />
      </tbody>
    </table>
  );
};

const Benefit = ({ bene }) => {
  return (
    <tr>
      <td>{bene.benefit}</td>
      <td>{bene.expires}</td>
      <td>
        <input type="checkbox" checked={bene.used ? true : false} />
      </td>
    </tr>
  );
};
const BENEFITS = {
  card: "Amex Platinum Personal",
  benefit: "$200 Saks Fifth Credit (2nd half)",
  expires: "Dec 31",
  used: true,
};

function App() {
  return (
    <>
      <ProductTable product={BENEFITS} />
    </>
  );
}

export default App;
