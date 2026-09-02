import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Beer,
  Snowflake,
  GlassWater,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Users,
  Calendar,
  Clock,
  Package,
  Minus, 
  Plus,
} from "lucide-react";

import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import { useEvent } from "../context/EventContext";
import { calculateRecommendation } from "../utils/recommendationCalculator";

function Recommendation() {

  const [isTotalVisible, setIsTotalVisible] = useState(false);

  const totalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!totalRef.current) return;

      const rect = totalRef.current.getBoundingClientRect();

      // Si el bloque original todavía está abajo
      setIsTotalVisible(rect.top <= window.innerHeight - 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();
  const { eventData } = useEvent();

  const recommendation = useMemo(() => {
    return calculateRecommendation(eventData);
  }, [eventData]);

  const getProductIcon = (category: string) => {
    switch (category) {
      case "beer":
        return Beer;

      case "ice":
        return Snowflake;

      case "softDrinks":
        return GlassWater;

      default:
        return Package;
    }
  };

  const getEventName = () => {
    const names: Record<string, string> = {
      cumpleanos: "Cumpleaños",
      boda: "Boda",
      reunion: "Reunión o fiesta",
      corporativo: "Evento corporativo",
      otro: "Otro evento",
    };

    return names[eventData.eventType] || "Tu evento";
  };

  const formatDate = (date: string) => {
    if (!date) return "Por definir";

    return new Date(`${date}T12:00:00`).toLocaleDateString(
      "es-MX",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  const [quantities, setQuantities] = useState<
    Record<string, number>
  >(() => {
    const initialQuantities: Record<string, number> = {};
  
    recommendation.products.forEach((product) => {
      initialQuantities[product.id] =
        product.quantity;
    });
  
    return initialQuantities;
  });

  const updateQuantity = (
    productId: string,
    change: number
  ) => {
    setQuantities((prev) => ({
      ...prev,
  
      [productId]: Math.max(
        0,
        (prev[productId] || 0) + change
      ),
    }));
  };

  const getProductTotal = (productId: string) => {
    const product = recommendation.products.find(
      (item) => item.id === productId
    );
  
    if (!product) return 0;
  
    const quantity = quantities[productId] ?? 0;
  
    return quantity * product.unitPrice;
  };

  const estimatedTotal = recommendation.products.reduce(
  (total, product) => {
    const quantity = quantities[product.id] ?? 0;

    return total + quantity * product.unitPrice;
  },
  0
);

  return (
    <section className="min-h-screen bg-background py-10 lg:py-16">
      <Container>
        <div className="mx-auto max-w-5xl">

          {/* HEADER */}

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
              <Sparkles size={30} />
            </div>

            <span className="mt-6 block font-semibold text-primary">
              TU RECOMENDACIÓN PERSONALIZADA
            </span>

            <h1 className="mt-3 text-4xl font-bold text-brandDark sm:text-5xl">
              ¡Tu evento está tomando forma! 🎉
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
              Calculamos una recomendación inicial basada en la información
              que nos proporcionaste.
            </p>
          </div>

          {/* RESUMEN DEL EVENTO */}

          <Card className="mt-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              
              <div>
                <p className="text-sm font-medium text-zinc-500">
                  RESUMEN DEL EVENTO
                </p>

                <h2 className="mt-2 text-2xl font-bold text-brandDark">
                  {getEventName()}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Users size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500">
                      Invitados
                    </p>

                    <p className="font-bold text-brandDark">
                      {eventData.guests || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Calendar size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500">
                      Fecha
                    </p>

                    <p className="font-bold text-brandDark">
                      {formatDate(eventData.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Clock size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500">
                      Duración
                    </p>

                    <p className="font-bold text-brandDark">
                      {eventData.duration
                        ? `${eventData.duration} horas`
                        : "—"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <button
              onClick={() => navigate("/crear-evento")}
              className="mt-6 text-sm font-semibold text-primary hover:underline"
            >
              Editar información
            </button>
          </Card>

          {/* PRODUCTOS RECOMENDADOS */}

          <div className="mt-12">
            <div>
              <span className="font-semibold text-primary">
                RECOMENDACIÓN
              </span>

              <h2 className="mt-2 text-3xl font-bold text-brandDark">
                Esto recomendamos para tu evento
              </h2>

              <p className="mt-3 text-zinc-600">
                Puedes revisar y modificar las cantidades antes de solicitar
                una cotización.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {recommendation.products.map((product) => {
                const Icon = getProductIcon(product.category);

                return (
                  <Card
                    key={product.id}
                    className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* ============================= */}
                    {/* IMAGEN DEL PRODUCTO */}
                    {/* ============================= */}
                  
                    <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-100 via-white to-primary/10 p-4 sm:h-48">
                  
                    {/* Decoración */}
                  
                    <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  
                    <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />
                  
                    {/* Badge superior */}
                  
                    <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
                      <Sparkles size={11} />
                      Recomendado
                    </div>
                  
                    {/* Imagen */}
                  
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="relative z-10 h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2"
                      />
                    ) : (
                      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-primary shadow-lg">
                        <Icon size={38} />
                      </div>
                    )}
                  
                    {/* Sombra debajo del producto */}
                  
                    <div className="absolute bottom-5 h-3 w-24 rounded-[100%] bg-black/10 blur-md" />
                  
                    {/* ============================= */}
                    {/* RECOMENDACIÓN INFERIOR */}
                    {/* ============================= */}
                  
                    <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between rounded-xl border border-white/40 bg-white/20 px-3 py-2 shadow-lg backdrop-blur-none">
                  
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-wider text-zinc-400">
                          Recomendado
                        </p>
                  
                        <p className="text-[10px] font-medium text-zinc-600">
                          Para tu evento
                        </p>
                      </div>
                  
                      <div className="text-right">
                        <p className="text-lg font-extrabold leading-none text-primary">
                          {product.recommendedQuantity}
                        </p>
                  
                        <p className="mt-0.5 text-[8px] font-bold uppercase text-primary/70">
                          {product.unit}
                          {product.recommendedQuantity !== 1 ? "es" : ""}
                        </p>
                      </div>
                  
                    </div>
                  
                  </div>
                  
                    {/* ============================= */}
                    {/* CONTENIDO */}
                    {/* ============================= */}
                  
                    <div className="p-4 sm:p-5">
                  
                      {/* Nombre */}
                  
                      <div className="min-h-[48px]">
                        <h3 className="truncate text-base font-extrabold text-brandDark sm:text-lg">
                          {product.name}
                        </h3>
                  
                        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-zinc-500 sm:text-xs">
                          {product.description}
                        </p>
                      </div>
                  
                      {/* ============================= */}
                      {/* SELECTOR DE CANTIDAD */}
                      {/* ============================= */}
                  
                      <div className="mt-4">
                  
                        <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                          Ajusta tu cantidad
                        </p>
                  
                        <div className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50 p-1.5">
                  
                          {/* MENOS */}
                  
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, -1)}
                            disabled={(quantities[product.id] ?? 0) === 0}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-brandDark shadow-sm transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
                          >
                            <Minus size={17} strokeWidth={2.5} />
                          </button>
                  
                          {/* CANTIDAD */}
                  
                          <div className="min-w-[55px] text-center">
                            <p className="text-xl font-extrabold leading-none text-brandDark sm:text-2xl">
                              {quantities[product.id] ?? 0}
                            </p>
                  
                            <p className="mt-1 text-[9px] font-medium text-zinc-400">
                              {product.unit}
                              {(quantities[product.id] ?? 0) !== 1 ? "es" : ""}
                            </p>
                          </div>
                  
                          {/* MÁS */}
                  
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/30 sm:h-10 sm:w-10"
                          >
                            <Plus size={17} strokeWidth={2.5} />
                          </button>
                  
                        </div>
                  
                      </div>
                  
                      {/* ============================= */}
                      {/* PRECIO */}
                      {/* ============================= */}
                  
                      <div className="mt-4 border-t border-zinc-100 pt-4">
                  
                        <div className="flex items-end justify-between gap-2">
                  
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                              Costo estimado
                            </p>
                  
                            <p className="mt-1 text-lg font-extrabold text-brandDark sm:text-xl">
                              $
                              {getProductTotal(product.id).toLocaleString(
                                "es-MX"
                              )}
                            </p>
                          </div>
                  
                          <div className="mb-1 text-right">
                            <p className="text-[9px] text-zinc-400">
                              por {product.unit}
                            </p>
                  
                            <p className="text-[11px] font-semibold text-zinc-500">
                              ${product.unitPrice.toLocaleString("es-MX")}
                            </p>
                          </div>
                  
                        </div>
                  
                      </div>
                  
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* TOTAL */}

          {!isTotalVisible && (
            <div className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-300 sm:bottom-6 sm:left-6 sm:right-6">
            
              <div className="rounded-2xl border border-white/20 bg-brandDark/80 p-4 shadow-2xl backdrop-blur-sm">
                    
                <div className="flex items-center justify-between gap-3">
                    
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                      Costo total estimado
                    </p>
                    
                    <p className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                      ${estimatedTotal.toLocaleString("es-MX")}
                    </p>
                  </div>
                    
                  <Link to="/cotizacion">
                    <Button className="whitespace-nowrap">
                      Continuar
                      <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                    
                </div>
                    
              </div>
                    
            </div>
          )}

          <div
            ref={totalRef}
            className="mt-12 rounded-3xl bg-brandDark p-8 text-white sm:p-10"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400">
                  COSTO TOTAL ESTIMADO
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  $
                  {estimatedTotal.toLocaleString("es-MX")}
                  {" "}
                  MXN
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  El precio puede variar dependiendo de los productos
                  disponibles.
                </p>
              </div>

              <Link to="/cotizacion">
                <Button className="w-full sm:w-auto">
                  Continuar a cotización
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* BOTÓN REGRESAR */}

          <button
            onClick={() => navigate("/crear-evento")}
            className="mx-auto mt-8 flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-primary"
          >
            <ArrowLeft size={18} />
            Regresar y modificar evento
          </button>

        </div>
      </Container>
    </section>
  );
}

export default Recommendation;
