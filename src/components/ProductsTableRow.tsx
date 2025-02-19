import { useProducts } from "../hooks/useProducts";
import { ProductsTableRowProps } from "../interfaces/props";
import getThumbnailUrl from "../utils/getThumbnailUrl";
import { Button, Image, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ProductsTableRow({ product }: ProductsTableRowProps) {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const showDeleteModal = () => {
    setDeleteModal(true);
  };
  const hideDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(product._id);
    hideDeleteModal();
  };

  const checkIsFavorite = useCallback(() => {
    const favoritesArr = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites")!)
      : [];
    setIsFavorite(favoritesArr.includes(product._id));
  }, [product._id]); // Only depends on product._id

  useEffect(() => {
    checkIsFavorite();
  }, [checkIsFavorite]);

  const favoriteProduct = (id: string) => {
    const favoritesArr = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites")!)
      : [];
    if (favoritesArr.includes(id)) {
      const newFavorites = favoritesArr.filter((fav: string) => fav !== id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favoritesArr, id]));
    }
    checkIsFavorite();
  };

  const handleEditProduct = () => {
    navigate(`/edit-product/${product._id}`);
  };
  return (
    <>
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
            onClick={() => showDeleteModal()}
            type="text"
            className="!p-2">
            <Image preview={false} src="/delete-icon.svg" />
          </Button>
          <Button onClick={handleEditProduct} type="text" className="!p-2">
            <Image preview={false} src="/edit-icon.svg" />
          </Button>
          <Button
            onClick={() => favoriteProduct(product._id)}
            type="text"
            className="!p-2">
            {isFavorite ? (
              <Image preview={false} src="/starred.svg" />
            ) : (
              <Image preview={false} src="/star.svg" />
            )}
          </Button>
        </td>
      </tr>
    </>
  );
}
