/* eslint-disable react/prop-types */
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

export default Benefit;
