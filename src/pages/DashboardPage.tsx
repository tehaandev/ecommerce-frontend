import ProductsTable from "../components/ProductsTable";
import { useProducts } from "../hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { Button, Image, Input } from "antd";
import { Search } from "lucide-react";

export default function DashboardPage() {
  const { getAllProducts } = useProducts();
  const { data } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: async () => {
      return await getAllProducts();
    },
  });
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-black">PRODUCTS</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex gap-4">
          <Input className="!border-none" placeholder="Search for products" />
          <div>
            <Button
              icon={<Search size={16} />}
              type="primary"
              className="!rounded-full">
              Search
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            href="/add-product"
            type="primary"
            size="large"
            className="!rounded-md">
            New Product
          </Button>
          <Button type="default" size="large" className="!rounded-md">
            <Image preview={false} src="/starred.svg" />
          </Button>
        </div>
      </div>
      <div>
        <ProductsTable />
      </div>
    </div>
  );
}
