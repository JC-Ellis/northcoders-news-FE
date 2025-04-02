import { useState } from "react";
import { postCommentByArticleId } from "../utils/api";

export default function CommentCard({ articleId }) {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    setNewComment(event.target.value);
  }

  function handleSubmit() {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    postCommentByArticleId(articleId, {
      username: "weegembump",
      body: `${newComment}`,
    })
      .then(() => {
        setNewComment("");
        setSuccess("Thank you for your submission");
      })
      .catch(() => {
        setError("Sorry, your comment was not submitted. Please try again");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
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
        onClick={handleSubmit}
        disable={isLoading.toString()}
      />
    </div>
  );
}
