import { Link } from "react-router-dom";
import {
  ArrowRight,
  Beer,
  Snowflake,
  GlassWater,
  PartyPopper,
  ClipboardList,
  Sparkles,
  Truck,
  CheckCircle2,
} from "lucide-react";

import Container from "../components/layout/Container";
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

const HomePage = () => {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-brandDark py-20 text-white lg:py-28">
        {/* Decoraciones de fondo */}
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

        <Container className="relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* TEXTO */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                <Sparkles size={16} className="text-primary-light" />
                La forma más fácil de planear tu evento
              </div>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
                Organiza tu evento{" "}
                <span className="text-primary-light">
                  sin complicaciones.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
                Te ayudamos a calcular las bebidas y productos que necesitas
                para que disfrutes tu evento sin preocuparte por cantidades,
                logística o preparación.
              </p>

              {/* BOTONES */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/crear-evento">
                  <Button className="group w-full sm:w-auto">
                    Crear mi evento
                    <ArrowRight
                      size={18}
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Button>
                </Link>

                <a href="#como-funciona">
                  <Button
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-brandDark sm:w-auto"
                  >
                    Cómo funciona
                  </Button>
                </a>
              </div>

              {/* Estadísticas */}
              <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div>
                  <p className="text-2xl font-bold">🎉</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Planea fácil
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">🍺</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Todo calculado
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">🚚</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Sin complicarte
                  </p>
                </div>
              </div>
            </div>

            {/* CARD VISUAL */}
            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white p-6 text-brandDark shadow-2xl sm:p-8">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-500">
                      Tu próximo evento
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      🎉 Fiesta increíble
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                    <PartyPopper size={24} />
                  </div>
                </div>

                <div className="mt-8 space-y-4">

                  <div className="flex items-center justify-between rounded-2xl bg-zinc-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white p-3 shadow-sm">
                        <Beer size={22} className="text-primary" />
                      </div>

                      <div>
                        <p className="font-semibold">Bebidas</p>
                        <p className="text-sm text-zinc-500">
                          Calculadas para tu evento
                        </p>
                      </div>
                    </div>

                    <CheckCircle2
                      size={22}
                      className="text-green-500"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-zinc-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white p-3 shadow-sm">
                        <Snowflake size={22} className="text-blue-500" />
                      </div>

                      <div>
                        <p className="font-semibold">Hielo</p>
                        <p className="text-sm text-zinc-500">
                          Cantidad recomendada
                        </p>
                      </div>
                    </div>

                    <CheckCircle2
                      size={22}
                      className="text-green-500"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-zinc-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white p-3 shadow-sm">
                        <Truck size={22} className="text-primary" />
                      </div>

                      <div>
                        <p className="font-semibold">Entrega</p>
                        <p className="text-sm text-zinc-500">
                          Directamente a tu evento
                        </p>
                      </div>
                    </div>

                    <CheckCircle2
                      size={22}
                      className="text-green-500"
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-brandDark p-5 text-white">
                  <p className="text-sm text-zinc-400">
                    Así de sencillo
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    Nosotros calculamos. Tú disfrutas. 🎉
                  </p>
                </div>
              </div>

              {/* Decoración flotante */}
              <div className="absolute -right-5 -top-5 hidden rounded-2xl bg-primary p-4 text-white shadow-xl sm:block">
                <Beer size={28} />
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ================= SERVICIOS ================= */}

      <section id="servicios" className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-semibold text-primary">
              TODO PARA TU EVENTO
            </span>

            <h2 className="mt-4 text-4xl font-bold text-brandDark sm:text-5xl">
              Menos preocupaciones.
              <br />
              Más tiempo para disfrutar.
            </h2>

            <p className="mt-5 text-lg text-zinc-600">
              Comenzamos ayudándote con lo más importante para que tu evento
              esté preparado.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            <Card className="group hover:-translate-y-2 hover:shadow-xl">
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

            <Card className="group hover:-translate-y-2 hover:shadow-xl">
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

            <Card className="group hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                <Truck size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-brandDark">
                Entrega
              </h3>

              <p className="mt-3 leading-relaxed text-zinc-600">
                Tu pedido puede llegar directamente al lugar donde realizarás
                tu evento.
              </p>
            </Card>

          </div>
        </Container>
      </section>

      {/* ================= COMO FUNCIONA ================= */}

      <section
        id="como-funciona"
        className="bg-white py-20 lg:py-28"
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

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <div className="relative text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-2xl font-bold text-white shadow-lg">
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
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brandDark text-2xl font-bold text-white shadow-lg">
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
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-2xl font-bold text-white shadow-lg">
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

      <section className="py-20 lg:py-28">
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
                className="mt-8 bg-white text-brandDark hover:bg-zinc-100"
              >
                🎉 Crear mi evento
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>

          </div>
        </Container>
      </section>
    </>
  )
}

export default HomePage
