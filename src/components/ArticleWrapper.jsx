import ArticleCard from "./ArticleCard";

export default function ArticleWrapper({ articles, page, setPage }) {
  const totalPages = Math.ceil(articles[0].total_count / 10);

  function handleNextPage() {
    if (page < totalPages) {
      setPage((currentPage) => currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  }

  return (
    <div className="article-wrapper">
      <h2 className="section-title">Pick an article to find out more!</h2>
      <div className="fancy-container article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
      <div className="pagination-info">
        <p>
          Page {page} of {totalPages}
        </p>
      </div>
      <div className="pagination-controls fancy-container">
        <div>
          <button
            className="pagination-button"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous Page
          </button>
        </div>
        <div>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}