import { API } from "../lib/api";

export const useProducts = () => {
  const getAllProducts = async () => {
    try {
      const { data } = await API.get("/products");
      console.log("Fetched products:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };

  return { getAllProducts };
};
