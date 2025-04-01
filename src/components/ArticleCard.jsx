import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <Link to={`/articles/${article.article_id}`}>
      <div className="fancy-box">
        <div>
          <div>
            <p className="article-title">{article.title}</p>
            <img
              className="article-image"
              src={article.article_img_url || "src/Images/fb2.jpg"}
              alt="Basket"
              />
          </div>
              <div>
                <p>Topic: {article.topic}</p>
              </div>
          <div>
            <p className="fancy-price">By: {article.author}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
