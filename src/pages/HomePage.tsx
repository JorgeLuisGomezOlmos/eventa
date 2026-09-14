import { Link } from "react-router-dom";
import {
  ArrowRight,
  Beer,
  Snowflake,
  PartyPopper,
  ClipboardList,
  Sparkles,
  Truck,
  CheckCircle2,
  BadgePercent,
  Tag,
  ExternalLink,
} from "lucide-react";

import { products } from "../data/products";


import Container from "../components/layout/Container";
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

const HomePage = () => {

  const promotionalProducts = products.filter(
    (product) =>
      product.category === "beer" &&
      product.promoPrice !== undefined &&
      product.promoPrice < product.price
  );

  return (
    <>
      {/* ================= HERO ================= */}

      <section className="relative isolate overflow-hidden bg-brandDark text-white">

  {/* ================================================== */}
  {/* IMAGEN DEL HERO */}
  {/* ================================================== */}

  <div className="absolute inset-0 lg:left-[%]">

    <img
      src="/images/hero-eventa.png"
      alt="Personas disfrutando de un evento"
      className="
        h-full w-full object-cover
        object-center
        opacity-80
        lg:opacity-100
      "
    />

    {/* Degradado para integrar la imagen con el fondo */}

    <div className="
      absolute inset-0
      bg-gradient-to-b
      from-brandDark/70
      via-brandDark/60
      to-brandDark
      lg:bg-gradient-to-r
      lg:from-brandDark
      lg:via-brandDark/80
      lg:to-transparent
    " />

  </div>


  {/* ================================================== */}
  {/* BRILLOS DE FONDO */}
  {/* ================================================== */}

  <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

  <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />


  {/* ================================================== */}
  {/* CONTENIDO */}
  {/* ================================================== */}

  <Container className="relative z-10">

    <div className="flex min-h-[720px] flex-col justify-center py-20 sm:py-24 lg:min-h-[760px] lg:py-24">

      <div className="max-w-3xl lg:max-w-2xl">


        {/* ================================================== */}
        {/* BADGE */}
        {/* ================================================== */}

        <div className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-white/15
          bg-white/10
          px-3.5
          py-2
          text-xs
          font-medium
          text-white/90
          backdrop-blur-md
          sm:px-4
          sm:text-sm
        ">

          <Sparkles
            size={15}
            className="text-primary-light"
          />

          Planea tu evento de forma fácil

        </div>


        {/* ================================================== */}
        {/* TÍTULO */}
        {/* ================================================== */}

        <h1 className="
          mt-6
          max-w-3xl
          text-4xl
          font-extrabold
          leading-[0.98]
          tracking-tight
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
        ">

          Organiza tu evento.

          <span className="mt-1 block text-primary-light">
            Nosotros lo hacemos fácil.
          </span>

        </h1>


        {/* ================================================== */}
        {/* DESCRIPCIÓN */}
        {/* ================================================== */}

        <p className="
          mt-6
          max-w-xl
          text-sm
          leading-7
          text-zinc-300
          sm:text-lg
          sm:leading-8
        ">
          Calcula las bebidas, productos y cantidades que
          necesitas para tu evento, recibe una cotización perosonalizada y realiza tu pedido en minutos.
        </p>


        {/* ================================================== */}
        {/* BOTONES */}
        {/* ================================================== */}

        <div className="
          mt-8
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:gap-4
        ">

          <Link
            to="/crear-evento"
            className="w-full sm:w-auto"
          >

            <Button
              className="
                group
                w-full
                px-7
                py-3.5
                sm:w-auto
              "
            >

              Crear mi evento

              <ArrowRight
                size={18}
                className="
                  ml-2
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </Button>

          </Link>


          <a
            href="#como-funciona"
            className="w-full sm:w-auto"
          >

            <Button
              variant="outline"
              className="
                w-full
                border-white/30
                bg-white/5
                text-white
                backdrop-blur-sm
                hover:bg-white
                hover:text-brandDark
                sm:w-auto
              "
            >
              Cómo funciona
            </Button>

          </a>

        </div>


        {/* ================================================== */}
        {/* MICRO MENSAJE */}
        {/* ================================================== */}

        <div className="
          mt-5
          flex
          items-center
          gap-2
          text-xs
          text-zinc-400
          sm:text-sm
        ">

          <CheckCircle2
            size={15}
            className="shrink-0 text-green-400"
          />

          Cotización inicial en menos de 1 minuto

        </div>


        {/* ================================================== */}
        {/* BENEFICIOS */}
        {/* ================================================== */}

        <div className="
          mt-12
          grid
          grid-cols-2
          gap-3
          border-t
          border-white/10
          pt-6
          sm:mt-14
          sm:grid-cols-4
          sm:gap-4
          sm:pt-8
        ">


          {/* BENEFICIO 1 */}

          <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-3
            backdrop-blur-sm
            sm:border-0
            sm:bg-transparent
            sm:p-0
          ">

            <div className="flex items-center gap-2">

              <div className="
                flex h-9 w-9
                shrink-0
                items-center justify-center
                rounded-xl
                bg-primary
                text-white
              ">
                <PartyPopper size={18} />
              </div>

              <div>
                <p className="text-xs font-bold sm:text-sm">
                  Fácil
                </p>

                <p className="mt-0.5 text-[10px] text-zinc-400 sm:text-xs">
                  Planea sin complicarte
                </p>
              </div>

            </div>

          </div>


          {/* BENEFICIO 2 */}

          <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-3
            backdrop-blur-sm
            sm:border-0
            sm:bg-transparent
            sm:p-0
          ">

            <div className="flex items-center gap-2">

              <div className="
                flex h-9 w-9
                shrink-0
                items-center justify-center
                rounded-xl
                bg-white
                text-primary
              ">
                <Beer size={18} />
              </div>

              <div>
                <p className="text-xs font-bold sm:text-sm">
                  Calculado
                </p>

                <p className="mt-0.5 text-[10px] text-zinc-400 sm:text-xs">
                  Cantidades recomendadas
                </p>
              </div>

            </div>

          </div>


          {/* BENEFICIO 3 */}

          <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-3
            backdrop-blur-sm
            sm:border-0
            sm:bg-transparent
            sm:p-0
          ">

            <div className="flex items-center gap-2">

              <div className="
                flex h-9 w-9
                shrink-0
                items-center justify-center
                rounded-xl
                bg-white
                text-primary
              ">
                <Truck size={18} />
              </div>

              <div>
                <p className="text-xs font-bold sm:text-sm">
                  Entrega
                </p>

                <p className="mt-0.5 text-[10px] text-zinc-400 sm:text-xs">
                  Directo a tu evento
                </p>
              </div>

            </div>

          </div>


          {/* BENEFICIO 4 */}

          <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-3
            backdrop-blur-sm
            sm:border-0
            sm:bg-transparent
            sm:p-0
          ">

            <div className="flex items-center gap-2">

              <div className="
                flex h-9 w-9
                shrink-0
                items-center justify-center
                rounded-xl
                bg-white
                text-primary
              ">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <p className="text-xs font-bold sm:text-sm">
                  Seguro
                </p>

                <p className="mt-0.5 text-[10px] text-zinc-400 sm:text-xs">
                  Todo bajo control
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </Container>


  {/* ================================================== */}
  {/* INDICADOR VISUAL DE IMAGEN EN DESKTOP */}
  {/* ================================================== */}

  <div className="
    absolute
    bottom-8
    right-8
    hidden
    rounded-full
    border
    border-white/10
    bg-black/30
    px-4
    py-2
    text-xs
    text-white/60
    backdrop-blur-md
    lg:flex
    lg:items-center
    lg:gap-2
  ">

    <span className="h-2 w-2 rounded-full bg-primary" />

    Todo listo para tu evento

  </div>

</section>

      {/* ================= SERVICIOS ================= */}

      <section id="servicios" className="py-16 sm:py-20 lg:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-semibold text-primary">
              TODO PARA TU EVENTO
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-brandDark sm:text-4xl md:text-5xl">
              Menos preocupaciones.
              <br />
              Más tiempo para disfrutar.
            </h2>

            <p className="mt-5 text-lg text-zinc-600">
              Comenzamos ayudándote con lo más importante para que tu evento
              esté preparado.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3 lg:mt-14">

            <Card className="group hover:-translate-y-2 hover:shadow-xl p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Beer size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-brandDark">
                Bebidas
              </h3>

              <p className="mt-3 leading-relaxed text-zinc-600">
                Calculamos una cantidad recomendada según las características
                de tu evento.
              </p>
            </Card>

            <Card className="group p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 transition-all duration-300 group-hover:scale-105">
                <BadgePercent size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-brandDark">
                Mejores precios y promociones
              </h3>

              <p className="mt-3 leading-relaxed text-zinc-600">
                Encuentra precios competitivos y promociones especiales
                para que tu evento rinda más.
              </p>

            </Card>

            <Card className="group hover:-translate-y-2 hover:shadow-xl p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-500">
                <Snowflake size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-brandDark">
                Hielo y complementos
              </h3>

              <p className="mt-3 leading-relaxed text-zinc-600">
                No solo pensamos en las bebidas, también en todo lo necesario
                para servirlas.
              </p>
            </Card>

            

          </div>
        </Container>
      </section>

      {/* ================= PROMOCIONES ================= */}
      <section
        id="promociones"
        className="relative overflow-hidden bg-brandDark py-20 sm:py-24"
      >
        <Container className="relative">
          {/* Encabezado */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Tag size={14} />
              Promociones
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Las mejores cervezas
              <span className="block text-primary">
                para tu evento
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
              Aprovecha nuestros precios especiales y haz que tu
              evento sea inolvidable.
            </p>
          </div>

          {/* Productos en promoción */}
          
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {promotionalProducts.slice(0, 3).map((product) => {
              const promoPrice = product.promoPrice!;
            
              const discount = Math.round(
                ((product.price - promoPrice) / product.price) * 100
              );
            
              const savings = product.price - promoPrice;
            
              const inStock = product.stock > 0;
            
              return (
                <article
                  key={product.id}
                  className="
                    group overflow-hidden rounded-3xl
                    border border-white/10
                    bg-zinc-950
                    shadow-2xl
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-primary/30
                  "
                >
                  {/* Imagen */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          h-full w-full object-cover
                          transition-transform duration-500
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/30">
                        Sin imagen
                      </div>
                    )}

                    {/* Descuento */}
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-extrabold text-white shadow-lg">
                        -{discount}%
                      </span>
                    </div>
                  
                    {/* Existencia */}
                    <div className="absolute right-4 top-4">
                      <span
                        className={`
                          rounded-full px-3 py-1.5
                          text-xs font-bold
                          backdrop-blur-md
                          ${
                            inStock
                              ? "bg-green-500/90 text-white"
                              : "bg-red-500/90 text-white"
                          }
                        `}
                      >
                        {inStock ? "En existencia" : "Agotado"}
                      </span>
                    </div>
                  </div>
                        
                  {/* Información */}
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      Oferta especial
                    </p>
                        
                    <h3 className="mt-2 text-2xl font-extrabold text-white">
                      {product.name}
                    </h3>
                        
                    <p className="mt-1 text-sm text-white/50">
                      {product.unitsPerPackage
                        ? `${product.unitsPerPackage} botellas`
                        : product.unit}
                    </p>
                      
                    {/* Precios */}
                    <div className="mt-5 flex items-end gap-3">
                      <span className="text-sm font-semibold text-white/30 line-through">
                        ${product.price.toLocaleString("es-MX")}
                      </span>
                      
                      <span className="text-3xl font-extrabold text-primary">
                        ${promoPrice.toLocaleString("es-MX")}
                      </span>
                    </div>
                      
                    {/* Ahorro */}
                    <p className="mt-1 text-xs font-semibold text-green-400">
                      Ahorras ${savings.toLocaleString("es-MX")}
                    </p>
                      
                    {/* Botón */}

                    {inStock ? (
                      <Link
                        to="/crear-evento"
                        className="
                          mt-5 flex w-full items-center
                          justify-center gap-2
                          rounded-2xl
                          bg-primary
                          px-5 py-3.5
                          text-sm font-bold
                          text-white
                          transition-all duration-200
                          hover:bg-primary-light
                          active:scale-[0.98]
                        "
                      >
                        Crear mi evento y solicitar
                        <ArrowRight size={17} />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="
                          mt-5 flex w-full items-center
                          justify-center gap-2
                          rounded-2xl
                          bg-zinc-800
                          px-5 py-3.5
                          text-sm font-bold
                          text-white/30
                          cursor-not-allowed
                        "
                      >
                        Agotado
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Ver todos */}
          <div className="mt-10 text-center">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:border-primary hover:bg-primary"
            >
              Ver todos los productos
              <ArrowRight size={17} />
            </Link>
          </div>
        </Container>
      </section>
      {/* ================= COMO FUNCIONA ================= */}

      <section
        id="como-funciona"
        className="bg-white py-20 lg:py-16"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-semibold text-primary">
              ASÍ DE FÁCIL
            </span>

            <h2 className="mt-4 text-4xl font-bold text-brandDark sm:text-5xl">
              Organiza tu evento en pocos pasos.
            </h2>
          </div>

          <div className="mt-10 grid gap-10 sm:mt-12 md:grid-cols-3 md:gap-6 lg:mt-16 lg:gap-8">

            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:rounded-3xl sm:text-2xl">
                1
              </div>

              <div className="mt-6 flex justify-center text-primary">
                <ClipboardList size={32} />
              </div>

              <h3 className="mt-4 text-xl font-bold text-brandDark">
                Crea tu evento
              </h3>

              <p className="mt-3 text-zinc-600">
                Cuéntanos qué tipo de evento tendrás y cuántas personas
                asistirán.
              </p>
            </div>

            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brandDark text-xl font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:rounded-3xl sm:text-2xl">
                2
              </div>

              <div className="mt-6 flex justify-center text-primary">
                <Sparkles size={32} />
              </div>

              <h3 className="mt-4 text-xl font-bold text-brandDark">
                Recibe recomendaciones
              </h3>

              <p className="mt-3 text-zinc-600">
                Calculamos productos y cantidades recomendadas para tu evento.
              </p>
            </div>

            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:rounded-3xl sm:text-2xl">
                3
              </div>

              <div className="mt-6 flex justify-center text-primary">
                <PartyPopper size={32} />
              </div>

              <h3 className="mt-4 text-xl font-bold text-brandDark">
                Disfruta tu evento
              </h3>

              <p className="mt-3 text-zinc-600">
                Obtén tu cotización y prepárate para disfrutar sin
                complicaciones.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* ================= BENEFICIOS ================= */}

      <section className="py-20 lg:py-16">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>
              <span className="font-semibold text-primary">
                ¿POR QUÉ USAR LA PLATAFORMA?
              </span>

              <h2 className="mt-4 text-4xl font-bold text-brandDark sm:text-5xl">
                Deja de adivinar cuánto necesitas.
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-zinc-600">
                Organizar un evento puede ser complicado. Nuestra plataforma
                te ayuda a tomar mejores decisiones y tener una idea clara de
                lo que necesitas.
              </p>

              <div className="mt-8 space-y-5">

                {[
                  "Recomendaciones basadas en tu evento",
                  "Cantidades fáciles de modificar",
                  "Cotización clara y sencilla",
                  "Proceso rápido desde cualquier dispositivo",
                ].map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={22}
                      className="shrink-0 text-primary"
                    />

                    <span className="font-medium text-zinc-700">
                      {benefit}
                    </span>
                  </div>
                ))}

              </div>
            </div>

            {/* PANEL VISUAL */}
            <div className="rounded-3xl bg-brandDark p-8 text-white shadow-2xl sm:p-12">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                  <Sparkles size={28} />
                </div>

                <div>
                  <p className="text-sm text-zinc-400">
                    EVENTO INTELIGENTE
                  </p>

                  <h3 className="text-2xl font-bold">
                    Todo bajo control
                  </h3>
                </div>
              </div>

              <div className="mt-10 space-y-4">

                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-zinc-400">
                    👥 Invitados
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    100 personas
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-zinc-400">
                    🍺 Recomendación
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    Lista personalizada
                  </p>
                </div>

                <div className="rounded-2xl bg-primary p-5">
                  <p className="text-sm text-white/70">
                    🎉 Resultado
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    Tu evento listo para organizar
                  </p>
                </div>

              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ================= CTA FINAL ================= */}

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-white sm:px-12 lg:py-20">

            <PartyPopper
              size={42}
              className="mx-auto"
            />

            <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
              ¿Listo para organizar tu evento?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
              Cuéntanos algunos detalles y te ayudaremos a calcular lo que
              necesitas.
            </p>

            <Link to="/crear-evento">
              <Button
                variant="secondary"
                className="mt-8 text-slate-900 hover:bg-zinc-100 hover:text-black"
              >
                🎉 Crear mi evento
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>

            {/* REDES SOCIALES */}
<div className="mt-14">
  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
    Síguenos
  </p>

  <h3 className="mt-2 text-2xl font-extrabold text-white">
    También estamos en redes
  </h3>

  <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-white/50">
    Descubre promociones, nuevos productos y contenido para
    hacer de tus eventos algo especial.
  </p>

  <div className="mt-6 flex flex-wrap justify-center gap-3">
    {/* INSTAGRAM */}
    <a
      href="https://www.instagram.com/six_gomez"
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex items-center gap-3
        rounded-2xl
        border border-white/10
        bg-white/[0.04]
        px-4 py-3
        text-left
        transition-all duration-300
        hover:-translate-y-1
        hover:border-pink-500/30
        hover:bg-white/[0.08]
        hover:shadow-xl
      "
    >

      <div
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600
          text-white
          shadow-lg
        "
      >
        <img
          src="/images/social/instagram.png"
          alt="Instagram"
          className=""
        />

      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
          Síguenos en
        </p>

        <p className="text-sm font-bold text-white">
          Instagram
        </p>
      </div>

      <ExternalLink
        size={15}
        className="ml-1 text-white/30 transition group-hover:text-white"
      />
    </a>

    {/* FACEBOOK */}
    <a
      href="https://www.facebook.com/share/1FLBpNzgBr/"
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex items-center gap-3
        rounded-2xl
        border border-white/10
        bg-white/[0.04]
        px-4 py-3
        text-left
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-500/30
        hover:bg-white/[0.08]
        hover:shadow-xl
      "
    >
      <div
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          bg-blue-600
          text-white
          shadow-lg
        "
      >
        <img
          src="/images/social/facebook.png"
          alt="Facebook"
          className=""
        />
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
          Encuéntranos en
        </p>

        <p className="text-sm font-bold text-white">
          Facebook
        </p>
      </div>

      <ExternalLink
        size={15}
        className="ml-1 text-white/30 transition group-hover:text-white"
      />
    </a>

    {/* TIKTOK */}
    <a
      href="https://www.tiktok.com/@TU_USUARIO"
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex items-center gap-3
        rounded-2xl
        border border-white/10
        bg-white/[0.04]
        px-4 py-3
        text-left
        transition-all duration-300
        hover:-translate-y-1
        hover:border-white/30
        hover:bg-white/[0.08]
        hover:shadow-xl
      "
    >
      <div
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          bg-black
          text-white
          shadow-lg
        "
      >
        <img
          src="/images/social/tiktok.png"
          alt="TikTok"
          className=""
        />
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
          Síguenos en
        </p>

        <p className="text-sm font-bold text-white">
          TikTok
        </p>
      </div>

      <ExternalLink
        size={15}
        className="ml-1 text-white/30 transition group-hover:text-white"
      />
    </a>
  </div>
</div>

          </div>
        </Container>
      </section>
    </>
  )
}

export default HomePage
