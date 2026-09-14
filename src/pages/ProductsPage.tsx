import { useMemo, useState } from "react";
import {
  Search,
  Beer,
  GlassWater,
  Snowflake,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { products, type ProductCategory } from "../data/products";
import Container from "../components/layout/Container";
import { Link } from "react-router-dom";

type CategoryFilter = "all" | ProductCategory;

function ProductsPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const getCategoryLabel = (productCategory: ProductCategory) => {
    switch (productCategory) {
      case "beer":
        return "Cervezas";

      case "softDrinks":
        return "Sin alcohol";

      case "ice":
        return "Hielo";

      default:
        return "";
    }
  };

  const getCategoryIcon = (productCategory: ProductCategory) => {
    switch (productCategory) {
      case "beer":
        return Beer;

      case "softDrinks":
        return GlassWater;

      case "ice":
        return Snowflake;

      default:
        return ShoppingCart;
    }
  };

  const filters = [
    {
      value: "all" as CategoryFilter,
      label: "Todos",
    },
    {
      value: "beer" as CategoryFilter,
      label: "Cervezas",
    },
    {
      value: "softDrinks" as CategoryFilter,
      label: "Sin alcohol",
    },
    {
      value: "ice" as CategoryFilter,
      label: "Hielo",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-[76px] sm:pt-[82px]">
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white">
        <Container className="py-10 sm:py-10 lg:py-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
              Productos
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-brandDark sm:text-4xl lg:text-5xl">
              Todo lo que necesitas para tu evento
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base lg:text-lg">
              Encuentra bebidas y complementos para organizar
              tu evento de forma sencilla.
            </p>
          </div>
        </Container>
      </section>

      {/* Catálogo */}
      <section className="py-10 sm:py-14">
        <Container>
          {/* Controles */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Búsqueda */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Buscar producto..."
                className="
                  h-12 w-full rounded-2xl
                  border border-zinc-200
                  bg-white pl-11 pr-4
                  text-sm text-brandDark
                  outline-none
                  transition
                  placeholder:text-zinc-400
                  focus:border-primary
                  focus:ring-4
                  focus:ring-primary/10
                "
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const active = category === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setCategory(filter.value)}
                    className={`
                      rounded-full px-4 py-2.5
                      text-sm font-semibold
                      transition-all duration-200
                      ${
                        active
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50 hover:text-brandDark"
                      }
                    `}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Link
              to="/crear-evento"
              className="
                inline-flex items-center gap-2
                rounded-2xl
                bg-primary
                px-5 py-3
                text-sm font-bold text-white
                shadow-lg shadow-primary/20
                transition-all duration-200
                hover:bg-primary-light
                hover:-translate-y-0.5
                active:scale-[0.98]
              "
            >
              Crear mi evento
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Resultado */}
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "producto"
                : "productos"}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
           <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
             {filteredProducts.map((product) => {
               const CategoryIcon = getCategoryIcon(product.category);
             
               const hasPromotion =
                 product.promoPrice !== undefined &&
                 product.promoPrice < product.price;
             
               const discount = hasPromotion
                 ? Math.round(
                     ((product.price - product.promoPrice!) /
                       product.price) *
                       100
                   )
                 : 0;
                 
               const inStock = product.stock > 0;
                 
               return (
                 <article
                   key={product.id}
                   className="
                     group overflow-hidden
                     rounded-2xl
                     border border-zinc-200
                     bg-white
                     shadow-sm
                     transition-all duration-300
                     hover:-translate-y-1
                     hover:border-zinc-300
                     hover:shadow-lg
                   "
                 >
                   {/* IMAGEN */}
                   <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                     {product.image ? (
                       <img
                         src={product.image}
                         alt={product.name}
                         className="
                           h-full w-full object-cover
                           transition-transform duration-500
                           group-hover:scale-105
                         "
                       />
                     ) : (
                       <div className="flex h-full items-center justify-center text-zinc-300">
                         <CategoryIcon size={42} strokeWidth={1.5} />
                       </div>
                     )}
           
                     {/* DESCUENTO */}
                     {hasPromotion && (
                       <span className="
                         absolute left-2.5 top-2.5
                         rounded-full bg-primary
                         px-2 py-1
                         text-[9px] font-extrabold
                         text-white shadow-md
                         sm:left-3 sm:top-3
                         sm:px-2.5 sm:py-1.5
                         sm:text-[10px]
                       ">
                         -{discount}%
                       </span>
                     )}
           
                     {/* EXISTENCIA */}
                     <span
                       className={`
                         absolute right-2.5 top-2.5
                         rounded-full px-2 py-1
                         text-[9px] font-bold
                         shadow-sm backdrop-blur-sm
                         sm:right-3 sm:top-3
                         sm:px-2.5 sm:py-1.5
                         sm:text-[10px]
                         ${
                           inStock
                             ? "bg-white/90 text-green-600"
                             : "bg-white/90 text-red-500"
                         }
                       `}
                     >
                       {inStock ? "En stock" : "Agotado"}
                     </span>
                   </div>
                       
                   {/* CONTENIDO */}
                   <div className="p-3 sm:p-4">
                       
                     {/* NOMBRE */}
                     <h2 className="
                       truncate
                       text-sm
                       font-extrabold
                       text-brandDark
                       sm:text-base
                     ">
                       {product.name}
                     </h2>
                       
                     {/* PRESENTACIÓN */}
                     <p className="
                       mt-1
                       text-[10px]
                       font-medium
                       text-zinc-500
                       sm:text-xs
                     ">
                       {product.unit}
                       {product.unitsPerPackage
                         ? ` · ${product.unitsPerPackage} pzas`
                         : ""}
                     </p>
                       
                     {/* PRECIO */}
                     <div className="mt-3 flex items-end gap-2">
                       {hasPromotion ? (
                         <>
                           <span className="
                             text-[10px]
                             font-semibold
                             text-zinc-400
                             line-through
                             sm:text-xs
                           ">
                             ${product.price.toLocaleString("es-MX")}
                           </span>
                       
                           <span className="
                             text-lg
                             font-extrabold
                             leading-none
                             text-primary
                             sm:text-xl
                           ">
                             ${product.promoPrice!.toLocaleString("es-MX")}
                           </span>
                         </>
                       ) : (
                         <span className="
                           text-lg
                           font-extrabold
                           leading-none
                           text-brandDark
                           sm:text-xl
                         ">
                           ${product.price.toLocaleString("es-MX")}
                         </span>
                       )}
                     </div>
                     
                     {/* ESTADO / AHORRO */}
                     {hasPromotion ? (
                       <p className="
                         mt-1
                         text-[9px]
                         font-semibold
                         text-green-600
                         sm:text-[10px]
                       ">
                         Ahorras $
                         {(product.price - product.promoPrice!).toLocaleString(
                           "es-MX"
                         )}
                       </p>
                     ) : (
                       <p className="
                         mt-1
                         text-[9px]
                         text-zinc-400
                         sm:text-[10px]
                       ">
                         Precio regular
                       </p>
                     )}
                   </div>
                 </article>
               );
             })}
           </div>
          ) : (
            /* Sin resultados */
            <div className="mt-10 rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                <Search size={28} />
              </div>

              <h2 className="mt-5 text-lg font-bold text-brandDark">
                No encontramos productos
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
                Prueba con otro nombre o selecciona una
                categoría diferente.
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

export default ProductsPage;