import { useEffect, useState, useContext } from "react";
import { CollapseComments } from "./CollapseComments";
import { getCommentsByArticleId } from "../utils/api";
import { UserContext } from "../contexts/User";
import DeleteComment from "./DeleteComment";

export default function CommentsWrapper({
  articleId,
  totalComments,
  isVisible,
  toggleView,
  success,
}) {
  const totalPages = Math.ceil(totalComments / 10);
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const user = useContext(UserContext);

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
  }, [commentPage, success, deleteSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      const timer = setTimeout(() => {
        setDeleteSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [deleteSuccess]);

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
        <img alt="Error IMG" src="https://cdn.pixabay.com/photo/2016/04/24/13/24/error-1349562_1280.png"></img>
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
      <CollapseComments isVisible={isVisible} toggleView={toggleView}>
        {deleteSuccess ? <p id="error-message">{deleteSuccess}</p> : null}
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
              {user === comment.author ? (
                <DeleteComment
                  commentId={comment.comment_id}
                  setDeleteSuccess={setDeleteSuccess}
                />
              ) : null}
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
