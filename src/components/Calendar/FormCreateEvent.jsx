import React, { useState, useEffect } from "react";
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonLabel,
    IonDatetime,
    IonTextarea,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import { useUpdateEvent } from "../../shared/hooks/event/useUpdateEvent";
import { useCreateEvent } from "../../shared/hooks/event/useCreateEvent";
// Aquí ya no importamos createEvent de services/api, ya que el hook se encarga de eso.

export const FormCreateEvent = ({ isOpen, onClose, onEventCreated, eventToEdit }) => {
    const { updateEvent } = useUpdateEvent();
    const { createEvent } = useCreateEvent(); // Usamos la función del hook
    const [userLogged] = useState(() => JSON.parse(localStorage.getItem("user")));
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            title: "",
            description: "",
            dateStart: new Date().toISOString(),
            user: userLogged.id,
        },
    });

    useEffect(() => {
        if (eventToEdit) {
            reset({
                title: eventToEdit.title || "",
                description: eventToEdit.description || "",
                dateStart: eventToEdit.dateStart || "",
            });
            setSelectedDate(eventToEdit.dateStart || "");
        } else {
            reset({
                title: "",
                description: "",
                dateStart: new Date().toISOString(), // Se inicializa con la fecha actual
            });
            setSelectedDate(new Date().toISOString());
        }
    }, [eventToEdit, reset]);

    const onSubmit = async (data) => {
        if (eventToEdit) {
            await updateEvent(eventToEdit._id, data);
        } else {
            // Se llama a la función del hook en lugar de la función de API directamente
            await createEvent(data);
        }
        if (onEventCreated) {
            await onEventCreated();
        }
        reset();
        setSelectedDate("");
        onClose();
    };

    const handleDismiss = () => {
        reset();
        setSelectedDate("");
        onClose();
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={handleDismiss}>
            <IonHeader>
                <IonToolbar
                    style={{
                        "--background": "var(--ion-color-primary)",
                        "--color": "var(--ion-color-primary-contrast)",
                    }}
                >
                    <IonButtons slot="start">
                        <IonButton
                            onClick={handleDismiss}
                            style={{
                                "--color": "var(--ion-color-light)",
                            }}
                        >
                            Cancelar
                        </IonButton>
                    </IonButtons>
                    <IonTitle className="font-bold">{eventToEdit ? "Editar Evento" : "Crear Evento"}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            strong={true}
                            onClick={handleSubmit(onSubmit)}
                            style={{
                                "--background": "var(--ion-color-light)",
                                "--color": "var(--ion-color-dark)",
                                borderRadius: "8px",
                                padding: "0 12px",
                            }}
                        >
                            Guardar
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent
                className="ion-padding"
                style={{ "--background": "var(--ion-color-light)" }}
            >
                <IonItem
                    lines="full"
                    style={{
                        "--background": "var(--ion-color-white)",
                        borderRadius: "10px",
                        marginBottom: "12px",
                    }}
                >
                    <IonLabel position="stacked" style={{ color: "var(--ion-color-dark)" }}>
                        Título del evento
                    </IonLabel>
                    <IonInput
                        placeholder="Ej: Examen de Matemáticas"
                        {...register("title", { required: true })}
                        style={{ color: "var(--ion-color-dark)" }}
                    />
                </IonItem>

                <IonItem
                    lines="full"
                    style={{
                        "--background": "var(--ion-color-white)",
                        borderRadius: "10px",
                        marginBottom: "12px",
                    }}
                >
                    <IonLabel position="stacked" style={{ color: "var(--ion-color-dark)" }}>
                        Descripción
                    </IonLabel>
                    <IonTextarea
                        placeholder="Detalles del evento"
                        {...register("description")}
                        style={{ color: "var(--ion-color-dark)" }}
                    />
                </IonItem>

                <IonItem
                    lines="full"
                    style={{
                        "--background": "var(--ion-color-white)",
                        borderRadius: "10px",
                    }}
                >
                    <IonLabel position="stacked" style={{ color: "var(--ion-color-dark)" }}>
                        Fecha del Evento
                    </IonLabel>
                    <Controller
                        name="dateStart"
                        control={control}
                        render={({ field }) => (
                            <>
                                <IonDatetime
                                    presentation="date"
                                    value={field.value}
                                    min={new Date().toISOString().split("T")[0]}
                                    onIonChange={(e) => {
                                        field.onChange(e.detail.value);
                                        setSelectedDate(e.detail.value);
                                    }}
                                    style={{
                                        width: "100%",
                                        "--background": "var(--ion-color-light)",
                                        "--color": "var(--ion-color-dark)",
                                        borderRadius: "8px",
                                    }}
                                />
                                {selectedDate && (
                                    <p className="text-sm mt-2 text-[var(--ion-color-dark)]">
                                        Fecha seleccionada:{" "}
                                        <strong>
                                            {new Date(selectedDate).toLocaleDateString("es-ES", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </strong>
                                    </p>
                                )}
                            </>
                        )}
                    />
                </IonItem>
            </IonContent>
        </IonModal>
    );
};