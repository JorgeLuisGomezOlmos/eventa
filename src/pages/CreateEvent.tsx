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
  CircleHelp,
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

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return eventData.eventType !== "";
  
      case 2:
        return eventData.guests > 0;
  
      case 3:
        return (
          eventData.date !== "" &&
          eventData.duration > 0
        );
  
      case 4:
        return (
          eventData.preferences.beer ||
          eventData.preferences.softDrinks ||
          eventData.preferences.ice
        );
  
      default:
        return false;
    }
  };

  return (

    <>
    <section className="min-h-screen bg-background py-24 lg:py-28
    
    
    
    ">
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
                    
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-semibold text-brandDark">
                          Duración (horas)
                        </label>

                        <div className="group relative">
                          <CircleHelp
                            size={16}
                            className="cursor-help text-zinc-400 transition-colors group-hover:text-primary"
                          />

                          <div
                            className="
                              pointer-events-none
                              absolute
                              left-1/2
                              top-full
                              z-50
                              mt-2
                              w-64
                              -translate-x-1/2
                              rounded-xl
                              bg-brandDark
                              px-4
                              py-3
                              text-xs
                              leading-relaxed
                              text-white
                              opacity-0
                              shadow-xl
                              transition-all
                              duration-200
                              group-hover:translate-y-1
                              group-hover:opacity-100
                            "
                          >
                            Indica cuántas horas durará aproximadamente tu evento.
                            Este dato nos ayuda a calcular mejor la cantidad de
                            bebidas que podrías necesitar.
                          </div>                    
                        </div>                    
                      </div>                  

                      {/* aquí va tu select de duración */}
                      <select
                        value={eventData.duration || ""}
                        onChange={(e) =>
                          updateEventData({
                            duration: Number(e.target.value),
                          })
                        }
                        className="
                          mt-2
                          w-full
                          rounded-xl
                          border
                          border-zinc-200
                          bg-white
                          px-4
                          py-3
                          text-brandDark
                          outline-none
                          transition
                          focus:border-primary
                          focus:ring-4
                          focus:ring-primary/10
                        "
                      >
                        <option value="" disabled>
                          Selecciona la duración
                        </option>
                      
                        <option value="2">2 horas</option>
                        <option value="3">3 horas</option>
                        <option value="4">4 horas</option>
                        <option value="5">5 horas</option>
                        <option value="6">6 horas</option>
                        <option value="7">7 horas</option>
                        <option value="8">8 horas</option>
                        <option value="9">9 horas</option>
                        <option value="10">10 horas</option>
                        <option value="11">11 horas</option>
                        <option value="12">12 horas</option>
                      </select>
                   
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
                    className={`
                      flex w-full items-center justify-between
                      rounded-2xl border-2 p-4
                      text-left transition sm:p-5
                      ${
                        eventData.preferences.beer
                          ? "border-primary bg-primary/5"
                          : "border-zinc-200 hover:border-primary/40"
                      }
                    `}
                  >
                    {/* IZQUIERDA */}
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      {/* ICONO */}
                      <div className="shrink-0 rounded-xl bg-primary/10 p-2.5 text-primary sm:p-3">
                        <Beer size={22} className="sm:h-6 sm:w-6" />
                      </div>
                    
                      {/* INFORMACIÓN */}
                      <div className="min-w-0">
                        <h3 className="truncate font-bold text-brandDark sm:text-base">
                          Cerveza
                        </h3>
                    
                        <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
                          Recomendación según invitados.
                        </p>
                    
                        {/* CONTADOR EN MÓVIL */}
                        {eventData.selectedBeerIds.length > 0 && (
                          <span className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary sm:hidden">
                            {eventData.selectedBeerIds.length}{" "}
                            {eventData.selectedBeerIds.length === 1
                              ? "seleccionada"
                              : "seleccionadas"}
                          </span>
                        )}
                      </div>
                    </div>
                      
                    {/* DERECHA */}
                    <div className="ml-3 flex shrink-0 items-center gap-3">
                      {/* CONTADOR EN DESKTOP */}
                      {eventData.selectedBeerIds.length > 0 && (
                        <span className="hidden text-xs font-bold text-primary sm:block">
                          {eventData.selectedBeerIds.length}{" "}
                          {eventData.selectedBeerIds.length === 1
                            ? "seleccionada"
                            : "seleccionadas"}
                        </span>
                      )}
                  
                      {/* INDICADOR */}
                      <div
                        className={`
                          flex h-6 w-6 shrink-0 items-center justify-center
                          rounded-full border-2 transition-colors duration-300
                          ${
                            eventData.preferences.beer
                              ? "border-primary bg-primary"
                              : "border-zinc-300 bg-white"
                          }
                        `}
                      >
                        {eventData.preferences.beer && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            className="h-3.5 w-3.5"
                          >
                            <path
                              d="M5 12l4 4L19 7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
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
                      updateEventData({
                        preferences: {
                          ...eventData.preferences,
                          softDrinks: true,
                        },
                      });
                    
                      setIsSoftDrinkModalOpen(true);
                    }}
                    className={`
                      flex w-full items-center justify-between
                      rounded-2xl border-2 p-4 text-left
                      transition sm:p-5
                      ${
                        eventData.preferences.softDrinks
                          ? "border-primary bg-primary/5"
                          : "border-zinc-200"
                      }
                    `}
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      {/* ICONO */}
                      <div className="shrink-0 rounded-xl bg-orange-100 p-2.5 text-orange-500 sm:p-3">
                        <GlassWater size={22} className="sm:h-6 sm:w-6" />
                      </div>
                    
                      {/* INFORMACIÓN */}
                      <div className="min-w-0">
                        <h3 className="truncate font-bold text-brandDark sm:text-base">
                          Bebidas sin alcohol
                        </h3>
                    
                        <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
                          Refrescos y otras bebidas.
                        </p>
                    
                        {/* CONTADOR SOLO PARA MOSTRAR EN MÓVIL */}
                        {eventData.selectedSoftDrinkIds.length > 0 && (
                          <span className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary sm:hidden">
                            {eventData.selectedSoftDrinkIds.length}{" "}
                            {eventData.selectedSoftDrinkIds.length === 1
                              ? "seleccionada"
                              : "seleccionadas"}
                          </span>
                        )}
                      </div>
                    </div>
                      
                    {/* PARTE DERECHA */}
                    <div className="ml-3 flex shrink-0 items-center gap-3">
                      {/* CONTADOR DESKTOP */}
                      {eventData.selectedSoftDrinkIds.length > 0 && (
                        <span className="hidden text-xs font-bold text-primary sm:block">
                          {eventData.selectedSoftDrinkIds.length}{" "}
                          {eventData.selectedSoftDrinkIds.length === 1
                            ? "seleccionada"
                            : "seleccionadas"}
                        </span>
                      )}

                      {/* INDICADOR */}
                      <div
                        className={`
                          flex h-6 w-6 shrink-0 items-center justify-center
                          rounded-full border-2 transition-colors duration-300
                          ${
                            eventData.preferences.softDrinks
                              ? "border-primary bg-primary"
                              : "border-zinc-300 bg-white"
                          }
                        `}
                      >
                        {eventData.preferences.softDrinks && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            className="h-3.5 w-3.5"
                          >
                            <path
                              d="M5 12l4 4L19 7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>

                </div>
              </div>
            )}

            {/* ================= NAVEGACIÓN ================= */}

            <div className="mt-10 gap-2 flex items-center justify-between border-t border-zinc-100 pt-6">
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

              <Button
                onClick={nextStep}
                disabled={!isCurrentStepValid()}
                className="text-sm sm:w-auto sm:px-4 sm:py-1 sm:text-base"
              >
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
