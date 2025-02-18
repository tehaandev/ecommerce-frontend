import EditProductForm from "../components/product/EditProductForm";
import { useProducts } from "../hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { Image } from "antd";
import { useParams } from "react-router";

export default function EditProductPage() {
  const { getProductById } = useProducts();
  const { id } = useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => await getProductById(id!),
    enabled: !!id,
  });
  if (isLoading || !product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-10">
      <div className="flex items-center space-x-2">
        <h1 className="text-3xl font-bold tracking-wider">PRODUCTS</h1>
        <Image src="/arrow.svg" alt="Breadcrumb arrow" />
        <h2 className="text-ecommerce-blue text-xl font-medium">
          Edit product
        </h2>
      </div>
      <div className="my-10 w-2/3">
        <EditProductForm product={product} />
      </div>
    </div>
  );
}
