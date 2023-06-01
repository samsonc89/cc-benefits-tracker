const Modal = ({ onClick, state, change }) => {
  return (
    <div className={state ? "modal--hidden" : "modal"}>
      <h1>Welcome!</h1>
      <h2>What should we call you?</h2>
      <form>
        <input type="text" onChange={change}></input>
        <button type="button" onClick={() => onClick()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Modal;
