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
  {
    id: "tecate-200",
    name: "Tecate",

    description:
      "Cerveza de 200 ml · Cartón de 20 piezas",

    category: "beer",

    image: "/images/products/tecate.png",

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
    id: "Jarrito-pina-2l",

    name: "Jarritos Pina 2L",

    description: "Refresco · Caja con 8 piezas",

    category: "softDrinks",

    image: "/images/products/jarrito-pina.png",

    unit: "paquete",

    price: 180,
  },
  {
    id: "Jarrito-limon-2l",

    name: "Jarritos Toronja 2L",

    description: "Refresco · Caja con 8 piezas",

    category: "softDrinks",

    image: "/images/products/jarrito-toronja.png",

    unit: "paquete",

    price: 180,
  },
];