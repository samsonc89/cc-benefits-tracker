const ProductTable = () => {
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
        <Benefit />
      </tbody>
    </table>
  );
};

const Benefit = () => {
  return (
    <tr>
      <td>Benefits</td>
      <td>Exp</td>
      <td>Check</td>
    </tr>
  );
};

function App() {
  return (
    <>
      <ProductTable />
    </>
  );
}

export default App;
