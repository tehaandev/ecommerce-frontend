import { ProductsTableProps } from "../interfaces/props";
import ProductsTableRow from "./ProductsTableRow";

export default function ProductsTable({ products }: ProductsTableProps) {
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
        {products && products.length > 0 ? (
          products?.map((product) => (
            <ProductsTableRow key={product._id} product={product} />
          ))
        ) : (
          <p className="text-ecommerce-gray py-20 text-center">
            No products found
          </p>
        )}
      </tbody>
    </table>
  );
}
