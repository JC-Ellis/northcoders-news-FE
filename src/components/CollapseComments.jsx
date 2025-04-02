export default function CollapseComments({ children, isVisible, toggleView }) {

  return (
    <div>
      <button type="button" onClick={toggleView}>
        {isVisible ? "Hide Comments" : "Show Comments"}
      </button>
      {isVisible ? children : null}
    </div>
  );
}
