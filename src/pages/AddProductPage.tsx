import AddProductForm from "../components/product/AddProductForm";
import { Image } from "antd";

export default function AddProductPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center space-x-2">
        <h1 className="text-3xl font-bold tracking-wider">PRODUCTS</h1>
        <Image src="/arrow.svg" alt="Breadcrumb arrow" />
        <h2 className="text-ecommerce-blue text-xl font-medium">
          Add new product
        </h2>
      </div>
      <div className="my-10 w-2/3">
        <AddProductForm />
      </div>
    </div>
  );
}
