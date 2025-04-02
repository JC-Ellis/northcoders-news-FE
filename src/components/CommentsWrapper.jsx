import { useEffect, useState } from "react";
import { CollapseComments } from "./CollapseComments";
import { getCommentsByArticleId } from "../utils/api";

export default function CommentsWrapper({
  articleId,
  totalComments,
  isVisible,
  toggleView,
}) {
  const totalPages = Math.ceil(totalComments / 10);
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getCommentsByArticleId(articleId, commentPage)
      .then(({ data }) => {
        setComments(data.comments);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [commentPage]);

  if (isLoading) {
    return (
      <div>
        <p>....Loading</p>
      </div>
    );
  }

  if (isError) {
    return (
      <section className="error-box">
        <img alt="Error IMG" src="src/Images/fb2.jpg"></img>
        <p>Something went wrong</p>
      </section>
    );
  }

  function handleNextPage() {
    if (commentPage < totalPages) {
      setCommentPage((currentPage) => currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (commentPage > 1) {
      setCommentPage((currentPage) => currentPage - 1);
    }
  }

  return (
    <div>
      <CollapseComments isVisible={isVisible} toggleView={toggleView} totalComments={totalComments}>
        {comments.map((comment) => (
          <div className="comment-box" key={comment.comment_id}>
            <div>
              <p className="comment-body">{comment.body}</p>
            </div>
            <div>
              <p>Votes: {comment.votes}</p>
            </div>
            <div>
              <p className="fancy-price">By: {comment.author}</p>
            </div>
          </div>
        ))}
        <div>
          <div>
            <button onClick={handlePreviousPage} disabled={commentPage === 1}>
              Previous Page
            </button>
          </div>
          <div>
            <button
              onClick={handleNextPage}
              disabled={commentPage === totalPages}
            >
              More Comments
            </button>
          </div>
        </div>
      </CollapseComments>
    </div>
  );
}
