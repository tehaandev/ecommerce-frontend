export default function ProductsTable() {
  const columns = [
    {
      name: "SKU",
      key: "sku",
    },
    {
      name: "IMAGE",
      key: "image",
    },
    {
      name: "PRODUCT NAME",
      key: "product-name",
    },
    {
      name: "DESCRIPTION",
      key: "description",
    },
    {
      name: "PRICE",
      key: "price",
    },
    {
      name: "ACTIONS",
      key: "actions",
    },
  ];
  return (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="text-ecommerce-blue py-5 text-left font-black">
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#123</td>
          <td>IMAGE</td>
          <td>PRODUCT NAME</td>
          <td>DESCRIPTION</td>
          <td>PRICE</td>
          <td>ACTIONS</td>
        </tr>
      </tbody>
    </table>
  );
}
