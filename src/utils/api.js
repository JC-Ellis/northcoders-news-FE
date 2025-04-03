import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-btqn.onrender.com/api",
});

export const getArticles = (page, topic) => {
  return api.get(`/articles?p=${page}${topic}`);
};

export const getArticlesById = (article_id) => {
  return api.get(`/articles/${article_id}`);
};

export const getCommentsByArticleId = (article_id, commentPage) => {
  return api.get(`/articles/${article_id}/comments?p=${commentPage}`);
};

export const patchVotesByArticleId = (article_id, vote) => {
  return api.patch(`/articles/${article_id}`, vote);
};

export const postCommentByArticleId = (article_id, comment) => {
  return api.post(`/articles/${article_id}/comments`, comment);
};

export const deleteUsersComment = (commentId) => {
  return api.delete(`comments/${commentId}`);
};
