export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  qty: number;
  images: {
    id: string;
    url: string;
  }[];
}

export interface ProductFormValues {
  sku: string;
  name: string;
  description: string;
  price: number;
  qty: number;
  images: File[];
}
