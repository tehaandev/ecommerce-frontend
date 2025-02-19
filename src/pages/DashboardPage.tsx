import ProductsTable from "../components/ProductsTable";
import SearchBar from "../components/SearchBar";
import { useProducts } from "../hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { Button, Image } from "antd";

export default function DashboardPage() {
  const { getAllProducts } = useProducts();
  const { data: products } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: async () => {
      return await getAllProducts();
    },
  });
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold tracking-wider">PRODUCTS</h1>
      <div className="grid grid-cols-2 gap-4">
        <SearchBar />
        <div className="flex items-center justify-end gap-4">
          <Button
            href="/add-product"
            type="primary"
            size="large"
            className="!rounded-md">
            New Product
          </Button>
          <Button
            href="/favorites"
            type="default"
            size="large"
            className="!rounded-md">
            <Image preview={false} src="/starred.svg" />
          </Button>
        </div>
      </div>
      <div>
        <ProductsTable products={products} />
      </div>
    </div>
  );
}
