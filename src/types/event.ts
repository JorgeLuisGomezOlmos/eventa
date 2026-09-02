export type EventType =
  | "cumpleanos"
  | "boda"
  | "reunion"
  | "corporativo"
  | "xv_anos"
  | "otro";

export interface EventPreferences {
  beer: boolean;
  softDrinks: boolean;
  ice: boolean;
}

export interface EventData {
  eventType: EventType | "";

  guests: number;

  date: string;

  duration: number;

  preferences: EventPreferences;

  // 🍺 Productos seleccionados
  selectedBeerIds: string[];

  // 🥤 Para el futuro
  selectedSoftDrinkIds: string[];

  // 📦 Cantidad seleccionada de cada producto
  productQuantities: Record<string, number>;
}