/* eslint-disable react/prop-types */
import CreditCard from "./components/CreditCard";

const BenefitsTable = ({ cards }) => {
  let userCards = [];

  cards.forEach((card) => {
    userCards.push(<CreditCard benefits={card} key={card.id} />);
  });
  return <div>{userCards}</div>;
};

export default BenefitsTable;
