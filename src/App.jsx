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
    //when there are changes to the user object, select either the selected card or the first card
    setSelectedCard(userData.cards[selectedCard] || userData.cards[0]);
  }, [userData]);

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem("userData"));
    if (savedUserData) {
      setUserData(userData);
    }
  }, [setUserData, userData]);

  function showData(e) {
    e.preventDefault();
    console.log(userData);
    console.log(BENEFITS);
  }

  const [updatedObj, setUpdatedObj] = useState(0);

  function checkIfAllUsed(data) {
    return data.benefits.every((bene) => bene.used === true);
  }

  const handleToggle = (benefitId) => {
    let foundObj = userData.cards.findIndex((card) =>
      card.benefits.some((benefit) => benefit.id === benefitId)
    );
    setUpdatedObj(foundObj);
    setUserData((draft) => {
      //   //find which card, then which benefit
      const foundDraftObj = draft.cards.find((card) =>
        card.benefits.some((benefit) => benefit.id === benefitId)
      );
      let foundBenefit = foundDraftObj.benefits.find(
        (benefit) => benefit.id === benefitId
      );
      foundBenefit.used = !foundBenefit.used;
    });
  };

  const [cardSelection, setCardSelection] = useState(BENEFITS[0].id);

  const [selectedCard, setSelectedCard] = useState(userData.cards[0]);

  function addCard(e) {
    //go through the list of cards and find the one that matches the id and create a clone of the card
    let foundCard = BENEFITS.filter((ob) => ob.id == cardSelection);
    // .map((card) => ({ ...card }));
    e.preventDefault();

    //check if user already has selected card
    if (userData.cards.some((card) => card.name === foundCard[0].name)) {
      alert("Card already added");
    } else {
      let newCard = foundCard.map((card) => ({ ...card }));

      setSelectedCard(newCard[0]);
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

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div>
      <div>
        <h2>{userData.username}</h2>
        <select
          defaultValue={BENEFITS[0].id}
          onChange={(e) => setCardSelection(e.target.value)}
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
      </div>
      <div className="content--container">
        <div className="content--cardsList">
          {userData.cards.map((card) => {
            return (
              <div
                key={card.id}
                className={`content--card  ${
                  card === selectedCard ? "card--selected" : ""
                }`}
                id={card.id}
                onClick={() => handleCardClick(card)}
              >
                {card.name}
              </div>
            );
          })}
        </div>
        <div className="content--benefits">
          {userData.cards.length > 0 ? (
            <CreditCard
              cardData={selectedCard}
              key={selectedCard.id}
              delBtn={deleteCard}
              onCheck={handleToggle}
            />
          ) : (
            ""
          )}
        </div>
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
