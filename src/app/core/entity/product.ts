export class Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number | null;

  constructor(object?: any) {
    this.id = object.id;
    this.title = object.title;
    this.description = object.description;
    this.price = object.price;
    this.discountPercentage = object.discountPercentage;
  }
}
