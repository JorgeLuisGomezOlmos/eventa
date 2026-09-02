import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Cake,
  Heart,
  Users,
  Crown,
  BriefcaseBusiness,
  PartyPopper,
  ArrowLeft,
  ArrowRight,
  Beer,
  Snowflake,
  GlassWater,
} from "lucide-react";

import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import StepProgress from "../components/event/StepProgress";
import EventTypeCard from "../components/event/EventTypeCard";

import { useEvent } from "../context/EventContext";
import type { EventType } from "../types/event";

import { products } from "../data/products";

import ProductSelectionModal from "../components/event/ProductSelectionModal";

function CreateEvent() {

  const [isBeerModalOpen, setIsBeerModalOpen] = useState(false);
  const [isSoftDrinkModalOpen, setIsSoftDrinkModalOpen] = useState(false);

  const beerProducts = products.filter(
  (product) => product.category === "beer"
);

  const softDrinkProducts = products.filter(
  (product) => product.category === "softDrinks"
);

  const navigate = useNavigate();
  const { eventData, setEventData } = useEvent();

  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 4;

  const eventTypes: {
    value: EventType;
    title: string;
    description: string;
    icon: any;
  }[] = [
    {
      value: "cumpleanos",
      title: "Cumpleaños",
      description: "Celebra un día especial.",
      icon: Cake,
    },
    {
      value: "boda",
      title: "Boda",
      description: "Planea tu celebración.",
      icon: Heart,
    },
    {
      value: "reunion",
      title: "Reunión o fiesta",
      description: "Una reunión con amigos.",
      icon: PartyPopper,
    },
    {
      value: "corporativo",
      title: "Evento corporativo",
      description: "Para tu empresa o equipo.",
      icon: BriefcaseBusiness,
    },
    {
      value: "xv_anos",
      title: "XV años",
      description: "Para una celebración unica",
      icon: Crown,
    },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/recomendacion");
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const updateEventData = (data: Partial<typeof eventData>) => {
    setEventData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (

    <>
    <section className="min-h-screen bg-background py-10 lg:py-16">
      <Container>
        <div className="mx-auto max-w-3xl">

          {/* ENCABEZADO */}

          <div className="mb-10 text-center">
            <span className="font-semibold text-primary">
              CREA TU EVENTO
            </span>

            <h1 className="mt-3 text-4xl font-bold text-brandDark sm:text-5xl">
              Vamos a organizar algo increíble 🎉
            </h1>

            <p className="mt-4 text-zinc-600">
              Cuéntanos algunos detalles para poder recomendarte
              lo que necesitas.
            </p>
          </div>

          <Card className="p-6 sm:p-10">

            <StepProgress
              currentStep={currentStep}
              totalSteps={totalSteps}
            />

            {/* ================= PASO 1 ================= */}

            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-brandDark">
                  ¿Qué tipo de evento estás organizando?
                </h2>

                <p className="mt-2 text-zinc-500">
                  Esto nos ayudará a entender mejor tu evento.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {eventTypes.map((event) => (
                    <EventTypeCard
                      key={event.value}
                      title={event.title}
                      description={event.description}
                      icon={event.icon}
                      selected={
                        eventData.eventType === event.value
                      }
                      onClick={() =>
                        updateEventData({
                          eventType: event.value,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ================= PASO 2 ================= */}

            {currentStep === 2 && (
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-brandDark">
                      ¿Cuántas personas asistirán?
                    </h2>

                    <p className="text-sm text-zinc-500">
                      Puedes modificarlo después.
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <label className="text-sm font-semibold text-brandDark">
                    Número de invitados
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={
                      eventData.guests === 0
                        ? ""
                        : eventData.guests
                    }
                    onChange={(e) =>
                      updateEventData({
                        guests: Number(e.target.value),
                      })
                    }
                    placeholder="Ejemplo: 100"
                    className="mt-3 w-full rounded-2xl border border-zinc-200 px-5 py-5 text-3xl font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[25, 50, 100].map((number) => (
                      <button
                        key={number}
                        type="button"
                        onClick={() =>
                          updateEventData({
                            guests: number,
                          })
                        }
                        className={`rounded-xl border py-3 font-semibold transition ${
                          eventData.guests === number
                            ? "border-primary bg-primary text-white"
                            : "border-zinc-200 hover:border-primary"
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ================= PASO 3 ================= */}

            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-brandDark">
                  Cuéntanos los detalles
                </h2>

                <p className="mt-2 text-zinc-500">
                  ¿Cuándo será tu evento y cuánto tiempo durará?
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-brandDark">
                      Fecha
                    </label>

                    <input
                      type="date"
                      value={eventData.date}
                      onChange={(e) =>
                        updateEventData({
                          date: e.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-brandDark">
                      Duración (horas)
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={
                        eventData.duration === 0
                          ? ""
                          : eventData.duration
                      }
                      onChange={(e) =>
                        updateEventData({
                          duration: Number(e.target.value),
                        })
                      }
                      placeholder="Ejemplo: 5"
                      className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= PASO 4 ================= */}

            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-brandDark">
                  ¿Qué necesitas para tu evento?
                </h2>

                <p className="mt-2 text-zinc-500">
                  Selecciona los productos que quieres incluir.
                </p>

                <div className="mt-8 space-y-4">

                  {/* CERVEZA */}

                  <button
                    type="button"
                    onClick={() => {
                  
                      if (!eventData.preferences.beer) {
                        updateEventData({
                          preferences: {
                            ...eventData.preferences,
                            beer: true,
                          },
                        });
                  
                        setIsBeerModalOpen(true);
                  
                        return;
                      }
                  
                      setIsBeerModalOpen(true);
                    }}
                    className={`flex w-full items-center justify-between rounded-2xl border-2 p-5 text-left transition ${
                      eventData.preferences.beer
                        ? "border-primary bg-primary/5"
                        : "border-zinc-200 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-primary/10 p-3 text-primary">
                        <Beer size={24} />
                      </div>

                      <div>
                        <h3 className="font-bold text-brandDark">
                          Cerveza
                        </h3>

                        <p className="text-sm text-zinc-500">
                          Recomendación según invitados.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`h-6 w-6 rounded-full border-2 ${
                        eventData.preferences.beer
                          ? "border-primary bg-primary"
                          : "border-zinc-300"
                      }`}
                    />
                  </button>

                  {/* HIELO */}

                  <button
                    type="button"
                    onClick={() =>
                      updateEventData({
                        preferences: {
                          ...eventData.preferences,
                          ice: !eventData.preferences.ice,
                        },
                      })
                    }
                    className={`flex w-full items-center justify-between rounded-2xl border-2 p-5 text-left transition ${
                      eventData.preferences.ice
                        ? "border-primary bg-primary/5"
                        : "border-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-blue-100 p-3 text-blue-500">
                        <Snowflake size={24} />
                      </div>

                      <div>
                        <h3 className="font-bold text-brandDark">
                          Hielo
                        </h3>

                        <p className="text-sm text-zinc-500">
                          Calcularemos una cantidad recomendada.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`h-6 w-6 rounded-full border-2 ${
                        eventData.preferences.ice
                          ? "border-primary bg-primary"
                          : "border-zinc-300"
                      }`}
                    />
                  </button>

                  {/* BEBIDAS SIN ALCOHOL*/}

                  <button
                    type="button"
                    onClick={() => {
                      // Activamos la categoría
                      updateEventData({
                        preferences: {
                          ...eventData.preferences,
                          softDrinks: true,
                        },
                      });
                    
                      // Abrimos el catálogo
                      setIsSoftDrinkModalOpen(true);
                    }}
                    className={`flex w-full items-center justify-between rounded-2xl border-2 p-5 text-left transition ${
                      eventData.preferences.softDrinks
                        ? "border-primary bg-primary/5"
                        : "border-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
                        <GlassWater size={24} />
                      </div>

                      <div>
                        <h3 className="font-bold text-brandDark">
                          Bebidas sin alcohol
                        </h3>

                        <p className="text-sm text-zinc-500">
                          Refrescos y otras bebidas.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">

                      {/* CANTIDAD DE BEBIDAS SELECCIONADAS */}
                                      
                      {eventData.selectedSoftDrinkIds.length > 0 && (
                        <span className="hidden text-xs font-bold text-primary sm:block">
                          {eventData.selectedSoftDrinkIds.length} seleccionada
                          {eventData.selectedSoftDrinkIds.length !== 1
                            ? "s"
                            : ""}
                        </span>
                      )}
                    
                      {/* INDICADOR */}
                    
                      <div
                        className={`h-6 w-6 rounded-full border-2 transition-colors duration-300 ${
                          eventData.preferences.softDrinks
                            ? "border-primary bg-primary"
                            : "border-zinc-300"
                        }`}
                      />
                    
                    </div>
                  </button>

                </div>
              </div>
            )}

            {/* ================= NAVEGACIÓN ================= */}

            <div className="mt-10 flex items-center justify-between border-t border-zinc-100 pt-6">
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={currentStep === 1}
                className={
                  currentStep === 1
                    ? "invisible"
                    : ""
                }
              >
                <ArrowLeft size={18} className="mr-2" />
                Anterior
              </Button>

              <Button onClick={nextStep}>
                {currentStep === totalSteps
                  ? "Generar recomendación"
                  : "Continuar"}

                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>

          </Card>
        </div>
      </Container>
    </section>

    <ProductSelectionModal
      isOpen={isBeerModalOpen}
      onClose={() => setIsBeerModalOpen(false)}
      title="Elige tus cervezas"
      subtitle="Puedes seleccionar una o varias opciones para tu evento."
      products={beerProducts}
      selectedIds={eventData.selectedBeerIds}
      onConfirm={(selectedIds) => {
        updateEventData({
          preferences: {
            ...eventData.preferences,
            beer: selectedIds.length > 0,
          },

          selectedBeerIds: selectedIds,
        });
      }}
    />

    <ProductSelectionModal
      isOpen={isSoftDrinkModalOpen}
      onClose={() => setIsSoftDrinkModalOpen(false)}
      title="Elige tus bebidas"
      subtitle="Selecciona las bebidas sin alcohol que quieres para tu evento."
      products={softDrinkProducts}
      selectedIds={eventData.selectedSoftDrinkIds}
      onConfirm={(selectedIds) => {
        updateEventData({
          preferences: {
            ...eventData.preferences,
            softDrinks: selectedIds.length > 0,
          },
          selectedSoftDrinkIds: selectedIds,
        });
      }}
    />
    </>
    
  );
}

export default CreateEvent;
