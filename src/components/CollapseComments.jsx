
function CollapseComments({ children, isVisible, toggleView }) {
  return (
    <div>
      <button type="button" onClick={toggleView}>
        {isVisible ? "Hide Comments" : `Show Comments`}
      </button>
      {isVisible ? children : null}
    </div>
  );
}

function CollapseCommentForm({ children, isVisible, toggleView}) {
  return (
    <div>
      <button type="button" onClick={toggleView}>
        {isVisible ? "Cancel" : `Add Comment`}
      </button>
      {isVisible ? children : null}
    </div>
  );
}

export {CollapseComments, CollapseCommentForm}