import axios from "axios";
import authHeader from "./authHeader";

const articleApi = axios.create({
  baseURL: process.env.REACT_APP_DEFAULT_API_URL + "api",
});
const accountApi = axios.create({
  baseURL: process.env.REACT_APP_DEFAULT_API_URL + "account",
});

export const createArticle = (payload) =>
  articleApi.post(`/article`, payload, { headers: authHeader() });
export const getAllArticles = () => articleApi.get(`/articles`);
export const getArticleById = (id) => articleApi.get(`/article/${id}`);
export const approveArticle = (id) =>
  articleApi.put(`/article/approve/${id}`, "", { headers: authHeader() });
export const deleteArticle = (id) =>
  articleApi.delete(`/article/approve/${id}`, { headers: authHeader() });

export const createComment = (payload) =>
  articleApi.post(`/comment`, payload, { headers: authHeader() });
export const getComments = (id) => articleApi.get(`/comments/${id}`);

export const createAccount = (payload) =>
  accountApi.post(`/create-account`, payload);
export const loginAccount = (payload) => accountApi.post(`/login`, payload);
export const updateUsername = (payload) =>
  accountApi.put("/username", payload, { headers: authHeader() });

const apis = {
  createArticle,
  getAllArticles,
  getArticleById,
  createComment,
  getComments,
  createAccount,
  loginAccount,
  approveArticle,
  deleteArticle,
  updateUsername,
};

export default apis;
