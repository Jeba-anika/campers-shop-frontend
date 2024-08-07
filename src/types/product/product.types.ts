export type TProductImg = {
  altText: string;
  url: string;
};
export type TCategory = {
  _id: string;
  categoryName: string;
  image: string;
};
export type TProduct = {
  _id: string;
  category: TCategory;
  productName: string;
  brand: string;
  price: number;
  stockQuantity: number;
  soldCount: number;
  isAvailable: boolean;
  productImagesLink: TProductImg[];
  features: object[];
  specifications: object[];
  extraInfo?: object[];
  description: string;
  rating: number;
};
