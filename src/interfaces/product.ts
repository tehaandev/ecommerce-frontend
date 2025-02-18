export interface Product {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  qty: number;
  images: {
    _id: string;
    imageUri: string;
  }[];
  thumbnail: string;
  isFavorite?: boolean;
}

export interface ProductFormValues {
  sku: string;
  name: string;
  description: string;
  price: number;
  qty: number;
  images: File[];
}
