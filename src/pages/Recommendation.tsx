import { useMemo, useState } from "react";
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
} from "lucide-react";

import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import { useEvent } from "../context/EventContext";
import { calculateRecommendation } from "../utils/recommendationCalculator";

function Recommendation() {
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
                    className="relative overflow-hidden"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon size={28} />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-brandDark">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      Cantidad recomendada
                    </p>

                    <div className="mt-6">

                      <p className="text-sm text-zinc-500">
                        Cantidad para tu evento
                      </p>

                      <div className="mt-3 flex items-center justify-between rounded-2xl bg-zinc-50 p-2">

                        {/* MENOS */}

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, -1)
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-bold text-brandDark shadow-sm transition hover:bg-primary hover:text-white"
                        >
                          −
                        </button>
                      
                        {/* CANTIDAD */}
                      
                        <div className="text-center">
                      
                          <p className="text-2xl font-extrabold text-brandDark">
                            {quantities[product.id] || 0}
                          </p>
                      
                          <p className="text-xs text-zinc-500">
                            {product.unit}
                            {(quantities[product.id] || 0) !== 1
                              ? "es"
                              : ""}
                          </p>
                            
                        </div>
                            
                        {/* MÁS */}
                            
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, 1)
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white shadow-lg shadow-primary/20 transition hover:scale-105"
                        >
                          +
                        </button>
                      
                      </div>
                      
                      {/* RECOMENDACIÓN ORIGINAL */}
                      
                      <p className="mt-3 text-center text-xs text-zinc-500">
                      
                        Recomendado:{" "}
                      
                        <span className="font-bold text-primary">
                          {product.recommendedQuantity}{" "}
                          {product.unit}
                          {product.recommendedQuantity !== 1
                            ? "es"
                            : ""}
                        </span>
                        
                      </p>
                        
                    </div>

                    <p className="mt-1 text-sm font-medium text-zinc-600">
                      {product.unit}
                      {product.quantity !== 1 ? "s" : ""}
                    </p>

                    <div className="mt-6 border-t border-zinc-100 pt-5">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                            Costo estimado
                          </p>

                          <p className="mt-1 text-xl font-extrabold text-brandDark">
                            $
                            {getProductTotal(product.id).toLocaleString(
                              "es-MX"
                            )}{" "}
                            MXN
                          </p>
                        </div>
                        
                        <p className="text-xs text-zinc-500">
                          ${product.unitPrice.toLocaleString("es-MX")} c/u
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* TOTAL */}

          <div className="mt-12 rounded-3xl bg-brandDark p-8 text-white sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400">
                  COSTO ESTIMADO
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
