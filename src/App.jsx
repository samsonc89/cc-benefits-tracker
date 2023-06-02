import { useState, useEffect } from "react";
import User from "./components/User";
import Modal from "./components/Modal";

function App() {
  const [userName, setUserName] = useState(() => {
    const savedUserName = JSON.parse(localStorage.getItem("userName"));
    return savedUserName || "There";
  });
  const [visited, setVisited] = useState(() => {
    const savedVisited = JSON.parse(localStorage.getItem("visited"));
    return savedVisited || false;
  });

  useEffect(() => {
    localStorage.setItem("visited", JSON.stringify(visited));
  }, [visited]);

  useEffect(() => {
    localStorage.setItem("userName", JSON.stringify(userName));
  }, [userName]);

  useEffect(() => {
    const savedVisited = JSON.parse(localStorage.getItem("visited"));
    if (savedVisited) {
      setVisited(visited);
    }
  }, [setVisited, visited]);

  useEffect(() => {
    const savedUserName = JSON.parse(localStorage.getItem("userName"));
    if (savedUserName) {
      setUserName(userName);
    }
  }, [setUserName, userName]);

  function handleSubmit() {
    // event.preventDefault();
    setVisited(true);
  }

  function showInstructions(e) {
    e.preventDefault();
    console.log(e.target);
  }

  function handleChange(e) {
    let value = e.target.value;
    setUserName(value);
  }

  return (
    <>
      <Modal
        closeInstructions={handleSubmit}
        state={visited}
        change={handleChange}
        addName={showInstructions}
      />
      <User info={userName} />
    </>
  );
}

export default App;
