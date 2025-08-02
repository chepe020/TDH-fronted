import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
} from "@ionic/react";

export const PrincipalPage = () => {
  return (
    <div
      id="menu-content"
      className="bg-gradient-to-br from-[var(--color-light)] to-[var(--color-accent)] text-[var(--color-dark)] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl w-full bg-[var(--color-white)] rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 lg:p-16">
        {/* Encabezado */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-4 leading-tight">
            SmartStudy
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-dark)] font-medium">
            Organiza tu vida,{" "}
            <span className="text-[var(--color-secondary)]">
              alcanza tus metas.
            </span>
          </p>
        </header>

        {/* Bienvenida */}
        <section className="mb-12 text-center">
          <p className="text-lg md:text-xl text-[var(--color-dark)] leading-relaxed max-w-2xl mx-auto">
            ¡Bienvenido a{" "}
            <span className="font-semibold text-[var(--color-primary)]">
              SmartStudy
            </span>
            ! Tu solución definitiva para mantener tus tareas bajo control y tu
            agenda perfectamente organizada. Deja atrás el estrés y da la
            bienvenida a la claridad y la productividad.
          </p>
        </section>

        {/* Cuadros de funciones */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-[var(--color-light)] p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
            <div className="text-[var(--color-primary)] text-4xl mb-4">
              <i className="fas fa-tasks"></i>
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">
              Gestión Inteligente de Tareas
            </h3>
            <p className="text-[var(--color-dark)]">
              Crea, prioriza y haz seguimiento a tus tareas sin esfuerzo. Define
              fechas límite, recordatorios y categorías para una máxima
              productividad.
            </p>
          </div>

          <div className="bg-[var(--color-light)] p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
            <div className="text-[var(--color-secondary)] text-4xl mb-4">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-2">
              Vista de Calendario Intuitiva
            </h3>
            <p className="text-[var(--color-dark)]">
              Visualiza tu horario, añade eventos y fechas importantes de forma
              rápida y sencilla.
            </p>
          </div>

          <div className="bg-[var(--color-light)] p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
            <div className="text-[var(--color-accent)] text-4xl mb-4">
              <i className="fas fa-sync-alt"></i>
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-accent)] mb-2">
              Sincronización Perfecta
            </h3>
            <p className="text-[var(--color-dark)]">
              Accede a tus tareas desde cualquier lugar, siempre actualizadas en
              todos tus dispositivos.
            </p>
          </div>

          <div className="bg-[var(--color-light)] p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
            <div className="text-[var(--color-primary)] text-4xl mb-4">
              <i className="fas fa-palette"></i>
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">
              Diseño Hermoso y Sencillo
            </h3>
            <p className="text-[var(--color-dark)]">
              Disfruta de una interfaz limpia e intuitiva que mejora tu enfoque
              y reduce distracciones.
            </p>
          </div>
        </section>

        {/* Demo */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-6">
            ¡Mira lo que puedes lograr!
          </h2>
          <div className="bg-[var(--color-light)] rounded-2xl p-8 border-2 border-dashed border-[var(--color-accent)] flex items-center justify-center min-h-[250px] md:min-h-[350px] text-[var(--color-accent)] text-lg md:text-xl italic">
            (Demo próximamente)
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-6">
            ¿Listo para tomar el control de tu tiempo?
          </h2>
          <a
            href="#"
            className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-white)] text-xl md:text-2xl font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300"
          >
            ¡Empezar ahora!
          </a>
        </section>
      </div>
    </div>
  );
};
