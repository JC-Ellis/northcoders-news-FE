import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesById, getCommentsByArticleId } from "../utils/api";
import CommentsWrapper from "./CommentsWrapper.jsx";

export default function ViewArticle() {
  const { article_id } = useParams();

  const [article, setArticles] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function toggleView() {
    setIsVisible((visible) => !visible);
  }

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticlesById(article_id)
      .then(({ data }) => {
        setArticles(data.article);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getCommentsByArticleId(article_id, commentPage)
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

  return (
    <div className="fancy-box">
      <div>
        <p className="article-title">{article.title}</p>
        <div>
          <img
            className="article-image"
            src={article.article_img_url || "src/Images/fb2.jpg"}
            alt="Basket"
          />
        </div>
        <p>{article.body}</p>
        <div>
          <div>
            <p>Topic: {article.topic}</p>
          </div>
          <p className="fancy-price">By: {article.author}</p>
        </div>
        <div>
          <CommentsWrapper
            totalComments={article.comment_count}
            comments={comments}
            commentPage={commentPage}
            setCommentPage={setCommentPage}
            isVisible={isVisible}
            toggleView={toggleView}
          />
        </div>
      </div>
    </div>
  );
}
