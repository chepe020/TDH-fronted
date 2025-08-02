import React from 'react';
import {
  IonButton,
  IonButtons,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';

export const TaskDetailsModal = ({ isOpen, onClose, task }) => {
  if (!task) return null;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar
          style={{
            '--background': 'var(--ion-color-primary)',
            '--color': 'var(--ion-color-light)',
          }}
        >
          <IonTitle>Detalles de la Tarea</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose} style={{ color: 'var(--ion-color-light)' }}>
              <IonIcon icon={closeCircleOutline} size="large" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ backgroundColor: 'var(--ion-color-light)' }}>
        <IonCard
          style={{
            borderRadius: '16px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            padding: '10px',
          }}
        >
          <IonCardHeader>
            <IonCardTitle
              style={{
                fontSize: '1.6rem',
                fontWeight: 'bold',
                color: 'var(--ion-color-primary)',
                textAlign: 'center',
                marginBottom: '12px',
              }}
            >
              {task.taskName}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            <p className="mb-4">
              <strong>Descripción:</strong>
              <br />
              <span style={{ color: 'var(--ion-color-dark)' }}>{task.taskDescription || 'Sin descripción'}</span>
            </p>

            <p className="mb-4">
              <strong>Fecha de Vencimiento:</strong>
              <br />
              <span style={{ color: 'var(--ion-color-dark)' }}>{task.dueDate || 'Sin fecha asignada'}</span>
            </p>

            <p className="mb-4">
              <strong>Prioridad:</strong>
              <br />
              <span style={{ color: 'var(--ion-color-dark)' }}>{task.priority}</span>
            </p>

            <p className="mb-4">
              <strong>Estado:</strong>
              <br />
              <span
                style={{
                  color:
                    task.taskStatus === 'Completed'
                      ? 'green'
                      : task.taskStatus === 'Pending'
                      ? 'orange'
                      : 'red',
                  fontWeight: '500',
                }}
              >
                {task.taskStatus}
              </span>
            </p>

            {task.imageUrl && (
              <div style={{ marginTop: '20px' }}>
                <strong>Imagen:</strong>
                <img
                  src={task.imageUrl}
                  alt="Evidencia de la tarea"
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}
                />
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonModal>
  );
};
