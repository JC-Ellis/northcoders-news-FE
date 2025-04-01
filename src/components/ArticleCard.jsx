export default function ItemCard({ article }) {
  return (
    <div className="fancy-box">
      <div>
        <div>
          <img
            className="article-image"
            src={article.article_img_url || "src/Images/fb2.jpg"}
            alt="Basket"
          />
        </div>
        <p>{article.title}</p>
        <div>
          <p>Topic: {article.topic}</p>
        </div>
        <div>
          <p className="fancy-price">By: {article.author}</p>
        </div>
      </div>
    </div>
  );
}
