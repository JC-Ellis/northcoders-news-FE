import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesById } from "../utils/api";

export default function ViewArticle() {
  const { article_id } = useParams();

  const [article, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticlesById(article_id)
      .then(({ data }) => {
        setItem(data.article);
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
      </div>
    </div>
  );
}
