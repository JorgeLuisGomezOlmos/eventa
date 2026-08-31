import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Menu,
  X,
  PartyPopper,
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
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl">
        <Container>
          <nav className="flex h-20 items-center justify-between">
            
            {/* LOGO */}
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex items-center gap-3"
            >
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 transition duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <PartyPopper size={22} />

                <div className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight text-brandDark">
                  EVENTA
                </span>

                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  Tu evento fácil
                </span>
              </div>
            </Link>

            {/* ================= DESKTOP MENU ================= */}
            <div className="hidden items-center gap-2 md:flex">
              {links.map((link) => {
                const active = isActive(link.path);

                return (
                  <a
                    key={link.name}
                    href={link.path}
                    className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-brandDark"
                    }`}
                  >
                    {link.name}

                    {active && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </a>
                );
              })}

              <div className="ml-3">
                <Link to="/crear-evento">
                  <Button className="group">
                    Crear evento

                    <ArrowRight
                      size={17}
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Button>
                </Link>
              </div>
            </div>

            {/* ================= MOBILE BUTTON ================= */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-white text-brandDark shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 md:hidden"
              aria-label="Abrir menú"
            >
              <Menu
                size={24}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </button>
          </nav>
        </Container>
      </header>

      {/* ================= MOBILE MENU ================= */}

      {/* OVERLAY */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[60] bg-brandDark/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* SIDE PANEL */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-screen w-[85%] max-w-sm flex-col border-l border-white/20 bg-white/85 shadow-2xl backdrop-blur-2xl transition-transform duration-500 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER DEL PANEL */}
        <div className="flex items-center justify-between border-b border-zinc-200/70 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
              <PartyPopper size={21} />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-brandDark">
                EVENTA
              </h2>

              <p className="text-xs text-zinc-500">
                Organiza. Disfruta. Celebra.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 transition-all duration-300 hover:rotate-90 hover:bg-zinc-100 hover:text-brandDark"
            aria-label="Cerrar menú"
          >
            <X size={23} />
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="flex flex-1 flex-col justify-between px-5 py-8">
          <div>
            <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
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
                    className={`group flex items-center gap-4 rounded-2xl px-4 py-4 font-semibold transition-all duration-300 ${
                      active
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-zinc-600 hover:translate-x-1 hover:bg-zinc-100 hover:text-brandDark"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                        active
                          ? "bg-white/15"
                          : "bg-zinc-100 text-primary group-hover:bg-primary/10"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <span>{link.name}</span>

                    {active && (
                      <Sparkles
                        size={17}
                        className="ml-auto"
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* PARTE INFERIOR */}
          <div>
            <div className="mb-5 rounded-3xl border border-primary/10 bg-primary/5 p-5">
              <p className="text-sm font-bold text-brandDark">
                ¿Listo para celebrar? 🎉
              </p>

              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Cuéntanos sobre tu evento y recibe una recomendación personalizada.
              </p>
            </div>

            <Link to="/crear-evento" onClick={closeMenu}>
              <Button className="group w-full py-4">
                Crear mi evento

                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </Link>

            <p className="mt-6 text-center text-xs text-zinc-400">
              EVENTA · Planea mejor tus eventos
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;