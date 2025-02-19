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

export interface EditFormValues {
  sku: string;
  name: string;
  description: string;
  price: number;
  qty: number;
  thumbnail: string;
  existingImages: {
    _id: string;
    imageUri: string;
  }[];
  newImages: File[];
}

export interface SuggestedProduct {
  _id: string;
  name: string;
  sku: string;
}
