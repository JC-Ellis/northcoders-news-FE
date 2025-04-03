import { useContext, useState } from "react";
import { postCommentByArticleId } from "../utils/api";
import { UserContext } from "../contexts/User";

export default function CommentCard({ articleId, success, setSuccess }) {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useContext(UserContext)
  console.log(user)
  function handleChange(event) {
    setNewComment(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault(); 
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    postCommentByArticleId(articleId, {
      username: `${user}`,
      body: `${newComment}`,
    })
      .then(() => {
        setNewComment("");
        setSuccess(`Thank you for your submission ${user}` );
      })
      .catch(() => {
        setError(`Sorry ${user}, your comment was not submitted. Please try again`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {error ? <p id="error-message">{error}</p> : null}
        {success ? <p id="success-message">{success}</p> : null}
        <input
          type="text"
          className="form-field"
          required
          placeholder="Write your comment here (Max 200 char)"
          maxLength="200"
          onChange={handleChange}
          value={newComment}
        ></input>
        <input
          type="submit"
          value={isLoading ? "Adding Comment" : "Comment"}
          disable={isLoading.toString()}
        />
      </div>
    </form>
  );
}
