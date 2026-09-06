import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  Menu,
  X,
  Home,
  CircleHelp,
  BriefcaseBusiness,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import Button from "../ui/Button";
import Container from "./Container";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const links = [
    {
      name: "Inicio",
      path: "/",
      icon: Home,
    },
    {
      name: "Cómo funciona",
      path: "/#como-funciona",
      icon: CircleHelp,
    },
    {
      name: "Servicios",
      path: "/#servicios",
      icon: BriefcaseBusiness,
    },
  ];

  // Bloquea el scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return false;
  };

  return (
    <>
      {/* ================================================== */}
      {/* NAVBAR */}
      {/* ================================================== */}

      <header
        className="
          absolute
          left-0
          right-0
          top-0
          z-50
          bg-transparent
        "
      >
        <Container>
          <nav
            className="
              flex
              h-[76px]
              items-center
              justify-between
              sm:h-[82px]
            "
          >
            {/* ================================================== */}
            {/* LOGO */}
            {/* ================================================== */}

            <Link
              to="/"
              onClick={closeMenu}
              className="
                group
                flex
                shrink-0
                items-center
              "
            >
              <img
                src="/images/logo-six-gomez.png"
                alt="SIX GÓMEZ"
                className="
                  h-10
                  w-auto
                  object-contain
                  transition-all
                  duration-300
                  group-hover:scale-[1.03]
                  sm:h-11
                  md:h-12
                "
              />
            </Link>


            {/* ================================================== */}
            {/* MENU DESKTOP */}
            {/* ================================================== */}

            <div className="hidden items-center gap-1 md:flex">

              {links.map((link) => {
                const active = isActive(link.path);

                return (
                  <a
                    key={link.name}
                    href={link.path}
                    className={`
                      group
                      relative
                      rounded-xl
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      transition-all
                      duration-300
                      ${
                        active
                          ? "text-primary-light"
                          : "text-white/75 hover:text-white"
                      }
                    `}
                  >
                    {link.name}

                    {/* Indicador */}

                    <span
                      className={`
                        absolute
                        -bottom-1
                        left-1/2
                        h-0.5
                        -translate-x-1/2
                        rounded-full
                        bg-primary
                        transition-all
                        duration-300
                        ${
                          active
                            ? "w-6 opacity-100"
                            : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-70"
                        }
                      `}
                    />
                  </a>
                );
              })}

            </div>


            {/* ================================================== */}
            {/* CTA DESKTOP */}
            {/* ================================================== */}

            <div className="hidden md:block">

              <Link to="/crear-evento">

                <Button
                  className="
                    group
                    rounded-xl
                    border
                    border-primary/20
                    px-5
                    py-2.5
                    shadow-lg
                    shadow-primary/20
                  "
                >
                  Crear evento

                  <ArrowRight
                    size={17}
                    className="
                      ml-2
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Button>

              </Link>

            </div>


            {/* ================================================== */}
            {/* BOTÓN MOBILE */}
            {/* ================================================== */}

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-white/15
                bg-black/20
                text-white
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-primary/40
                hover:bg-primary
                md:hidden
              "
              aria-label="Abrir menú"
            >
              <Menu size={23} />
            </button>

          </nav>
        </Container>
      </header>


      {/* ================================================== */}
      {/* OVERLAY MOBILE */}
      {/* ================================================== */}

      <div
        onClick={closeMenu}
        className={`
          fixed
          inset-0
          z-[60]
          bg-black/60
          backdrop-blur-sm
          transition-all
          duration-500
          md:hidden
          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />


      {/* ================================================== */}
      {/* DRAWER MOBILE */}
      {/* ================================================== */}

      <aside
        className={`
          fixed
          right-0
          top-0
          z-[70]
          flex
          h-screen
          w-[88%]
          max-w-sm
          flex-col
          border-l
          border-white/10
          bg-brandDark
          text-white
          shadow-2xl
          transition-transform
          duration-500
          ease-out
          md:hidden
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            px-5
            py-5
          "
        >

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center"
          >
            <img
              src="/images/logo-six-gomez.png"
              alt="SIX GÓMEZ"
              className="h-10 w-auto object-contain"
            />
          </Link>


          <button
            type="button"
            onClick={closeMenu}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/5
              text-white/60
              transition-all
              duration-300
              hover:rotate-90
              hover:bg-white/10
              hover:text-white
            "
            aria-label="Cerrar menú"
          >
            <X size={21} />
          </button>

        </div>


        {/* ================================================== */}
        {/* CONTENIDO */}
        {/* ================================================== */}

        <div
          className="
            flex
            flex-1
            flex-col
            justify-between
            overflow-y-auto
            px-5
            py-7
          "
        >

          <div>

            {/* TITULO */}

            <div className="mb-7">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-primary/20
                  bg-primary/10
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-primary
                "
              >
                <Sparkles size={12} />
                Eventos fáciles
              </div>

              <h2
                className="
                  mt-4
                  text-2xl
                  font-extrabold
                  tracking-tight
                "
              >
                Organiza tu evento
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Todo lo que necesitas para preparar tu
                evento sin complicaciones.
              </p>

            </div>


            {/* NAVEGACIÓN */}

            <p
              className="
                mb-3
                px-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-white/30
              "
            >
              Navegación
            </p>


            <div className="space-y-2">

              {links.map((link) => {

                const Icon = link.icon;
                const active = isActive(link.path);

                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={closeMenu}
                    className={`
                      group
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      px-4
                      py-4
                      font-semibold
                      transition-all
                      duration-300
                      ${
                        active
                          ? "border-primary/30 bg-primary text-white shadow-lg shadow-primary/20"
                          : "border-white/5 bg-white/[0.03] text-white/70 hover:translate-x-1 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                      }
                    `}
                  >

                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${
                          active
                            ? "bg-white/15"
                            : "bg-white/5 text-primary"
                        }
                      `}
                    >
                      <Icon size={19} />
                    </div>

                    <span>
                      {link.name}
                    </span>

                    <ArrowRight
                      size={16}
                      className={`
                        ml-auto
                        transition-all
                        duration-300
                        ${
                          active
                            ? "text-white"
                            : "text-white/20 group-hover:translate-x-1 group-hover:text-primary"
                        }
                      `}
                    />

                  </a>
                );
              })}

            </div>

          </div>


          {/* ================================================== */}
          {/* CTA */}
          {/* ================================================== */}

          <div className="mt-8">

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                p-5
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary
                    text-white
                    shadow-lg
                    shadow-primary/20
                  "
                >
                  <Sparkles size={18} />
                </div>

                <div>

                  <p className="text-sm font-bold">
                    ¿Listo para celebrar?
                  </p>

                  <p className="mt-0.5 text-xs text-white/40">
                    Crea tu evento en minutos.
                  </p>

                </div>

              </div>


              <Link
                to="/crear-evento"
                onClick={closeMenu}
                className="mt-4 block"
              >

                <Button
                  className="
                    group
                    w-full
                    py-3.5
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

            </div>

            <p
              className="
                mt-5
                text-center
                text-[10px]
                text-white/25
              "
            >
              SIX GÓMEZ · Eventos
            </p>

          </div>

        </div>

      </aside>
    </>
  );
}

export default Navbar;