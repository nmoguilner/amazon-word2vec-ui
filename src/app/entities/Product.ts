export class Product {
  asin: string;
  title: string;
  description: string;
  brand: string;
  price: string;
  categories: string[];
  imUrl: string;
  recommended: Product[] = [];
}
