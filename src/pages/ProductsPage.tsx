import { useMemo, useState } from "react";
import {
  Search,
  Beer,
  GlassWater,
  Snowflake,
  ShoppingCart,
} from "lucide-react";
import { products, type ProductCategory } from "../data/products";
import Container from "../components/layout/Container";

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
        <Container className="py-14 sm:py-18 lg:py-20">
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

          {/* Resultado */}
          <div className="mt-8 flex items-center justify-between">
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
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => {
                const CategoryIcon = getCategoryIcon(
                  product.category
                );

                return (
                  <article
                    key={product.id}
                    className="
                      group overflow-hidden
                      rounded-3xl
                      border border-zinc-200
                      bg-white
                      shadow-sm
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                    "
                  >
                    {/* Imagen */}
                    <div className="relative aspect-square overflow-hidden bg-zinc-100">
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
                        <div className="flex h-full w-full items-center justify-center text-zinc-300">
                          <CategoryIcon
                            size={52}
                            strokeWidth={1.5}
                          />
                        </div>
                      )}

                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-700 shadow-sm backdrop-blur">
                          {getCategoryLabel(product.category)}
                        </span>
                      </div>
                    </div>

                    {/* Información */}
                    <div className="p-4 sm:p-5">
                      <h2 className="line-clamp-1 text-sm font-bold text-brandDark sm:text-base">
                        {product.name}
                      </h2>

                      <p className="mt-1 line-clamp-2 min-h-[32px] text-xs leading-relaxed text-zinc-500 sm:text-sm">
                        {product.description}
                      </p>

                      <div className="mt-4">
                        <p className="text-lg font-extrabold text-brandDark sm:text-xl">
                          $
                          {product.price.toLocaleString(
                            "es-MX"
                          )}
                        </p>

                        <p className="mt-1 text-[11px] font-medium text-zinc-500 sm:text-xs">
                          {product.unit}
                          {product.unitsPerPackage
                            ? ` · ${product.unitsPerPackage} pzas`
                            : ""}
                        </p>
                      </div>

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