import { useProducts } from "../hooks/useProducts";
import { ProductsTableProps } from "../interfaces/props";
import { Button, Image, Modal } from "antd";
import { useState } from "react";

export default function ProductsTable({ products }: ProductsTableProps) {
  const { deleteProduct } = useProducts();
  const [deleteModal, setDeleteModal] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
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

  const showDeleteModal = (id: string) => {
    setSelectedProduct(id);
    setDeleteModal(true);
  };
  const hideDeleteModal = () => {
    setSelectedProduct(null);
    setDeleteModal(false);
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct);
      hideDeleteModal();
    }
  };

  return (
    <table className="w-full">
      <Modal
        centered
        open={deleteModal}
        onOk={hideDeleteModal}
        onCancel={hideDeleteModal}
        closable
        footer={[]}>
        <div className="flex flex-col items-center justify-center space-y-3">
          <Image src="/alert.svg" preview={false} alt="alert" />
          <div className="text-center">
            <h2 className="text-xl font-medium">ARE YOU SURE?</h2>
            <p>You will not be able to undo this action if you proceed!</p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={hideDeleteModal} type="default">
              Cancel
            </Button>
            <Button onClick={handleDeleteProduct} type="primary">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
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
                onClick={() => showDeleteModal(product._id)}
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
