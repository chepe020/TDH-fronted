import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
    IonPage,
    IonContent,
    IonModal,
    IonButton,
    IonIcon,
    IonAlert,
} from "@ionic/react";
import { useGetEvents } from "../../shared/hooks/event/useGetEvents";
import { create, pencil, closeCircleOutline, trash } from "ionicons/icons";
import { FormCreateEvent } from "../../components/Calendar/FormCreateEvent";
import { useDeleteEvent } from "../../shared/hooks/event/useDeleteEvent";
import 'react-calendar/dist/Calendar.css';

export const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const { getEvents, events } = useGetEvents();
    const { deleteEvent } = useDeleteEvent();
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    useEffect(() => {
        getEvents();
    }, []); 

    useEffect(() => {
        if (events.length > 0) {
            const dayEvents = events.filter(
                (event) => new Date(event.dateStart).toDateString() === date.toDateString()
            );
            setSelectedEvents(dayEvents);
        } else {
            setSelectedEvents([]);
        }
    }, [events, date]);

    const handleEventCreatedOrUpdated = async () => {
        await getEvents(); 
        setIsOpenCreate(false); 
        setIsOpenEdit(false); 
    };

    const openModalEdit = (event) => {
        setShowModal(false);
        setEventToEdit(event);
        setIsOpenEdit(true);
    };

    const tileContent = ({ date, view }) => {
        if (view === "month") {
            const dayEvents = events.filter(
                (event) => new Date(event.dateStart).toDateString() === date.toDateString()
            );
            return dayEvents.length > 0 ? (
                <span
                    className="block w-2 h-2 mx-auto mt-1 rounded-full"
                    style={{ backgroundColor: "var(--ion-color-tertiary)" }}
                ></span>
            ) : null;
        }
    };

    const handleDateClick = (selectedDate) => {
        setDate(selectedDate);
        setShowModal(true);
    };

    const handleOpenDeleteAlert = (event) => {
        setEventToDelete(event);
        setShowAlert(true);
    };

    const confirmDelete = async () => {
        if (eventToDelete) {
            try {
                await deleteEvent(eventToDelete._id);
                await getEvents();
            } catch (error) {
                console.error("Error al eliminar el evento:", error);
            } finally {
                setEventToDelete(null);
                setShowAlert(false); 
            }
        }
    };

    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding" style={{ "--background": "var(--ion-color-white)" }}>
                <div className="min-h-full px-4 py-6">
                    <h1 className="text-3xl font-bold text-center mb-6" style={{ color: "var(--ion-color-dark)" }}>
                        Calendario de Eventos
                    </h1>

                    <div className="flex justify-center mb-6">
                        <IonButton
                            onClick={() => setIsOpenCreate(true)}
                            className="w-full max-w-sm shadow-lg hover:scale-105 transition-transform"
                            style={{
                                "--background": "var(--ion-color-tertiary)",
                                "--border-radius": "12px",
                                "--box-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                            }}
                        >
                            <IonIcon slot="start" icon={create} />
                            Crear nueva tarea
                        </IonButton>
                    </div>

                    <div className="p-4 rounded-xl shadow-xl border" style={{ backgroundColor: "var(--ion-color-light)", borderColor: "var(--ion-color-medium-shade)" }}>
                        <Calendar
                            onChange={handleDateClick}
                            value={date}
                            tileContent={tileContent}
                            className="w-full text-sm sm:text-base"
                        />
                    </div>
                </div>

                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <div className="bg-white rounded-xl max-w-lg mx-auto p-6 shadow-xl h-full flex flex-col" style={{ backgroundColor: "var(--ion-color-white)" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-xl" style={{ color: "var(--ion-color-dark)" }}>
                                Eventos del {date.toLocaleDateString()}
                            </h2>
                            <IonButton onClick={() => setShowModal(false)} fill="clear" className="text-gray-500">
                                <IonIcon icon={closeCircleOutline} size="large" style={{ color: "var(--ion-color-medium-shade)" }} />
                            </IonButton>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2">
                            {selectedEvents.length > 0 ? (
                                selectedEvents.map((ev) => (
                                    <div
                                        key={ev._id}
                                        className="mb-4 rounded-xl shadow-md border-l-4 p-4 hover:scale-[1.02] transition-transform"
                                        style={{
                                            backgroundColor: "var(--ion-color-light)",
                                            borderColor: "var(--ion-color-tertiary)",
                                        }}
                                    >
                                        <h3 className="font-semibold text-lg" style={{ color: "var(--ion-color-dark)" }}>
                                            {ev.title}
                                        </h3>
                                        <p className="text-gray-600">{ev.description}</p>
                                        <p className="text-sm mt-1" style={{ color: "var(--ion-color-medium)" }}>
                                            {new Date(ev.dateStart).toLocaleDateString()}
                                        </p>
                                        <div className="mt-3 flex justify-end gap-2">
                                            <IonButton
                                                onClick={() => openModalEdit(ev)}
                                                fill="clear"
                                                className="text-blue-600"
                                                style={{ "--color": "var(--ion-color-tertiary)" }}
                                            >
                                                <IonIcon slot="start" icon={pencil} />
                                                Editar
                                            </IonButton>
                                            <IonButton
                                                onClick={() => handleOpenDeleteAlert(ev)}
                                                fill="clear"
                                                color="danger"
                                            >
                                                <IonIcon slot="start" icon={trash} />
                                                Eliminar
                                            </IonButton>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-10" style={{ color: "var(--ion-color-medium)" }}>
                                    No hay eventos para este día.
                                </p>
                            )}

                            <IonAlert
                                isOpen={showAlert}
                                onDidDismiss={() => setShowAlert(false)}
                                header={'Confirmar eliminación'}
                                message={`¿Estás seguro de que quieres eliminar el evento "${eventToDelete?.title}"? Esta acción no se puede deshacer.`}
                                buttons={[
                                    {
                                        text: 'Cancelar',
                                        role: 'cancel',
                                        cssClass: 'alert-cancel',
                                        handler: () => {
                                            setEventToDelete(null);
                                        },
                                    },
                                    {
                                        text: 'Eliminar',
                                        role: 'destructive',
                                        cssClass: 'alert-destructive',
                                        handler: confirmDelete,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </IonModal>

                <FormCreateEvent
                    isOpen={isOpenCreate}
                    onClose={() => setIsOpenCreate(false)}
                    onEventCreated={handleEventCreatedOrUpdated}
                />
                <FormCreateEvent
                    isOpen={isOpenEdit}
                    onClose={() => setIsOpenEdit(false)}
                    onEventCreated={handleEventCreatedOrUpdated}
                    eventToEdit={eventToEdit}
                />
            </IonContent>
        </IonPage>
    );
};