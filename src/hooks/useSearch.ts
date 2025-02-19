import { Product, SuggestedProduct } from "../interfaces/product";
import { API } from "../lib/api";

export const useSearch = () => {
  const searchProducts = async (query: string) => {
    try {
      const { data } = await API.get(`/search/${query}`);
      return data as Product[];
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };

  const getSearchSuggestions = async (query: string) => {
    try {
      const { data } = await API.get(`/search/suggestions/${query}`);
      return data as SuggestedProduct[];
    } catch (error) {
      console.error("Failed to fetch search suggestions:", error);
      return [];
    }
  };

  return { searchProducts, getSearchSuggestions };
};
