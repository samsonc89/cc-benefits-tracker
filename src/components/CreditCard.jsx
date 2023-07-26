/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "./app.css";
import { useState } from "react";
import EditButton from "./EditButton.jsx";
import SetButton from "./SetButton";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const CreditCard = ({ cardData, dateChange, onCheck }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [selected, setSelected] = useState();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  const formatter = new Intl.DateTimeFormat("en-us", {
    month: "2-digit",
    day: "2-digit",
  });

  const handleButtonClick = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateChange = (event) => {
    if (!event.target.value == "") {
      console.log(event.target.value);
      setSelectedDate(new Date(event.target.value + "T00:00:00"));
    }
  };

  const handleDatePickerClose = (cardId, date) => {
    if (!selectedDate == "") {
      console.log(date);
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
              <EditButton onClick={handleButtonClick} />
              {isDatePickerOpen && (
                <div className="datePicker--container">
                  <DayPicker
                    className="daypicker"
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={footer}
                  />
                  {/* <input type="date" onChange={handleDateChange} /> */}
                  <SetButton
                    onClick={() =>
                      handleDatePickerClose(
                        cardData.id,
                        formatter.format(selectedDate)
                      )
                    }
                  />
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
