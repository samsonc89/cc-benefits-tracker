import { useState } from "react";
import User from "./components/User";

function App() {
  const [userName, setUserName] = useState("There");

  return (
    <>
      <User info={userName} />
    </>
  );
}

export default App;
