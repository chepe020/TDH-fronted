import React from 'react';
import {
  IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage,
  IonTitle, IonToolbar, IonButton, IonIcon, IonFab, IonFabButton, IonFabList,
  IonItem, IonLabel, IonList, IonMenuToggle
} from '@ionic/react';

import {
  search, personCircle,  home, list, settings, calendar, folder, chatbubble, newspaper,  helpCircle,
  trophy
} from 'ionicons/icons';

import { Outlet } from 'react-router-dom';

export const MenuComponent = () => {
  return (
    <>
      {/* Menú lateral */}
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar style={{ "--background": "var(--color-primary)" }}>
            <IonTitle className="text-white font-bold tracking-wide">Menú</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent style={{ "--background": "var(--color-light)" }} className="ion-padding">
          <IonList className="py-4">
            {[
              { link: "/dashboard", icon: home, label: "Inicio" },
              { link: "/dashboard/tasks", icon: list, label: "Tareas" },
              { link: "/dashboard/calendar", icon: calendar, label: "Calendario" },
              { link: "/dashboard/category", icon: folder, label: "Categorías" },
              { link: "/dashboard/publication", icon: newspaper, label: "Publicaciones" },
              { link: "/dashboard/comentario", icon: chatbubble, label: "Comentarios" },
              //{ link: "/dashboard/products", label: "Canejar Puntos"},
              { link: "/dashboard/falshcard", icon: helpCircle, label: "Preguntas y respuestas" },
              { link: "/dashboard/logros",icon: trophy, label: "Logros"},
              { link: "/dashboard/setting", icon: settings, label: "Mi Perfil" },
            ].map((item, idx) => (
              <IonMenuToggle key={idx} autoHide={false}>
                <IonItem
                  routerLink={item.link}
                  routerDirection="none"
                  className="transition duration-300 rounded-lg mb-2"
                  style={{ "--background": "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <IonIcon slot="start" icon={item.icon} style={{ color: "var(--color-primary)", marginRight: "1rem" }} />
                  <IonLabel style={{ color: "var(--color-secondary)" }}>{item.label}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Layout principal */}
      <IonPage id="main-content" style={{ background: "var(--color-light)" }}>
        <IonHeader>
          <IonToolbar style={{ "--background": "var(--color-white)" }} className="shadow-md flex justify-between items-center px-4">
            <IonButtons slot="start">
              <IonMenuButton style={{ color: "var(--color-primary)" }} />
            </IonButtons>
            <IonTitle style={{ color: "var(--color-secondary)" }} className="font-bold text-xl">Smart Study</IonTitle>
            <IonButtons slot="secondary" className="space-x-2">
              <IonButton className="hover:scale-110 transition-transform">
                <IonIcon slot="icon-only" icon={personCircle} style={{ color: "var(--color-primary)", fontSize: "1.5rem" }} />
              </IonButton>
              <IonButton className="hover:scale-110 transition-transform">
                <IonIcon slot="icon-only" icon={search} style={{ color: "var(--color-secondary)", fontSize: "1.25rem" }} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding" style={{ "--background": "var(--color-light)" }}>
          <div className="p-4 rounded-2xl min-h-[80vh] transition-all duration-300 shadow-lg" style={{ background: "var(--color-white)" }}>
            <Outlet />
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};