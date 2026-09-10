import { useEffect, useState } from "react";
import {
  X,
  Beer,
  Check,
  CheckCircle2,
  Tag,
} from "lucide-react";
import type { Product } from "../../data/products";
import Button from "../ui/Button";

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  products: Product[];
  selectedIds: string[];
  onConfirm: (selectedIds: string[]) => void;
}

function ProductSelectionModal({
  isOpen,
  onClose,
  title,
  subtitle,
  products,
  selectedIds,
  onConfirm,
}: ProductSelectionModalProps) {
  const [selected, setSelected] =
    useState<string[]>(selectedIds);

  useEffect(() => {
    setSelected(selectedIds);
  }, [selectedIds, isOpen]);

  useEffect(() => {
    document.body.style.overflow =
      isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleProduct = (product: Product) => {
    // No permite seleccionar productos agotados
    if (product.stock <= 0) {
      return;
    }

    setSelected((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter(
          (productId) => productId !== product.id
        );
      }

      return [...prev, product.id];
    });
  };

  const handleConfirm = () => {
    onConfirm(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
      {/* OVERLAY */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar modal"
        className="absolute inset-0 bg-brandDark/60 backdrop-blur-md"
      />

      {/* MODAL */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:max-h-[85vh] sm:rounded-[2rem]">
        {/* HEADER */}
        <div className="relative overflow-hidden border-b border-zinc-100 px-6 py-8 sm:px-8">
          {/* DECORACIÓN */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative flex items-start justify-between">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                <Beer size={26} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Personaliza tu evento
                </p>

                <h2 className="mt-1 text-2xl font-extrabold text-brandDark">
                  {title}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 transition hover:rotate-90 hover:bg-zinc-100 hover:text-brandDark"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              const isSelected =
                selected.includes(product.id);

              const inStock = product.stock > 0;

              const hasPromotion =
                product.promoPrice !== undefined &&
                product.promoPrice < product.price;

              const discount = hasPromotion
                ? Math.round(
                    ((product.price -
                      product.promoPrice!) /
                      product.price) *
                      100
                  )
                : 0;

              return (
                <button
                  key={product.id}
                  type="button"
                  disabled={!inStock}
                  onClick={() => toggleProduct(product)}
                  className={`
                    group relative overflow-hidden rounded-xl
                    border-2 text-left
                    transition-all duration-300

                    ${
                      !inStock
                        ? "cursor-not-allowed border-zinc-200 bg-zinc-100 opacity-70"
                        : isSelected
                        ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                        : "border-zinc-200 bg-white hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                    }
                  `}
                >
                  {/* CHECK */}
                  <div
                    className={`
                      absolute right-4 top-4 z-20 flex h-8 w-8
                      items-center justify-center rounded-full border-2
                      transition-all

                      ${
                        isSelected
                          ? "border-primary bg-primary text-white"
                          : "border-white bg-white/90 text-transparent shadow-sm"
                      }
                    `}
                  >
                    <Check size={17} strokeWidth={3} />
                  </div>

                  {/* PROMOCIÓN */}
                  {hasPromotion && (
                    <div className="absolute left-3 top-3 z-20">
                      <span className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-extrabold text-white shadow-lg">
                        <Tag size={11} />
                        -{discount}%
                      </span>
                    </div>
                  )}

                  {/* DISPONIBILIDAD */}
                  <div
                    className={`
                      absolute left-3 z-20
                      ${
                        hasPromotion
                          ? "top-10"
                          : "top-3"
                      }
                    `}
                  >
                    
                  </div>

                  {/* IMAGE */}
                  <div className="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-50 to-zinc-100 p-2">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`
                          h-full max-w-full object-contain
                          transition-transform duration-500

                          ${
                            isSelected
                              ? "scale-110"
                              : "group-hover:scale-110"
                          }

                          ${
                            !inStock
                              ? "grayscale"
                              : ""
                          }
                        `}
                      />
                    ) : (
                      <Beer
                        size={70}
                        className="text-primary/30"
                      />
                    )}

                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/5 to-transparent" />
                  </div>

                  {/* INFO */}
                  <div className="p-2">
                    <h3 className="text-xl font-extrabold text-brandDark">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                      {product.description}
                    </p>

                    {/* PRECIO */}
                    <div className="mt-3 flex items-end justify-between gap-2">
                      <div>
                        {hasPromotion ? (
                          <>
                            <span className="block text-xs font-semibold text-zinc-400 line-through">
                              $
                              {product.price.toLocaleString(
                                "es-MX"
                              )}{" "}
                              MXN
                            </span>

                            <span className="text-sm font-extrabold text-primary">
                              $
                              {product.promoPrice!.toLocaleString(
                                "es-MX"
                              )}{" "}
                              MXN
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-primary">
                            $
                            {product.price.toLocaleString(
                              "es-MX"
                            )}{" "}
                            MXN
                          </span>
                        )}
                      </div>

                      {isSelected && (
                        <div className="flex items-center gap-1 text-xs font-bold text-primary">
                          <CheckCircle2 size={14} />
                          Seleccionada
                        </div>
                      )}
                    </div>

                    {/* STOCK */}
                    <div className="mt-2">
                      {inStock ? (
                        <p className="text-[11px] font-semibold text-green-600">
                          ✓ Disponible
                        </p>
                      ) : (
                        <p className="text-[11px] font-semibold text-red-500">
                          Producto agotado
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-zinc-100 bg-white px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-500">
              <span className="font-bold text-brandDark">
                {selected.length}
              </span>{" "}
              {selected.length === 1
                ? "producto seleccionado"
                : "productos seleccionados"}
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancelar
              </Button>

              <Button
                onClick={handleConfirm}
                disabled={selected.length === 0}
              >
                Confirmar selección
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSelectionModal;