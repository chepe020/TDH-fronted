import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonToast,
  IonSpinner,
  IonIcon,
  IonModal,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { create, logOut } from 'ionicons/icons';
import { useInfomationUser } from '../../shared/hooks/user/useGetInfoUser';
import { ProfileUpdateModal } from '../../components/Setting/ProfileUpdateModal';

export const SettingPage = () => {
  const { userDetails, loading, error, getUserInfo } = useInfomationUser();
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const renderUserInfo = () => (
    <div className="min-h-full px-4 py-6">
      <h1
        className="text-3xl font-bold text-center mb-6"
        style={{ color: 'var(--ion-color-dark)' }}
      >
        Información de Usuario
      </h1>

      <div
        className="p-4 rounded-xl shadow-xl border"
        style={{
          backgroundColor: 'var(--ion-color-light)',
          borderColor: 'var(--ion-color-medium-shade)',
        }}
      >
        <IonList lines="none" className="bg-transparent">
          {[
            { label: 'Nombre', value: userDetails?.name },
            { label: 'Nombre de Usuario', value: userDetails?.username },
            { label: 'Email', value: userDetails?.email },
            { label: 'Puntos', value: userDetails?.points },
            { label: 'Rol', value: userDetails?.role },
          ].map((info, idx) => (
            <IonItem
              key={idx}
              className="rounded-lg mb-2"
              style={{
                '--background': 'var(--ion-color-white)',
                border: '1px solid var(--ion-color-medium)',
                borderRadius: '8px',
              }}
            >
              <IonLabel>{info.label}</IonLabel>
              <p className="ion-text-right" style={{ color: 'var(--ion-color-dark)' }}>
                {info.value}
              </p>
            </IonItem>
          ))}
        </IonList>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {/* Botón Editar Perfil */}
        <IonButton
          onClick={() => setShowModal(true)}
          className="w-full max-w-sm shadow-lg hover:scale-105 transition-transform"
          style={{
            '--background': 'var(--ion-color-tertiary)',
            '--color': 'var(--ion-color-light)',
            '--border-radius': '12px',
            '--box-shadow':
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          <IonIcon slot="start" icon={create} />
          Editar Perfil
        </IonButton>

        {/* Botón Cerrar Sesión */}
        <IonButton
          onClick={handleLogout}
          className="w-full max-w-sm shadow-lg hover:scale-105 transition-transform"
          style={{
            '--background': 'linear-gradient(90deg, var(--ion-color-dark), var(--ion-color-primary))',
            '--color': 'var(--ion-color-light)',
            '--border-radius': '12px',
            '--box-shadow':
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          <IonIcon slot="start" icon={logOut} />
          Cerrar Sesión
        </IonButton>
      </div>
    </div>
  );

  return (
    <IonPage>
      <IonContent
        fullscreen
        style={{
          backgroundColor: 'var(--ion-color-light)',
        }}
      >
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full">
            <IonSpinner name="crescent" color="tertiary" />
            <p className="mt-4 text-center" style={{ color: 'var(--ion-color-medium)' }}>
              Cargando perfil...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="mt-4 text-center" style={{ color: 'var(--ion-color-danger)' }}>
              {error}
            </p>
          </div>
        ) : userDetails ? (
          renderUserInfo()
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="mt-4 text-center" style={{ color: 'var(--ion-color-medium)' }}>
              No se encontraron datos del usuario.
            </p>
          </div>
        )}

        {/* Modal para editar perfil */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          {userDetails && (
            <ProfileUpdateModal
              currentUser={userDetails}
              onUpdate={() => {
                getUserInfo();
                setShowModal(false);
                setToastMessage('Perfil actualizado correctamente.');
                setShowToast(true);
              }}
              onError={(message) => {
                setShowModal(false);
                setToastMessage(message);
                setShowToast(true);
              }}
              onClose={() => setShowModal(false)}
            />
          )}
        </IonModal>

        {/* Toast de confirmación */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastMessage.includes('Error') ? 'danger' : 'success'}
        />
      </IonContent>
    </IonPage>
  );
};
