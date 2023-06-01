import { useState, useEffect } from "react";
import User from "./components/User";
import Modal from "./components/Modal";

function App() {
  const [userName, setUserName] = useState("There");
  const [visited, setVisited] = useState(() => {
    const savedVisited = JSON.parse(localStorage.getItem("visited"));
    return savedVisited || false;
  });

  useEffect(() => {
    localStorage.setItem("visited", JSON.stringify(visited));
  }, [visited]);

  useEffect(() => {
    const savedVisited = JSON.parse(localStorage.getItem("visited"));
    if (savedVisited) {
      setVisited(visited);
    }
  }, [setVisited, visited]);

  function handleSubmit() {
    // e.preventDefault();
    setVisited(true);
  }

  function handleChange(e) {
    let value = e.target.value;
    setUserName(value);
  }

  return (
    <>
      <Modal onClick={handleSubmit} state={visited} change={handleChange} />
      <User info={userName} />
    </>
  );
}

export default App;
