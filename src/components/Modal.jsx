import { useState } from "react";

const Modal = ({ addName, state, change, closeInstructions }) => {
  const [welcome, setWelcome] = useState(false);
  function closeWelcome(e) {
    e.preventDefault();
    setWelcome(true);
  }

  return (
    <div className={state ? "modal--hidden" : "modal--container"}>
      <div className={welcome === false ? "modal--welcome" : "modal--hidden"}>
        <h1>Welcome!</h1>
        <h2>What should we call you?</h2>
        <form onSubmit={closeWelcome}>
          <input type="text" onChange={change}></input>
          <button type="button" onClick={closeWelcome}>
            Submit
          </button>
        </form>
      </div>
      <div
        className={welcome === true ? "modal--instructions" : "modal--hidden"}
      >
        <h1>How this works!</h1>
        <img src="./assets/instructions.png" />
        <button type="submit" onClick={closeInstructions}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default Modal;
