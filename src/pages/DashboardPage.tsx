import ProductsTable from "../components/product/ProductsTable";
import SearchBar from "../components/search/SearchBar";
import MainLayout from "../components/ui/MainLayout";
import { useProducts } from "../hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { Button, Image } from "antd";
import { Link } from "react-router";

export default function DashboardPage() {
  const { getAllProducts } = useProducts();
  const { data: products } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: async () => {
      return await getAllProducts();
    },
  });
  return (
    <MainLayout>
      <div className="space-y-10">
        <div className="text-3xl font-bold tracking-wider">
          <Link to={"/"}>PRODUCTS</Link>
        </div>
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
    </MainLayout>
  );
}
