import { Product } from "./product";

export interface ProductsTableProps {
  products?: Product[];
}

export interface ProductsTableRowProps {
  product: Product;
}

export interface EditProductFormProps {
  product: Product;
}
