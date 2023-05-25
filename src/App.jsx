import CreditCard from "./components/CreditCard";

import cardData from "./cardData.json";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";

const BENEFITS = cardData;

const User = () => {
  const [userData, setUserData] = useImmer(() => {
    const parsedUserData = JSON.parse(localStorage.getItem("userData"));
    return (
      parsedUserData || {
        id: "user1",
        username: "Test User 1",
        cards: [],
      }
    );
  });

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem("userData"));
    if (savedUserData) {
      setUserData(userData);
    }
  }, [userData]);

  function showData(e) {
    e.preventDefault();
    console.log(userData);
    console.log(BENEFITS);
  }

  const handleToggle = (benefitId) => {
    setUserData((draft) => {
      //   //find which card, then which benefit
      const foundObj = draft.cards.find((card) =>
        card.benefits.some((benefit) => benefit.id === benefitId)
      );
      let foundBenefit = foundObj.benefits.find(
        (benefit) => benefit.id === benefitId
      );
      foundBenefit.used = !foundBenefit.used;
    });
  };

  const [selectedCard, setSelectedCard] = useState(BENEFITS[0].id);

  function addCard(e) {
    //go through the list of cards and find the one that matches the id and create a clone of the card
    let foundCard = BENEFITS.filter((ob) => ob.id == selectedCard);
    // .map((card) => ({ ...card }));
    e.preventDefault();

    //check if user already has selected card
    if (userData.cards.some((card) => card.name === foundCard[0].name)) {
      alert("Card already added");
    } else {
      let newCard = foundCard.map((card) => ({ ...card }));

      //add that card to the userData
      setUserData({ ...userData, cards: userData.cards.concat(newCard) });
    }
  }

  function deleteCard(targetID) {
    let foundCard = userData.cards.find((card) => card.id === targetID);
    if (foundCard) {
      setUserData({
        ...userData,
        cards: userData.cards.filter((card) => card.id !== targetID),
      });
    }
  }

  return (
    <div>
      <h2>{userData.username}</h2>
      <select
        defaultValue={BENEFITS[0].id}
        onChange={(e) => setSelectedCard(e.target.value)}
      >
        {BENEFITS.map((card) => {
          return (
            <option key={card.id} value={card.id}>
              {card.name}
            </option>
          );
        })}
      </select>
      <button onClick={addCard}>Add Card</button>
      <button onClick={showData}>Show</button>
      <div>
        {userData.cards.map((card) => {
          return (
            <CreditCard
              cardData={card}
              key={card.id}
              delBtn={deleteCard}
              onCheck={handleToggle}
            />
          );
        })}
      </div>
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
