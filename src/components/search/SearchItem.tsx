import { Product } from "../../interfaces/product";
import BreadcrumbArrow from "../shared/BreadcrumbArrow";
import { useNavigate } from "react-router";

export default function SearchItem({ product }: { product: Product }) {
  const navigate = useNavigate();
  const handleViewProduct = () => {
    navigate(`/view-product/${product._id}`);
  };
  return (
    <div
      onClick={handleViewProduct}
      className="border-ecommerce-gray mx-auto flex w-2/3 cursor-pointer items-center justify-between border-b py-5 transition-all duration-300 hover:scale-[1.005]">
      <div className="space-y-3">
        <p className="text-ecommerce-blue font-semibold">#{product.sku}</p>
        <h1 className="text-lg font-semibold">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
      </div>
      <div className="float-right flex max-w-10">
        <BreadcrumbArrow />
      </div>
    </div>
  );
}
