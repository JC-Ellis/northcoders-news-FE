import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleWrapper from "./ArticleWrapper";
import { useSearchParams } from "react-router-dom";
import SortControls from "./SortControls";


export default function Home({ page, setPage }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
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
        console.log(err)
        setIsError(true);
        setErrorMessage(err.response?.data?.msg || "Something went wrong!");
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
        <img
          className="error-img"
          alt="Error illustration"
          src="https://cdn.pixabay.com/photo/2016/04/24/13/24/error-1349562_1280.png"
        />
        <p className="error-text">{errorMessage}</p>
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
