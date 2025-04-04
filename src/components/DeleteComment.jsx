import { deleteUsersComment } from "../utils/api";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";

export default function DeleteComment({ commentId, setDeleteSuccess }) {
  const user = useContext(UserContext);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  function deleteHandler(event) {
    event.preventDefault();
    setError(null);
    setDeleteSuccess(null);
    setIsLoading(true);
    deleteUsersComment(commentId)
      .then(() => {
        setDeleteSuccess(`Thanks ${user}, this comment has been removed!`);
      })
      .catch(() => {
        setError(`Sorry ${user}, we couldn't delete your comment`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="delete-comment">
      {error ? <p id="error-message">{error}</p> : null}
      <button
        className="delete-button"
        onClick={deleteHandler}
        disabled={isLoading}
      >
        {!isLoading ? "Delete Comment" : "Please Wait"}
      </button>
    </div>
  );
}
