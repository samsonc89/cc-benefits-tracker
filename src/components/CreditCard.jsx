/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "./app.css";
import { useState } from "react";

const CreditCard = ({ cardData, dateChange, onCheck }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const formatter = new Intl.DateTimeFormat("en-us", {
    month: "2-digit",
    day: "2-digit",
  });

  const handleButtonClick = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateChange = (event) => {
    if (!event.target.value == "") {
      setSelectedDate(new Date(event.target.value + "T00:00:00"));
    }
  };

  const handleDatePickerClose = (cardId, date) => {
    if (!selectedDate == "") {
      dateChange(cardId, date);
    }

    setIsDatePickerOpen(false);
  };

  return (
    <>
      <img src={cardData.img} className="content--card--image" />
      <table>
        <thead>
          <tr>
            <th>{cardData.name}</th>
            <th>
              Anniversary:{" "}
              {cardData.anniversary == "" ? "" : cardData.anniversary}
            </th>
            <th>
              <button className="btn-edit" onClick={handleButtonClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  height="20px"
                >
                  <title>pencil-outline</title>
                  <path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                </svg>
              </button>
              {isDatePickerOpen && (
                <div>
                  <input type="date" onChange={handleDateChange} />
                  <button
                    onClick={() =>
                      handleDatePickerClose(
                        cardData.id,
                        formatter.format(selectedDate)
                      )
                    }
                  >
                    Set
                  </button>
                </div>
              )}
            </th>
          </tr>
          <tr>
            <th>Benefit</th>
            <th>Expires</th>
            <th>Used</th>
          </tr>
        </thead>
        {/* <tbody>{benefitRows}</tbody> */}
        <tbody>
          {cardData.benefits.map((benefit) => (
            <tr key={benefit.id} className={benefit.used ? "done" : ""}>
              <td>{benefit.benefit}</td>
              <td>{benefit.expires}</td>
              <td>
                <input
                  type="checkbox"
                  checked={benefit.used}
                  onChange={() => onCheck(benefit.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CreditCard;
