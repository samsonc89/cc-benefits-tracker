import CreditCard from "./components/CreditCard";

/* eslint-disable react/prop-types */
import cardData from "./cardData.json";

const BenefitsTable = ({ cards }) => {
  let userCards = [];

  cards.forEach((card) => {
    userCards.push(<CreditCard benefits={card} key={card.id} />);
  });
  return <div>{userCards}</div>;
  // return;
  // <CreditCard benefits={benefits} />;
};

const BENEFITS = cardData;
const userData = {
  id: "user1",
  cards: [],
};

function showData(e) {
  e.preventDefault(), console.log(userData);
}

const User = () => {
  return (
    <div>
      <h2>User name</h2>
      <p>User data</p>
      <button onClick={showData}>Show</button>
    </div>
  );
};

function App() {
  return (
    <>
      <User />
      <BenefitsTable cards={BENEFITS} />
    </>
  );
}

export default App;
