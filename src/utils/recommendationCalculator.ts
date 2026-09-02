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
  
    // Aproximadamente 4 cervezas por persona
    const beersNeeded =
      event.guests * 4 * durationFactor;
  
    // Cada cartón tiene 20 piezas
    const cartonsNeeded = Math.ceil(
      beersNeeded / 20
    );
  
    // Dividimos inicialmente entre las cervezas seleccionadas
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
  
        unitPrice: beer.price,
  
        total: quantity * beer.price,
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
  
    // Cantidad total recomendada de paquetes
    // Esta fórmula es provisional y después la validaremos
    // con datos reales.
    const packsNeeded = Math.ceil(
      (event.guests / 8) * durationFactor
    );
  
    // Dividimos inicialmente la recomendación
    // entre las bebidas seleccionadas.
    const quantityPerDrink = Math.floor(
      packsNeeded / selectedSoftDrinks.length
    );
  
    // Si la división no es exacta,
    // repartimos el sobrante entre los primeros productos.
    const remainder =
      packsNeeded % selectedSoftDrinks.length;
  
    selectedSoftDrinks.forEach((drink, index) => {
      const quantity =
        quantityPerDrink +
        (index < remainder ? 1 : 0);
  
      recommendedProducts.push({
        id: drink.id,
  
        name: drink.name,
  
        description: drink.description,
  
        image: drink.image,
  
        category: drink.category,
  
        quantity,
  
        recommendedQuantity: quantity,
  
        unit: drink.unit,
  
        unitPrice: drink.price,
  
        total: quantity * drink.price,
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