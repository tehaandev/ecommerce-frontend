import { useProducts } from "../hooks/useProducts";
import constructImageUrl from "../utils/constructImageUrl";
import getThumbnailUrl from "../utils/getThumbnailUrl";
import { useQuery } from "@tanstack/react-query";
import { Image } from "antd";
import { useParams } from "react-router";

export default function ViewProductPage() {
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
          View product
        </h2>
        <Image src="/arrow.svg" alt="Breadcrumb arrow" />
        <h2 className="text-ecommerce-blue text-xl font-medium">
          {product.name}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-20">
        <div className="grid grid-cols-3 gap-20">
          <div className="grid-row-5 grid gap-4">
            {product.images.map((image) => (
              <div key={image._id}>
                <Image
                  src={constructImageUrl(image.imageUri)}
                  alt={product.name}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <Image
              src={getThumbnailUrl(product.images, product.thumbnail)}
              alt={product.name}
              className="mx-auto"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <div>
            <p className="text-ecommerce-gray">SKU: {product.sku}</p>
            <h1 className="text-ecommerce-black text-xl font-medium">
              {product.name}
            </h1>
            <p>{product.description}</p>
          </div>
          <p className="bg-ecommerce-blue text-ecommerce-white w-max px-4 py-2 text-lg font-medium">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
}
