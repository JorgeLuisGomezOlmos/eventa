import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

import type { EventData } from "../types/event";

interface EventContextType {
  eventData: EventData;
  setEventData: React.Dispatch<
    React.SetStateAction<EventData>
  >;
}

const initialEventData: EventData = {
  eventType: "",
  guests: 0,
  date: "",
  duration: 0,
  preferences: {
    beer: false,
    softDrinks: false,
    ice: false,
  },
  selectedBeerIds: [],
  selectedSoftDrinkIds: [],
  productQuantities: {},
};

const EventContext = createContext<
  EventContextType | undefined
>(undefined);

export function EventProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [eventData, setEventData] = useState<EventData>(() => {
    const savedEvent = localStorage.getItem("eventa_event");

    if (savedEvent) {
      try {
        return JSON.parse(savedEvent) as EventData;
      } catch (error) {
        console.error(
          "Error al recuperar los datos del evento:",
          error
        );
      }
    }

    return initialEventData;
  });

  useEffect(() => {
    localStorage.setItem(
      "eventa_event",
      JSON.stringify(eventData)
    );
  }, [eventData]);

  return (
    <EventContext.Provider
      value={{
        eventData,
        setEventData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error(
      "useEvent debe utilizarse dentro de EventProvider"
    );
  }

  return context;
}