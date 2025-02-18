import {
  EditFormValues,
  Product,
  ProductFormValues,
} from "../interfaces/product";
import { API, getHTTPErrorMessage } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useProducts = () => {
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      const { data } = await API.get("/products");
      return data as Product[];
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };

  const getProductById = async (productId: string) => {
    try {
      const { data } = await API.get(`/products/${productId}`);
      return data as Product;
    } catch (error) {
      console.error("Failed to fetch product:", error);
      return null;
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
      await API.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product created successfully");
      navigate("/");
    } catch (error) {
      toast.error(getHTTPErrorMessage(error, "Failed to create product"));
      console.error("Failed to create product:", error);
    }
  };

  const editProduct = async (product: EditFormValues, productId: string) => {
    try {
      const formData = new FormData();
      formData.append("sku", product.sku);
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      formData.append("qty", product.qty.toString());
      formData.append("thumbnail", product.thumbnail);
      formData.append("existingImages", JSON.stringify(product.existingImages));
      for (let i = 0; i < product.newImages.length; i++) {
        formData.append("newImages", product.newImages[i]);
      }
      await API.put(`/products/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Saved successfully");
      navigate("/");
    } catch (error) {
      toast.error(getHTTPErrorMessage(error, "Failed to edit product"));
      console.error("Failed to edit product:", error);
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

  return {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
    filterFavorites,
  };
};
