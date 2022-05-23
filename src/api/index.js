import axios from "axios";

const articleApi = axios.create({
  baseURL: "https://g4me-zone-api.herokuapp.com/api",
});
const accountApi = axios.create({
  baseURL: "https://g4me-zone-api.herokuapp.com/account",
});

export const createArticle = (payload) => articleApi.post(`/article`, payload);
export const getAllArticles = () => articleApi.get(`/articles`);
export const getArticleById = (id) => articleApi.get(`/article/${id}`);
export const createComment = (payload) => articleApi.post(`/comment`, payload);
export const getComments = (id) => articleApi.get(`/comments/${id}`);

export const createAccount = (payload) =>
  accountApi.post(`/create-account`, payload);
export const loginAccount = (payload) => accountApi.post(`/login`, payload);

const apis = {
  createArticle,
  getAllArticles,
  getArticleById,
  createComment,
  getComments,
  createAccount,
  loginAccount,
};

export default apis;
