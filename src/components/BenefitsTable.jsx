/* eslint-disable react/prop-types */
import CreditCard from "./CreditCard";

const BenefitsTable = ({ cards, delFunction }) => {
  return (
    <div>
      {/* <> */}
      {cards.map((card) => {
        return (
          <CreditCard benefits={card} key={card.id} delBtn={delFunction} />
        );
      })}
      {/* </> */}
    </div>
  );
};

export default BenefitsTable;
