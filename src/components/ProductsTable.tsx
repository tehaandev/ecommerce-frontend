import { useProducts } from "../hooks/useProducts";
import { ProductsTableProps } from "../interfaces/props";
import { Button, Image } from "antd";

export default function ProductsTable({ products }: ProductsTableProps) {
  const { deleteProduct } = useProducts();
  const defaultHeaderRowClassName =
    "text-ecommerce-blue py-5 text-left font-black";
  const columns = [
    {
      name: "SKU",
      key: "sku",
      className: `${defaultHeaderRowClassName} col-span-2`,
    },
    {
      name: "IMAGE",
      key: "image",
      className: `${defaultHeaderRowClassName} col-span-2`,
    },
    {
      name: "PRODUCT NAME",
      key: "product-name",
      className: `${defaultHeaderRowClassName} col-span-3`,
    },
    {
      name: "DESCRIPTION",
      key: "description",
      className: `${defaultHeaderRowClassName} col-span-6`,
    },
    {
      name: "QTY",
      key: "qty",
      className: `${defaultHeaderRowClassName} col-span-2`,
    },
    {
      name: "PRICE",
      key: "price",
      className: `${defaultHeaderRowClassName} col-span-2`,
    },
    {
      name: "ACTIONS",
      key: "actions",
      className: `${defaultHeaderRowClassName} col-span-3`,
    },
  ];

  const getThumbnailUrl = (
    image: { _id: string; imageUri: string }[],
    thumbnailId: string,
  ) => {
    const baseUrl = import.meta.env.VITE_API_URL_STATIC;
    const thumbnail = image.find((img) => img._id === thumbnailId);
    return encodeURI(`${baseUrl}/${thumbnail?.imageUri}`);
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="grid grid-cols-20 gap-4">
          {columns.map((column) => (
            <th key={column.key} className={column.className}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr
            className="border-b-ecommerce-gray/30 grid grid-cols-20 gap-4 border-b py-3"
            key={product._id}>
            <td className="col-span-2">{product.sku}</td>
            <td className="col-span-2">
              <img
                src={getThumbnailUrl(product.images, product.thumbnail)}
                alt={product.name}
                className="h-16 w-16 object-cover"
              />
            </td>
            <td className="col-span-3">{product.name}</td>
            <td className="col-span-6">{product.description}</td>
            <td className="col-span-2">{product.qty}</td>
            <td className="col-span-2">${product.price}</td>
            <td className="col-span-3">
              <Button
                onClick={() => deleteProduct(product._id)}
                type="text"
                className="!p-2">
                <Image preview={false} src="/delete-icon.svg" />
              </Button>
              <Button type="text" className="!p-2">
                <Image preview={false} src="/edit-icon.svg" />
              </Button>
              <Button type="text" className="!p-2">
                <Image preview={false} src="/star.svg" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
