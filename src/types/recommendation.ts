export interface RecommendedProduct {
  id: string;

  name: string;

  description: string;

  image?: string;

  category: "beer" | "ice" | "softDrinks";

  quantity: number;

  recommendedQuantity: number;

  unit: string;

  unitPrice: number;

  total: number;
}

export interface RecommendationResult {
  products: RecommendedProduct[];

  total: number;
}