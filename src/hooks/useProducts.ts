import { Product, ProductFormValues } from "../interfaces/product";
import { API, getHTTPErrorMessage } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useProducts = () => {
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      const { data } = await API.get("/products");
      console.log("Fetched products:", data);
      return data as Product[];
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };

  const createProduct = async (product: ProductFormValues) => {
    try {
      const formData = new FormData();
      formData.append("sku", product.sku);
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      formData.append("qty", product.qty.toString());
      for (let i = 0; i < product.images.length; i++) {
        formData.append("images", product.images[i]);
      }
      const { data } = await API.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Created product:", data);
      toast.success("Product created successfully");
      navigate("/");
    } catch (error) {
      toast.error(getHTTPErrorMessage(error, "Failed to create product"));
      console.error("Failed to create product:", error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await API.delete(`/products/${productId}`);
      toast.success("Product deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(getHTTPErrorMessage(error, "Failed to delete product"));
      console.error("Failed to delete product:", error);
    }
  };

  const filterFavorites = (products: Product[]) => {
    const favoritesArr = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites")!)
      : [];
    return products.filter((product) => favoritesArr.includes(product._id));
  };

  return { getAllProducts, createProduct, deleteProduct, filterFavorites };
};
