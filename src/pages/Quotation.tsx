import {
  CalendarDays,
  MapPin,
  Users,
  FileText,
  Package,
  ArrowLeft,
  CheckCircle2,
  Pencil,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const quotationProducts = [
  {
    id: 1,
    name: "Cerveza XX Lager",
    description: "Cartón de 20 piezas · 200 ml",
    quantity: 10,
    unitPrice: 420,
    image: "/images/products/xx-lager.png",
  },
  {
    id: 2,
    name: "Cerveza Indio",
    description: "Cartón de 20 piezas · 200 ml",
    quantity: 8,
    unitPrice: 400,
    image: "/images/products/indio.png",
  },
];

function Quotation() {
  const subtotal = quotationProducts.reduce(
    (total, product) => total + product.quantity * product.unitPrice,
    0
  );

  const totalProducts = quotationProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-zinc-50 py-8 sm:py-12">
      <Container>

        {/* ========================= */}
        {/* BOTÓN REGRESAR */}
        {/* ========================= */}

        <Link
          to="/recomendacion"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-primary"
        >
          <ArrowLeft size={18} />
          Volver a la recomendación
        </Link>

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>
            <div className="flex items-center gap-2">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText size={20} />
              </div>

              <p className="text-sm font-semibold text-primary">
                EVENTA
              </p>

            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brandDark sm:text-4xl">
              Cotización de tu evento
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
              Revisa los productos y el costo estimado antes de solicitar
              tu cotización.
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            <CheckCircle2 size={18} />
            Selección lista
          </div>

        </div>

        {/* ========================= */}
        {/* CONTENIDO PRINCIPAL */}
        {/* ========================= */}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* ========================= */}
          {/* COLUMNA IZQUIERDA */}
          {/* ========================= */}

          <div className="space-y-6">

            {/* ========================= */}
            {/* INFORMACIÓN DEL EVENTO */}
            {/* ========================= */}

            <Card className="rounded-3xl">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <div className="flex items-center gap-2">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <CalendarDays size={20} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Información
                      </p>

                      <h2 className="font-bold text-brandDark">
                        Detalles del evento
                      </h2>

                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-500 transition hover:bg-zinc-100 hover:text-primary"
                >
                  <Pencil size={15} />
                  Editar
                </button>

              </div>

              {/* DATOS */}

              <div className="mt-6 grid gap-4 sm:grid-cols-3">

                {/* Fecha */}

                <div className="rounded-2xl bg-zinc-50 p-4">

                  <CalendarDays
                    size={18}
                    className="text-primary"
                  />

                  <p className="mt-3 text-xs text-zinc-400">
                    Fecha
                  </p>

                  <p className="mt-1 font-bold text-brandDark">
                    20 Septiembre 2026
                  </p>

                </div>

                {/* Invitados */}

                <div className="rounded-2xl bg-zinc-50 p-4">

                  <Users
                    size={18}
                    className="text-primary"
                  />

                  <p className="mt-3 text-xs text-zinc-400">
                    Invitados
                  </p>

                  <p className="mt-1 font-bold text-brandDark">
                    100 personas
                  </p>

                </div>

                {/* Ubicación */}

                <div className="rounded-2xl bg-zinc-50 p-4">

                  <MapPin
                    size={18}
                    className="text-primary"
                  />

                  <p className="mt-3 text-xs text-zinc-400">
                    Ubicación
                  </p>

                  <p className="mt-1 font-bold text-brandDark">
                    Monterrey
                  </p>

                </div>

              </div>

            </Card>

            {/* ========================= */}
            {/* PRODUCTOS */}
            {/* ========================= */}

            <Card className="rounded-3xl">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Package size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Tu selección
                    </p>

                    <h2 className="font-bold text-brandDark">
                      Productos para el evento
                    </h2>
                  </div>

                </div>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {totalProducts} cartones
                </span>

              </div>

              {/* LISTA */}

              <div className="mt-6 space-y-3">

                {quotationProducts.map((product) => {

                  const productTotal =
                    product.quantity * product.unitPrice;

                  return (
                    <div
                      key={product.id}
                      className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-3 transition hover:border-primary/20 hover:shadow-md"
                    >

                      {/* IMAGEN */}

                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-zinc-50">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                        />

                      </div>

                      {/* INFORMACIÓN */}

                      <div className="min-w-0 flex-1">

                        <h3 className="truncate text-sm font-bold text-brandDark sm:text-base">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-xs text-zinc-500">
                          {product.description}
                        </p>

                        <p className="mt-2 text-xs font-semibold text-primary">
                          {product.quantity} cartones × $
                          {product.unitPrice.toLocaleString("es-MX")}
                        </p>

                      </div>

                      {/* TOTAL */}

                      <div className="text-right">

                        <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                          Total
                        </p>

                        <p className="mt-1 font-extrabold text-brandDark sm:text-lg">
                          $
                          {productTotal.toLocaleString("es-MX")}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>

            </Card>

          </div>

          {/* ========================= */}
          {/* RESUMEN DERECHO */}
          {/* ========================= */}

          <div>

            <Card className="sticky top-24 overflow-hidden rounded-3xl bg-brandDark p-0 text-brandDark">

              {/* HEADER */}

              <div className="relative overflow-hidden p-6">

                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />

                <div className="relative">

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brandDark">
                    Resumen
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold">
                    Tu cotización
                  </h2>

                  <p className="mt-2 text-sm text-brandDark">
                    Revisa tu selección antes de continuar.
                  </p>

                </div>

              </div>

              {/* PRECIOS */}

              <div className="border-t border-white/10 bg-white/5 p-6">

                <div className="flex items-center justify-between text-sm">

                  <span className="text-brandDark">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ${subtotal.toLocaleString("es-MX")}
                  </span>

                </div>

                <div className="mt-4 flex items-center justify-between text-sm">

                  <span className="text-brandDark">
                    Productos
                  </span>

                  <span className="font-semibold">
                    {totalProducts}
                  </span>

                </div>

                <div className="my-6 border-t border-white/10" />

                {/* TOTAL */}

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-brandDark">
                    Total estimado
                  </p>

                  <p className="mt-2 text-4xl font-extrabold">
                    ${subtotal.toLocaleString("es-MX")}
                  </p>

                  <p className="mt-1 text-xs text-brandDark">
                    MXN · Precio estimado
                  </p>

                </div>

                {/* BOTÓN */}

                <Button className="mt-6 w-full">
                  Solicitar cotización
                  <ArrowRight size={18} className="ml-2" />
                </Button>

                <p className="mt-4 text-center text-[11px] leading-relaxed text-brandDark">
                  Los precios y disponibilidad pueden variar dependiendo
                  de la ubicación y fecha del evento.
                </p>

              </div>

            </Card>

          </div>

        </div>

      </Container>
    </main>
  );
}

export default Quotation;