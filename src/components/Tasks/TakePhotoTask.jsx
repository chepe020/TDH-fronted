import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';
import {
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from '@ionic/react';
import { useUpdateTask } from '../../shared/hooks/tasks/useUpdateTask';

export const CameraModal = ({ isOpen, onClose, taskId, onTaskCreated }) => {
    const [photo, setPhoto] = useState(null);
    const { updateTask } = useUpdateTask();

    const takePhoto = async () => {
        try {
            const image = await Camera.getPhoto({
                resultType: CameraResultType.Base64,
                source: CameraSource.Camera,
                quality: 60, // <-- Calidad reducida a 60%
                width: 800, // <-- Ancho máximo de la imagen
                height: 600, // <-- Alto máximo de la imagen
            });

            // El resultado ya viene como una cadena de Base64 sin el prefijo "data:image/..."
            // Hay que agregarlo para que el navegador lo pueda interpretar
            const base64Image = `data:image/jpeg;base64,${image.base64String}`;
            setPhoto(base64Image);

        } catch (error) {
            console.error("Error al tomar la foto:", error);
        }
    };

    const savePhoto = async () => {
    try {
        if (!photo) {
            console.error("No hay foto para guardar.");
            return;
        }

        await updateTask(taskId, {
            imageUrl: photo, 
            taskStatus: 'Completed',
        });
        
        await onTaskCreated();
        onClose();

    } catch (error) {
        console.error("Error al guardar la foto:", error);
    }
};

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            {/* Encabezado con degradado */}
            <IonHeader>
                <IonToolbar
                    style={{
                        background: 'linear-gradient(90deg, var(--ion-color-primary), var(--ion-color-dark))',
                        color: 'var(--ion-color-light)',
                    }}
                >
                    <IonTitle style={{ fontWeight: 'bold', color: 'var(--ion-color-light)' }}>
                        Tomar Foto
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            onClick={onClose}
                            style={{ color: 'var(--ion-color-light)', fontWeight: 'bold' }}
                        >
                            Cerrar
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            {/* Contenido con foto o botón */}
            <IonContent
                className="ion-padding"
                style={{
                    backgroundColor: 'var(--ion-color-light)',
                    color: 'var(--ion-color-dark)',
                }}
            >
                {!photo ? (
                    <IonButton
                        expand="block"
                        onClick={takePhoto}
                        style={{
                            background: 'var(--ion-color-primary)',
                            color: 'var(--ion-color-light)',
                            fontWeight: '600',
                            borderRadius: '12px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        }}
                    >
                        📸 Tomar Foto
                    </IonButton>
                ) : (
                    <>
                        <img
                            src={photo}
                            alt="Foto"
                            style={{
                                width: '100%',
                                borderRadius: '12px',
                                marginBottom: '16px',
                                border: '2px solid var(--ion-color-primary)',
                            }}
                        />
                        <IonButton
                            expand="block"
                            onClick={savePhoto}
                            style={{
                                background: 'linear-gradient(90deg, var(--ion-color-primary), var(--ion-color-dark))',
                                color: 'var(--ion-color-light)',
                                fontWeight: '600',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                            }}
                        >
                            Guardar Foto
                        </IonButton>
                    </>
                )}
            </IonContent>
        </IonModal>
    );
};
