/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CreditCard from "./CreditCard";

import cardData from "../cardData.json";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";

const BENEFITS = cardData;

const User = ({ info }) => {
  const [userData, setUserData] = useImmer(() => {
    const parsedUserData = JSON.parse(localStorage.getItem("userData"));
    return (
      parsedUserData || {
        id: "user1",
        cards: [],
      }
    );
  });

  const [cardSelection, setCardSelection] = useState(BENEFITS[0].id);

  const [selectedCard, setSelectedCard] = useState(userData.cards[0]);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem("userData"));
    if (savedUserData) {
      setUserData(userData);
    }
  }, [setUserData, userData]);

  function showMonthlyUnused(e) {
    e.preventDefault();
    let monthlyBenefits = [];

    userData.cards.forEach((card) => {
      let filtered = card.benefits.filter(
        (benefit) => benefit.expires == "Monthly" && benefit.used === false
      );
      if (filtered) {
        filtered.forEach((card) => monthlyBenefits.push(card));
      }
    });

    console.log(monthlyBenefits);
  }

  function resetMonthly() {
    setUserData((draft) => {
      draft.cards.forEach((card) => {
        let filtered = card.benefits.filter(
          (benefit) => benefit.expires == "Monthly"
        );
        filtered.forEach((benefit) => (benefit.used = false));
      });
    });
  }
  function resetAnnual() {
    setUserData((draft) => {
      draft.cards.forEach((card) => {
        let filtered = card.benefits.filter(
          (benefit) => benefit.expires == "6/30" || benefit.expires == "12/31"
        );
        filtered.forEach((benefit) => (benefit.used = false));
      });
    });
  }

  function showAnnualUnused(e) {
    e.preventDefault();
    let annualBenefits = [];

    userData.cards.forEach((card) => {
      let filtered = card.benefits.filter(
        (benefit) => benefit.expires == "12/31" && benefit.expires == "6/30"
      );
      if (filtered) {
        filtered.forEach((card) => annualBenefits.push(card));
      }
    });

    console.log(annualBenefits.filter((bene) => bene.used === false));
  }

  const getDayBefore = (date) => {
    const formatter = new Intl.DateTimeFormat("en-us", {
      month: "2-digit",
      day: "2-digit",
    });

    let previousDay = new Date(date);
    previousDay.setDate(previousDay.getDate() - 1);
    const previous = formatter.format(new Date(date));

    return formatter.format(previousDay);
  };

  const handleAnniversaryUpdate = (cardId, date) => {
    const updatedCards = userData.cards.map((card) => {
      if (card.id === cardId) {
        const updatedBenefits = card.benefits.map((benefit) => {
          return {
            ...benefit,
            expires:
              benefit.type === "anniversary"
                ? getDayBefore(date)
                : benefit.expires,
          };
        });

        return {
          ...card,
          anniversary: date,
          benefits: updatedBenefits,
        };
      }
      return card;
    });

    setUserData({ ...userData, cards: updatedCards });
  };

  // const [updatedObj, setUpdatedObj] = useState(0);

  function checkIfAllUsed(data) {
    return data.benefits.every((bene) => bene.used === true);
  }

  const handleToggle = (benefitId) => {
    // let foundObj = userData.cards.findIndex((card) =>
    //   card.benefits.some((benefit) => benefit.id === benefitId)
    // );
    // setUpdatedObj(foundObj);
    setUserData((draft) => {
      //   //find which card, then which benefit
      const foundDraftObj = draft.cards.find((card) =>
        card.benefits.some((benefit) => benefit.id === benefitId)
      );
      let foundBenefit = foundDraftObj.benefits.find(
        (benefit) => benefit.id === benefitId
      );
      foundBenefit.used = !foundBenefit.used;
      foundBenefit.used === true ? (foundBenefit.lastUsed = new Date()) : "";
    });
  };

  function addCard(e) {
    //go through the list of cards and find the one that matches the id and create a clone of the card
    let foundCard = BENEFITS.filter((ob) => ob.id == cardSelection);
    // .map((card) => ({ ...card }));
    e.preventDefault();

    //check if user already has selected card
    // if (userData.cards.some((card) => card.name === foundCard[0].name)) {
    //   alert("Card already added");
    // } else {
    let newCard = foundCard.map((card) => ({ ...card }));

    setSelectedCard(newCard[0]);
    //add that card to the userData
    setUserData({ ...userData, cards: userData.cards.concat(newCard) });
  }

  function deleteCard(targetID) {
    // let foundCard = userData.cards.find((card) => card.id === targetID);
    let foundCardIndex = userData.cards.findIndex(
      (card) => card.id === targetID
    );
    if (userData.cards.find((card) => card.id === targetID)) {
      setUserData({
        ...userData,
        cards: userData.cards.filter((card) => card.id !== targetID),
      });
      //when you delete a card, set the selected back to the first card in the array, unless it's the first card
      if (userData.cards.length > 0) {
        foundCardIndex === 0
          ? setSelectedCard(userData.cards[1])
          : setSelectedCard(userData.cards[0]);
      }
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleReset() {
    localStorage.clear();

    setUserData({ ...userData, cards: [] });
    window.location.reload(false);
  }

  let today = new Date();
  let todayMonth = today.getMonth() + 1;
  let todayDay = today.getDate();
  let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  let todayShort = new Date(`${todayMonth}/${todayDay}`);

  return (
    <div className="container--main">
      <div className="content--container">
        <div className="content--cardsList">
          <h3>Your Cards</h3>
          {userData.cards.map((card) => {
            let unUsedBenefits = card.benefits
              //first filter all unused
              .filter((benefit) => benefit.used === false)
              //then filter the monthly ones
              .filter((benefit) => {
                if (benefit.expires == "Monthly") {
                  return benefit;

                  //then find the ones whose date is this month
                } else if (new Date(benefit.expires) != "Invalid Date") {
                  let expDate = new Date(benefit.expires);
                  if (expDate.getMonth() + 1 == todayMonth) {
                    return benefit;
                  }
                }
              });

            let urgentBenefits = unUsedBenefits.filter((benefit) => {
              let expDate = new Date(benefit.expires);
              if (
                //do todayShort because some exp dates are hard coded as 12/31 but this is for the
                //beenfits that expires on an anniversary date
                (expDate.getTime() - todayShort.getTime()) /
                  (1000 * 60 * 60 * 24.0) <=
                14
              ) {
                return benefit;
              }
            });

            return (
              <div
                key={card.id}
                className="content--cardsList--card--container"
              >
                <div
                  className={`content--cardsList--card  ${
                    card.id === selectedCard.id ? "card--selected" : ""
                  } ${unUsedBenefits.length > 0 ? "expiring" : ""} ${
                    urgentBenefits.length > 0 ||
                    (unUsedBenefits.length > 0 && lastDayOfMonth - today <= 14)
                      ? "urgent"
                      : ""
                  }`}
                  id={card.id}
                  onClick={() => handleCardClick(card)}
                >
                  <img src={card.img} className="cardlist--card" />
                  {card.name}
                </div>
                <button type="button" onClick={() => deleteCard(card.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="20px"
                  >
                    <title>trash-can-outline</title>
                    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                  </svg>
                </button>
              </div>
            );
          })}
          <div className="content--cardsList--selector">
            <select
              defaultValue={BENEFITS[0].id}
              onChange={(e) => setCardSelection(e.target.value)}
            >
              {BENEFITS.sort((a, b) => a.name.localeCompare(b.name)).map(
                (card) => {
                  return (
                    <option key={card.id} value={card.id}>
                      {card.name}
                    </option>
                  );
                }
              )}
            </select>
            <button onClick={addCard}>Add Card</button>
            {/* <button onClick={showMonthlyUnused}>Show Monthly Unused</button>
              <button onClick={showAnnualUnused}>Show Annual Unused</button> */}
            <br />
          </div>
        </div>
        <div className="content--benefits">
          <div className="content--header">
            <div className="header--text">
              <h2>Hello {info}!</h2>
              <h3>
                Today is:{" "}
                {Intl.DateTimeFormat(navigator.language, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(today)}
              </h3>
            </div>
            <div className="header--buttons">
              <button onClick={resetMonthly}>Reset Monthly Benefits</button>
              <button onClick={resetAnnual}>Reset Annual Benefits</button>
              <button onClick={handleReset}>Reset Data</button>
            </div>
          </div>
          {userData.cards.length > 0 ? (
            <CreditCard
              //find from userData state because selectedCard state does not update when you change the checkboxes
              cardData={userData.cards.find(
                (card) => card.id === selectedCard.id
              )}
              key={selectedCard.id}
              dateChange={handleAnniversaryUpdate}
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

export default User;
