import { useState } from "react";
import CollapseComments from "./CollapseComments";

export default function CommentsWrapper({
  comments,
  commentPage,
  setCommentPage,
  totalComments,
  isVisible,
  toggleView
}) {
  const totalPages = Math.ceil(totalComments / 10);


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
