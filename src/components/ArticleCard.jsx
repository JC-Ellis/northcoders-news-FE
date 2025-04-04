import { Link } from "react-router-dom";
import { formatDateAndTime } from "../utils/formatDateAndTime";

export default function ArticleCard({ article }) {

  return (
    <Link to={`/articles/${article.article_id}`} className="article-link">
      <div className="fancy-box article-card">
        <div className="card-content">
          <div className="card-header">
            <p className="article-title">{article.title}</p>
            <img
              className="article-image"
              src={article.article_img_url || "src/Images/fb2.jpg"}
              alt={article.title || "Article image"}
            />
          </div>
          <div className="card-details">
            <p className="article-topic">Topic: {article.topic}</p>
            <p className="article-author">By: {article.author}</p>
            <p className="article-votes">Votes: {article.votes}</p>
          </div>
          <div className="card-footer">
            <p className="article-date">
              Posted: {formatDateAndTime(article.created_at)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
