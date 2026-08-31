export type ProductCategory =
  | "beer"
  | "ice"
  | "softDrinks";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;

  image?: string;

  unit: string;

  price: number;

  unitsPerPackage?: number;
}

export const products: Product[] = [
  // =========================
  // 🍺 CERVEZAS
  // =========================

  {
    id: "xx-lager-200",
    name: "XX Lager",

    description:
      "Cerveza de 200 ml · Cartón de 20 piezas",

    category: "beer",

    image: "/images/products/xx-lager.png",

    unit: "cartón",

    price: 160,

    unitsPerPackage: 20,
  },

  {
    id: "indio-200",
    name: "Indio",

    description:
      "Cerveza de 200 ml · Cartón de 20 piezas",

    category: "beer",

    image: "/images/products/indio.png",

    unit: "cartón",

    price: 155,

    unitsPerPackage: 20,
  },

  // =========================
  // 🧊 HIELO
  // =========================

  {
    id: "ice-bag",

    name: "Bolsa de hielo",

    description:
      "Hielo para mantener tus bebidas frías",

    category: "ice",

    unit: "bolsa",

    price: 45,
  },

  // =========================
  // 🥤 REFRESCOS
  // =========================

  {
    id: "soft-drink-pack",

    name: "Paquete de refrescos",

    description:
      "Variedad de bebidas sin alcohol",

    category: "softDrinks",

    unit: "paquete",

    price: 180,
  },
];