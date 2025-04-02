import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-btqn.onrender.com/api",
});

export const getArticles = (page) => {
  return api.get(`/articles?p=${page}`);
};

export const getArticlesById = (article_id) => {
  return api.get(`articles/${article_id}`);
};

export const getCommentsByArticleId = (article_id, commentPage) => {
  return api.get(`articles/${article_id}/comments?p=${commentPage}`);
};