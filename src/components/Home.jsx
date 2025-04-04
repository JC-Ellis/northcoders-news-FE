import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleWrapper from "./ArticleWrapper";
import { useSearchParams } from "react-router-dom";
import SortControls from "./SortControls";

export default function Home({ page, setPage }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams()
  const filterByTopic = searchParams.get("topic")
  const topicParam = filterByTopic ? filterByTopic : "";
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles(page, topicParam, sort_by, order)
      .then(({ data }) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, topicParam, sort_by, order]);

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
        <p>Something went wrong!</p>
        <img alt="Error IMG" src="src/images/fb2.jpg"></img>
      </section>
    );
  }

  return (
    <>
    <div>
      <SortControls/>
      </div>
      <div>
        <ArticleWrapper
          key={articles.article_id}
          articles={articles}
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  );
}
