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
  promoPrice?: number;

  stock: number;

  unitsPerPackage?: number;

  litersPerUnit?: number;
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

    price: 180,
    promoPrice: 160,

    stock: 12,

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

    price: 170,
    promoPrice: 155,

    stock: 12,
    

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

    price: 170,
    promoPrice: 155,

    stock: 0,

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

    image: "/images/products/bolsa-hielo.png",

    unit: "bolsa",

    price: 45,

    stock: 50
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

    price: 190,

    stock: 12,

    unitsPerPackage: 8,

    litersPerUnit: 2,
  },
  {
    id: "Jarrito-limon-2l",

    name: "Jarritos Toronja 2L",

    description: "Refresco · Caja con 8 piezas",

    category: "softDrinks",

    image: "/images/products/jarrito-toronja.png",

    unit: "paquete",

    price: 180,

    stock: 12,

    unitsPerPackage: 8,

    litersPerUnit: 2,
  },
  {
    id: "Jarrito-manzana-2l",

    name: "Jarritos Manzana 2L",

    description: "Refresco · Caja con 8 piezas",

    category: "softDrinks",

    image: "/images/products/jarrito-manzana.png",

    unit: "paquete",

    price: 180,

    stock: 12,

    unitsPerPackage: 8,

    litersPerUnit: 2,
  },
];