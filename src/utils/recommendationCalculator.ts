import type { EventData } from "../types/event";
import type {
  RecommendationResult,
  RecommendedProduct,
} from "../types/recommendation";

import { products } from "../data/products";

export function calculateRecommendation(
  event: EventData
): RecommendationResult {
  const recommendedProducts: RecommendedProduct[] = [];


  // Ajustamos ligeramente según duración
  const durationFactor =
    event.duration > 0
      ? Math.max(1, event.duration / 4)
      : 1;

  // ================= CERVEZA =================

  if (
  event.preferences.beer &&
  event.selectedBeerIds.length > 0
) {
  const selectedBeers = products.filter(
    (product) =>
      product.category === "beer" &&
      event.selectedBeerIds.includes(product.id)
  );

  // Parámetros iniciales de planificación
  const BEERS_PER_PERSON_PER_HOUR = 0.75;
  const BEERS_PER_CARTON = 20;

  // Calculamos la cantidad estimada de cervezas
  const beersNeeded =
    event.guests *
    BEERS_PER_PERSON_PER_HOUR *
    event.duration;

  // Convertimos a cartones y redondeamos hacia arriba
  const cartonsNeeded = Math.ceil(
    beersNeeded / BEERS_PER_CARTON
  );

  // Distribuimos los cartones entre las cervezas seleccionadas
  const quantityPerBeer = Math.floor(
    cartonsNeeded / selectedBeers.length
  );

  const remainder =
    cartonsNeeded % selectedBeers.length;

  selectedBeers.forEach((beer, index) => {
    const quantity =
      quantityPerBeer +
      (index < remainder ? 1 : 0);

    recommendedProducts.push({
      id: beer.id,
      name: beer.name,
      description: beer.description,
      image: beer.image,
      category: beer.category,
      quantity,
      recommendedQuantity: quantity,
      unit: beer.unit,
      unitPrice:
        beer.promoPrice ?? beer.price,
      total:
        quantity *
        (beer.promoPrice ?? beer.price),
    });
  });
}

  // ================= HIELO =================

  if (event.preferences.ice) {
    const iceProduct = products.find(
      (product) => product.category === "ice"
    );

    if (iceProduct) {
      // Aproximadamente 1 bolsa por cada 10 personas
      const bags = Math.ceil(
        (event.guests / 10) * durationFactor
      );

      recommendedProducts.push({
        id: iceProduct.id,
          
        name: iceProduct.name,
          
        description: iceProduct.description,
          
        image: iceProduct.image,
          
        category: "ice",
          
        quantity: bags,
          
        recommendedQuantity: bags,
          
        unit: iceProduct.unit,
          
        unitPrice: iceProduct.price,
          
        total: bags * iceProduct.price,
      });
    }
  }

  // ================= BEBIDAS SIN ALCOHOL =================

  if (
  event.preferences.softDrinks &&
  event.selectedSoftDrinkIds.length > 0
) {
  const selectedSoftDrinks = products.filter(
    (product) =>
      product.category === "softDrinks" &&
      event.selectedSoftDrinkIds.includes(product.id)
  );

  // Parámetro inicial de planificación.
  // Representa litros estimados por persona por hora.
  const SOFT_DRINK_LITERS_PER_PERSON_PER_HOUR = 0.35;

  // 1. Calculamos los litros totales necesarios para el evento.
  const litersNeeded =
    event.guests *
    SOFT_DRINK_LITERS_PER_PERSON_PER_HOUR *
    event.duration;

  // 2. Dividimos los litros entre las bebidas seleccionadas.
  const litersPerDrink =
    litersNeeded / selectedSoftDrinks.length;

  // 3. Calculamos los paquetes necesarios para cada producto.
  selectedSoftDrinks.forEach((drink) => {
    const litersPerUnit =
      drink.litersPerUnit ?? 0;

    const unitsPerPackage =
      drink.unitsPerPackage ?? 1;

    // Si el producto no tiene información de volumen,
    // no podemos calcular correctamente su recomendación.
    if (litersPerUnit <= 0) {
      return;
    }

    const litersPerPackage =
      litersPerUnit * unitsPerPackage;

    const quantity = Math.ceil(
      litersPerDrink / litersPerPackage
    );

    const unitPrice =
      drink.promoPrice ?? drink.price;

    recommendedProducts.push({
      id: drink.id,
      name: drink.name,
      description: drink.description,
      image: drink.image,
      category: drink.category,
      quantity,
      recommendedQuantity: quantity,
      unit: drink.unit,
      unitPrice,
      total: quantity * unitPrice,
    });
  });
}

  const total = recommendedProducts.reduce(
    (sum, product) => sum + product.total,
    0
  );

  return {
    products: recommendedProducts,
    total,
  };
}