import { useEffect, useState } from "react";
import axios from "axios";
import ArticleWrapper from "./ArticleWrapper";

const api = axios.create({
  baseURL: "https://be-nc-news-btqn.onrender.com/api",
});

export default function Home({ page, setPage }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    api
      .get(`/articles?p=${page}`)
      .then(({ data }) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

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
