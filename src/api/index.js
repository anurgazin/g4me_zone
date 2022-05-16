import axios from "axios";

const api = axios.create({
  baseURL: "https://g4me-zone-api.herokuapp.com/api",
});

export const createArticle = (payload) => api.post(`/article`, payload);
export const getAllArticles = () => api.get(`/articles`);
export const getArticleById = (id) => api.get(`/article/${id}`);

const apis = {
  createArticle,
  getAllArticles,
  getArticleById,
};

export default apis;
