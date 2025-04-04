import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesById } from "../utils/api";
import CommentsWrapper from "./CommentsWrapper";
import VoteCard from "./VoteCard";
import CommentCard from "./CommentCard";

export default function ViewArticle() {
  const { article_id } = useParams();

  const [article, setArticles] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(null);

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
        <img
          className="error-img"
          alt="Error illustration"
          src="https://cdn.pixabay.com/photo/2016/04/24/13/24/error-1349562_1280.png"
        />
        <p className="error-text">We can't find the article you're looking for</p>
      </section>
    );
  }

  return (
    <div className="view-article">
      <div className="article-header">
        <p className="article-title">{article.title}</p>
      </div>
      <div className="article-image-container">
        <img
          className="article-image"
          src={article.article_img_url || "src/Images/fb2.jpg"}
          alt={article.title || "Article image"}
        />
      </div>
      <p className="article-body">{article.body}</p>
      <CommentCard
        articleId={article_id}
        success={success}
        setSuccess={setSuccess}
      />
      <VoteCard votes={article.votes} id={article.article_id} />
      <div className="article-meta">
        <div className="article-topic">
          <p>Topic: {article.topic}</p>
        </div>
        <p className="author-name">By: {article.author}</p>
      </div>
      <div className="article-comments">
        <CommentsWrapper
          articleId={article_id}
          totalComments={article.comment_count}
          isVisible={isVisible}
          toggleView={toggleView}
          success={success}
          setSuccess={setSuccess}
        />
      </div>
    </div>
  );
}