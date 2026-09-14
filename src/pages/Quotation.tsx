import {
  CalendarDays,
  Users,
  
  Package,
  ArrowLeft,
  CheckCircle2,
  Pencil,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useMemo, useState } from "react";
import { useEvent } from "../context/EventContext";
import { calculateRecommendation } from "../utils/recommendationCalculator";

  function Quotation() {

  const { eventData } = useEvent();
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    if (!date) {
      return "Por definir";
    }
  
    return new Date(
      `${date}T12:00:00`
    ).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };


  /* ============================= */
  /* RECOMENDACIÓN REAL DEL EVENTO */
  /* ============================= */

  const recommendation = useMemo(() => {
    return calculateRecommendation(eventData);
  }, [eventData]);


  /* ============================= */
  /* PRODUCTOS PARA COTIZACIÓN */
  /* ============================= */

  const quotationProducts = recommendation.products.map(
    (product) => ({

      ...product,

      // Usamos la cantidad modificada por el usuario.
      // Si no existe, usamos la cantidad recomendada.
      quantity:
        eventData.productQuantities[product.id] ??
        product.quantity,

    })
  );


  /* ============================= */
  /* SUBTOTAL */
  /* ============================= */

  const subtotal = quotationProducts.reduce(
    (total, product) =>
      total + product.quantity * product.unitPrice,
    0
  );


  /* ============================= */
  /* TOTAL DE PRODUCTOS */
  /* ============================= */

  const totalProducts = quotationProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );


  const handleWhatsAppQuotation = () => {
  const phoneNumber = "5573270076";

  let message = `Hola, quiero solicitar el sigueinte pedido para mi evento.\n\n`;

  message += `🎉 Tipo de evento: ${getEventName()}\n`;
  message += `👥 Invitados: ${eventData.guests} personas\n`;
  message += `📅 Fecha: ${formatDate(eventData.date)}\n`;
  message += `⏱️ Duración: ${eventData.duration} horas\n\n`;

  message += `🛒 PRODUCTOS\n\n`;

  quotationProducts.forEach((product) => {
    const productTotal = product.quantity * product.unitPrice;

    const unitLabel =
      product.quantity !== 1
        ? product.unit === "cartón"
          ? "cartones"
          : `${product.unit}s`
        : product.unit;

    message += `• ${product.name}\n`;
    message += `  ${product.quantity} ${unitLabel} × $${product.unitPrice.toLocaleString(
      "es-MX"
    )} = $${productTotal.toLocaleString("es-MX")}\n\n`;
  });

  message += `💰 TOTAL ESTIMADO: $${subtotal.toLocaleString(
    "es-MX"
  )} MXN\n\n`;

  message += `Quedo atento para confirmar disponibilidad y recibir la cotización final.`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");

  // Mostrar confirmación en EVENTA
  setTimeout(() => {
      setShowConfirmation(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-50 py-24 sm:py-28">
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

        <div className="mt-2 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>
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

            <Card className="rounded-3xl p-6">

              {/* ========================= */}
              {/* HEADER */}
              {/* ========================= */}
            
              <div className="flex items-start justify-between gap-4">
            
                <div>
                  <div className="flex items-center gap-3">
            
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <CalendarDays size={21} />
                    </div>
            
                    <div>
            
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Información
                      </p>
            
                      <h2 className="mt-0.5 font-bold text-brandDark">
                        Detalles del evento
                      </h2>
            
                    </div>
            
                  </div>
                </div>
            
                {/* EDITAR */}
            
                <Link
                  to="/crear-evento"
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-500 transition hover:bg-zinc-100 hover:text-primary"
                >
                  <Pencil size={15} />
            
                  Editar
                </Link>
            
              </div>
            
            
              {/* ========================= */}
              {/* NOMBRE DEL EVENTO */}
              {/* ========================= */}
            
              <div className="mt-6 rounded-2xl bg-primary/5 p-4">
            
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Tipo de evento
                </p>
            
                <p className="mt-1 text-lg font-extrabold text-brandDark">
                  {getEventName()}
                </p>
            
              </div>
            
            
              {/* ========================= */}
              {/* DATOS */}
              {/* ========================= */}
            
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            
                {/* FECHA */}
            
                <div className="rounded-2xl bg-zinc-50 p-4">
            
                  <CalendarDays
                    size={18}
                    className="text-primary"
                  />
            
                  <p className="mt-3 text-xs text-zinc-400">
                    Fecha
                  </p>
            
                  <p className="mt-1 text-sm font-bold text-brandDark">
                    {formatDate(eventData.date)}
                  </p>
            
                </div>
            
            
                {/* INVITADOS */}
            
                <div className="rounded-2xl bg-zinc-50 p-4">
            
                  <Users
                    size={18}
                    className="text-primary"
                  />
            
                  <p className="mt-3 text-xs text-zinc-400">
                    Invitados
                  </p>
            
                  <p className="mt-1 text-sm font-bold text-brandDark">
                    {eventData.guests > 0
                      ? `${eventData.guests} personas`
                      : "Por definir"}
                  </p>
            
                </div>
            
            
                {/* DURACIÓN */}
            
                <div className="rounded-2xl bg-zinc-50 p-4">
            
                  <Clock
                    size={18}
                    className="text-primary"
                  />
            
                  <p className="mt-3 text-xs text-zinc-400">
                    Duración
                  </p>
            
                  <p className="mt-1 text-sm font-bold text-brandDark">
                    {eventData.duration > 0
                      ? `${eventData.duration} horas`
                      : "Por definir"}
                  </p>
            
                </div>
            
              </div>
            
            
              {/* ========================= */}
              {/* UBICACIÓN */}
              {/* ========================= */}
            
              {/* <div className="mt-3 flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
            
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin size={18} />
                </div>
            
                <div className="min-w-0">
            
                  <p className="text-xs text-zinc-400">
                    Ubicación
                  </p>
            
                  <p className="mt-1 text-sm font-bold text-brandDark">
                    Por definir
                  </p>
            
                </div>
            
              </div> */}
            
            </Card>

            {/* ========================= */}
            {/* PRODUCTOS */}
            {/* ========================= */}

            <Card className="rounded-3xl p-6">

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
                  {totalProducts} productos
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
                          {product.quantity}{" "}
                          {product.quantity !== 1 ? product.unit === "cartón" ? "cartones" : `${product.unit}s` : product.unit}{" "}
                          × $
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

                <Button
                  type="button"
                  onClick={handleWhatsAppQuotation}
                  className="mt-6 w-full"
                >
                  <img
                    src="/images/icons/iconowhastapp.png"
                    alt="WhatsApp"
                    className="mr-2 h-5 w-5"
                  />

                  Realizar pedido

                  <ArrowRight
                    size={18}
                    className="ml-2"
                  />
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
      {showConfirmation && (
  <div
    className="
      fixed inset-0 z-[100]
      flex items-center justify-center
      bg-black/60
      px-3 py-3
      backdrop-blur-sm
    "
  >
    <div
      className="
        w-full
        max-w-sm
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-2xl
        sm:max-w-md

        lg:max-w-4xl
        lg:rounded-[2rem]
      "
    >
      <div className="flex flex-col lg:flex-row">

        {/* ================================================== */}
        {/* IZQUIERDA */}
        {/* ================================================== */}

        <div
          className="
            relative
            flex
            items-center
            justify-center
            overflow-hidden
            bg-brandDark
            px-5
            py-6
            text-center
            text-white

            sm:px-7
            sm:py-7

            lg:w-[40%]
            lg:justify-center
            lg:px-8
            lg:py-8
            lg:text-left
          "
        >

          {/* Decoraciones */}

          <div className="
            pointer-events-none
            absolute
            -right-12
            -top-12
            h-32
            w-32
            rounded-full
            bg-primary/20
            blur-3xl
          " />

          <div className="
            pointer-events-none
            absolute
            -bottom-14
            -left-14
            h-36
            w-36
            rounded-full
            bg-primary/10
            blur-3xl
          " />


          <div className="">

            {/* ICONO */}

            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-green-500
                shadow-lg
                shadow-green-500/20

                sm:h-14
                sm:w-14

                lg:mx-0
                lg:h-16
                lg:w-16
              "
            >
              <CheckCircle2
                size={25}
                strokeWidth={2.5}
                className="sm:h-7 sm:w-7"
              />
            </div>


            {/* TITULO */}

            <h2
              className="
                mt-3
                text-2xl
                font-extrabold
                tracking-tight

                sm:text-3xl

                lg:mt-4
                lg:text-4xl
              "
            >
              ¡Listo!
            </h2>


            <p
              className="
                mx-auto
                mt-1.5
                max-w-xs
                text-xs
                leading-5
                text-white/60

                sm:text-sm

                lg:mx-0
                lg:mt-2
              "
            >
              Tu solicitud está preparada para enviarse por WhatsApp.
            </p>


            <div className="
              mx-auto
              mt-4
              h-px
              w-10
              bg-primary

              lg:mx-0
              lg:mt-5
            " />


            <p
              className="
                mt-3
                text-[10px]
                leading-4
                text-white/35

                sm:text-xs
                sm:leading-5
              "
            >
              Revisa WhatsApp y confirma que el mensaje
              se haya enviado correctamente.
            </p>

          </div>

        </div>


        {/* ================================================== */}
        {/* DERECHA */}
        {/* ================================================== */}

        <div
          className="
            px-4
            py-4

            sm:px-6
            sm:py-6

            lg:w-[60%]
            lg:px-8
            lg:py-7
          "
        >

          {/* ENCABEZADO */}

          <div>

            <p className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-primary

              sm:text-[10px]
            ">
              Resumen de solicitud
            </p>

            <h3
              className="
                mt-1
                text-lg
                font-extrabold
                tracking-tight
                text-brandDark

                sm:text-xl

                lg:text-2xl
              "
            >
              Tu evento está listo
            </h3>

            <p className="
              mt-1
              text-xs
              leading-5
              text-zinc-500

              sm:text-sm
            ">
              Estos son los datos de tu solicitud.
            </p>

          </div>


          {/* ================================================== */}
          {/* DATOS */}
          {/* ================================================== */}

          <div
            className="
              mt-4
              grid
              grid-cols-2
              gap-2

              sm:gap-3

              lg:mt-5
            "
          >

            {/* EVENTO */}

            <div className="rounded-xl bg-zinc-50 p-3">

              <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
                Evento
              </p>

              <p className="mt-1 truncate text-xs font-bold text-brandDark sm:text-sm">
                {getEventName()}
              </p>

            </div>


            {/* INVITADOS */}

            <div className="rounded-xl bg-zinc-50 p-3">

              <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
                Invitados
              </p>

              <p className="mt-1 truncate text-xs font-bold text-brandDark sm:text-sm">
                {eventData.guests} personas
              </p>

            </div>


            {/* FECHA */}

            <div className="rounded-xl bg-zinc-50 p-3">

              <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
                Fecha
              </p>

              <p className="mt-1 truncate text-xs font-bold text-brandDark sm:text-sm">
                {formatDate(eventData.date)}
              </p>

            </div>


            {/* DURACIÓN */}

            <div className="rounded-xl bg-zinc-50 p-3">

              <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
                Duración
              </p>

              <p className="mt-1 text-xs font-bold text-brandDark sm:text-sm">
                {eventData.duration} horas
              </p>

            </div>

          </div>


          {/* ================================================== */}
          {/* TOTAL */}
          {/* ================================================== */}

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              rounded-xl
              bg-brandDark
              px-4
              py-3

              sm:py-3.5

              lg:mt-4
            "
          >

            <div>

              <p className="
                text-[9px]
                font-bold
                uppercase
                tracking-wider
                text-white/40
              ">
                Total estimado
              </p>

              <p className="
                mt-0.5
                text-xl
                font-extrabold
                text-white

                sm:text-2xl
              ">
                ${subtotal.toLocaleString("es-MX")}
              </p>

            </div>


            <span className="
              text-[10px]
              font-bold
              uppercase
              text-white/40
            ">
              MXN
            </span>

          </div>


          {/* ================================================== */}
          {/* AVISO */}
          {/* ================================================== */}

          <div
            className="
              mt-3
              rounded-xl
              border
              border-primary/10
              bg-primary/5
              px-3
              py-2.5

              sm:mt-4
              sm:px-4
            "
          >

            <div className="flex items-center gap-2.5">

              <div
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary/10
                  text-primary
                "
              >
                <Sparkles size={14} />
              </div>

              <p className="text-[10px] leading-4 text-zinc-600 sm:text-xs sm:leading-5">

                <span className="font-bold text-brandDark">
                  Importante:
                </span>{" "}
                los precios y disponibilidad serán confirmados posteriormente.

              </p>

            </div>

          </div>


          {/* ================================================== */}
          {/* BOTONES */}
          {/* ================================================== */}

          <div className="mt-3 sm:mt-4">

            <Link
              to="/crear-evento"
              onClick={() => setShowConfirmation(false)}
              className="block"
            >

              <Button
                className="
                  w-full
                  py-3
                  text-sm
                  sm:py-3.5
                "
              >
                Crear nuevo evento

                <ArrowRight
                  size={16}
                  className="ml-2"
                />

              </Button>

            </Link>


            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="
                mt-1
                w-full
                rounded-xl
                px-3
                py-2
                text-xs
                font-semibold
                text-zinc-500
                transition
                hover:bg-zinc-100
                hover:text-brandDark
                sm:mt-2
                sm:py-2.5
                sm:text-sm
              "
            >
              Seguir aquí
            </button>

          </div>

        </div>

      </div>
    </div>
  </div>
)}
    </main>
  );
}

export default Quotation;