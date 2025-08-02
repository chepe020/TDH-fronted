import React, { useState, useEffect } from 'react';
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
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonTextarea,
} from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import { useCreateTask } from '../../shared/hooks/tasks/useCrateTask';
import { useUpdateTask } from '../../shared/hooks/tasks/useUpdateTask';
import { useGetCategory } from '../../shared/hooks/category/useGetCategory';

export const FormTaskModal = ({ isOpen, onClose, onTaskCreated, taskToEdit }) => {
    const { createTask } = useCreateTask();
    const { updateTask } = useUpdateTask();
    const { getCategory, categories } = useGetCategory();
    const [userLogged] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [selectedDate, setSelectedDate] = useState('');

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            taskName: '',
            taskDescription: '',
            dueDate: '',
            priority: '',
            nameSubject: '',
            user: userLogged.id,
        },
    });

    useEffect(() => {
        getCategory();
        if (taskToEdit) {
            reset({
                taskName: taskToEdit.taskName || '',
                taskDescription: taskToEdit.taskDescription || '',
                dueDate: taskToEdit.dueDate || '',
                priority: taskToEdit.priority || '',
                nameSubject: taskToEdit.category || '',
            });
            setSelectedDate(taskToEdit.dueDate || '');
        } else {
            reset({
                taskName: '',
                taskDescription: '',
                dueDate: '',
                priority: '',
                nameSubject: '',
                user: userLogged.id,
            });
            setSelectedDate('');
        }
    }, [taskToEdit, reset]);

    const onSubmit = async (data) => {
        if (taskToEdit) {
            await updateTask(taskToEdit._id, data);
        } else {
            createTask(data);
        }
        if (onTaskCreated){
            await onTaskCreated();
        } 
        reset();
        setSelectedDate('');
        onClose();
    };

    const handleDismiss = () => {
        reset();
        setSelectedDate('');
        onClose();
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={handleDismiss}>
            <IonHeader>
                <IonToolbar
                    style={{
                        background: 'linear-gradient(90deg, var(--ion-color-primary), var(--ion-color-dark))',
                        color: 'var(--ion-color-light)',
                    }}
                >
                    <IonButtons slot="start">
                        <IonButton
                            onClick={handleDismiss}
                            style={{ color: 'var(--ion-color-light)', fontWeight: 'bold' }}
                        >
                            Cancelar
                        </IonButton>
                    </IonButtons>
                    <IonTitle style={{ fontWeight: 'bold', color: 'var(--ion-color-light)' }}>
                        {taskToEdit ? 'Editar Tarea' : 'Crear Tarea'}
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            strong={true}
                            onClick={handleSubmit(onSubmit)}
                            style={{
                                background: 'var(--ion-color-light)',
                                color: 'var(--ion-color-primary)',
                                borderRadius: '8px',
                                fontWeight: '600',
                                padding: '6px 14px',
                            }}
                        >
                            Guardar
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent
                className="ion-padding"
                style={{ backgroundColor: 'var(--ion-color-light)' }}
            >
                {/* Nombre de la tarea */}
                <IonItem
                    style={{
                        backgroundColor: 'var(--ion-color-white)',
                        borderRadius: '12px',
                        marginBottom: '12px',
                    }}
                >
                    <IonLabel position="stacked" style={{ color: 'var(--ion-color-dark)' }}>
                        Nombre de la tarea
                    </IonLabel>
                    <IonInput
                        placeholder="Ej: Hacer compras"
                        {...register('taskName', { required: true })}
                        style={{ color: 'var(--ion-color-dark)' }}
                    />
                </IonItem>

                {/* Descripción */}
                <IonItem
                    style={{
                        backgroundColor: 'var(--ion-color-white)',
                        borderRadius: '12px',
                        marginBottom: '12px',
                    }}
                >
                    <IonLabel position="stacked" style={{ color: 'var(--ion-color-dark)' }}>
                        Descripción
                    </IonLabel>
                    <IonTextarea
                        placeholder="Detalles de la tarea"
                        {...register('taskDescription')}
                        style={{ color: 'var(--ion-color-dark)' }}
                    />
                </IonItem>

                {/* Fecha límite */}
                <IonItem
                    style={{
                        backgroundColor: 'var(--ion-color-white)',
                        borderRadius: '12px',
                        marginBottom: '12px',
                    }}
                >
                    <IonLabel position="stacked" style={{ color: 'var(--ion-color-dark)' }}>
                        Fecha límite
                    </IonLabel>
                    <Controller
                        name="dueDate"
                        control={control}
                        render={({ field }) => (
                            <>
                                <IonDatetime
                                    presentation="date"
                                    value={field.value}
                                    onIonChange={(e) => {
                                        field.onChange(e.detail.value);
                                        setSelectedDate(e.detail.value);
                                    }}
                                    style={{
                                        '--background': 'var(--ion-color-light)',
                                        '--color': 'var(--ion-color-dark)',
                                        borderRadius: '8px',
                                    }}
                                />
                                {selectedDate && (
                                    <p className="text-sm mt-2" style={{ color: 'var(--ion-color-dark)' }}>
                                        Fecha seleccionada:{' '}
                                        <strong>
                                            {new Date(selectedDate).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </strong>
                                    </p>
                                )}
                            </>
                        )}
                    />
                </IonItem>

                {/* Prioridad */}
                <IonItem
                    style={{
                        backgroundColor: 'var(--ion-color-white)',
                        borderRadius: '12px',
                        marginBottom: '12px',
                    }}
                >
                    <IonLabel position="stacked" style={{ color: 'var(--ion-color-dark)' }}>
                        Prioridad
                    </IonLabel>
                    <IonSelect
                        placeholder="Seleccionar"
                        {...register('priority')}
                        style={{
                            '--background': 'var(--ion-color-light)',
                            '--color': 'var(--ion-color-dark)',
                        }}
                    >
                        <IonSelectOption value="Important">Importante</IonSelectOption>
                        <IonSelectOption value="Medium">Media</IonSelectOption>
                        <IonSelectOption value="Normal">Baja</IonSelectOption>
                    </IonSelect>
                </IonItem>

                {/* Categoría */}
                <IonItem
                    style={{
                        backgroundColor: 'var(--ion-color-white)',
                        borderRadius: '12px',
                        marginBottom: '12px',
                    }}
                >
                    <IonLabel position="stacked" style={{ color: 'var(--ion-color-dark)' }}>
                        Categoría
                    </IonLabel>
                    <IonSelect
                        placeholder="Seleccionar"
                        {...register('nameSubject')}
                        style={{
                            '--background': 'var(--ion-color-light)',
                            '--color': 'var(--ion-color-dark)',
                        }}
                    >
                        {categories.map((category) => (
                            <IonSelectOption key={category._id} value={category.nameSubject}>
                                {category.nameSubject}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </IonItem>
            </IonContent>
        </IonModal>
    );
};
