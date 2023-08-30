export interface IProductList {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  isDeleted?: boolean | null;
}