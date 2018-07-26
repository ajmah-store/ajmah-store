import { Category } from "./category.model";

/**
 * Represents a product in ajmah
 */

export class Product {
    id?:any;
    featuredImageUrl?:string;
    name: string;
    category: Category;
    price: number;
    unit: string;
    description: string;
    featured?: boolean;
    discount?: number;
    createdAt?: Date;
    salesCount?: number;
  }