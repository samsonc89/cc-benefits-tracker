import CreditCard from "./components/CreditCard";

/* eslint-disable react/prop-types */
import cardData from "./cardData.json";
import { useState } from "react";

const BenefitsTable = ({ cards }) => {
  let userCards = [];

  cards.forEach((card) => {
    userCards.push(<CreditCard benefits={card} key={card.id} />);
  });
  return <div>{userCards}</div>;
};

const BENEFITS = cardData;

const User = () => {
  const [userData, setUserData] = useState({
    id: "user1",
    username: "Test User 1",
    cards: [],
  });

  function showData(e) {
    e.preventDefault();
    console.log(BENEFITS);
    console.log(userData);
  }
  const [selectedCard, setSelectedCard] = useState(BENEFITS[0].id);

  function addCard(e) {
    //go through the list of cards and find the one that matches the id and create a clone of the card
    let foundCard = BENEFITS.filter((ob) => ob.id == selectedCard).map(
      (card) => ({ ...card })
    );
    e.preventDefault();

    //change the card id to match the username
    foundCard[0].id = userData.id + foundCard[0].id;

    //add that card to the userData
    setUserData({ ...userData, cards: userData.cards.concat(foundCard) });
  }

  return (
    <div>
      <h2>{userData.username}</h2>
      <select
        defaultValue={BENEFITS[0].id}
        onChange={(e) => setSelectedCard(e.target.value)}
      >
        <option value={BENEFITS[0].id}>{BENEFITS[0].name}</option>
        <option value={BENEFITS[1].id}>{BENEFITS[1].name}</option>
      </select>
      <button onClick={addCard}>Add Card</button>
      <button onClick={showData}>Show</button>
      <BenefitsTable cards={userData.cards} />
    </div>
  );
};

function App() {
  return (
    <>
      <User />
    </>
  );
}

export default App;
