export type TProductImg = {
  altText: string;
  url: string;
};
export type TProduct = {
  _id: string;
  category: string;
  productName: string;
  brand: string;
  price: string;
  stockQuantity: number;
  soldCount: number;
  isAvailable: boolean;
  productImagesLink: TProductImg[];
  features: object[];
  specifications: object[];
  extraInfo?: object[];
  description: string;
};
