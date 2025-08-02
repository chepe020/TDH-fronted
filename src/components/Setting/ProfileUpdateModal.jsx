import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSpinner,
  IonToast,
  IonAlert,
} from '@ionic/react';
import { closeCircleOutline, save } from 'ionicons/icons';
import { useUpdateUser } from '../../shared/hooks/user/useUpdateUser';
import { useUpdatePassword } from '../../shared/hooks/user/useUpdatePassword';

export const ProfileUpdateModal = ({ currentUser, onUpdate, onError, onClose }) => {
  const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm({
    defaultValues: {
      ...currentUser,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [showModalToast, setShowModalToast] = useState(false);
  const [modalToastMessage, setModalToastMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { updateUser } = useUpdateUser();
  const { updatePassword } = useUpdatePassword();

  const newPassword = watch('newPassword');

  const onSubmit = async (formData) => {
    setLoading(true);
    const passwordChanged = formData.newPassword && formData.newPassword.length > 0;
    if (passwordChanged) {
      setShowAlert(true);
    } else {
      await handleUpdate(formData);
    }
  };

  const handleUpdate = async (formData) => {
    setLoading(true);
    try {
      let isProfileUpdated = false;
      let isPasswordUpdated = false;

      const profileData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
      };

      if (formData.newPassword) {
        const passData = {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        };
        const passRes = await updatePassword(currentUser.uid, passData);
        if (passRes?.error) {
          throw new Error(passRes.error.response?.data?.msg || 'Error al actualizar la contraseña.');
        }
        isPasswordUpdated = true;
      }

      const userProfileChanged =
        profileData.name !== currentUser.name ||
        profileData.username !== currentUser.username ||
        profileData.email !== currentUser.email;

      if (userProfileChanged) {
        const userRes = await updateUser(currentUser.uid, profileData);
        if (userRes?.error) {
          throw new Error(userRes.error.response?.data?.msg || 'Error al actualizar el perfil.');
        }
        isProfileUpdated = true;
      }

      let message = 'Perfil y contraseña actualizados correctamente.';
      if (isProfileUpdated && !isPasswordUpdated) {
        message = 'Perfil actualizado correctamente.';
      } else if (!isProfileUpdated && isPasswordUpdated) {
        message = 'Contraseña actualizada correctamente.';
      }

      onUpdate(message);
    } catch (e) {
      onError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar
          style={{
            '--background': 'var(--ion-color-tertiary)',
            '--color': 'var(--ion-color-light)',
          }}
        >
          <IonTitle>Actualizar Perfil</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose} style={{ color: 'var(--ion-color-light)' }}>
              <IonIcon icon={closeCircleOutline} size="large" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className="ion-padding"
        style={{ '--background': 'var(--ion-color-light)' }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList lines="none" className="bg-transparent">
            {/* Campos de usuario */}
            {[
              { name: 'name', label: 'Nombre', type: 'text', rules: { required: true, maxLength: 25 } },
              { name: 'username', label: 'Nombre de Usuario', type: 'text', rules: { required: true } },
              { name: 'email', label: 'Email', type: 'email', rules: { required: true, pattern: /^\S+@\S+$/i } },
            ].map((field, idx) => (
              <IonItem
                key={idx}
                className="rounded-lg mb-4" // Se usa Tailwind y clases de Ionic para un estilo más limpio
                style={{
                  '--background': 'var(--ion-color-white)',
                  '--border-radius': '8px',
                  '--padding-start': '16px', // Espacio interior
                  '--inner-border-width': '0', // Elimina las líneas internas
                  '--border-width': '0', // Elimina los bordes del item
                  '--box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Sombra para el efecto de "tarjeta"
                }}
              >
                <IonLabel position="stacked" style={{ fontWeight: '600' }}>
                  {field.label}
                </IonLabel>
                <IonInput 
                  type={field.type} 
                  {...register(field.name, field.rules)} 
                  style={{ 
                    '--padding-start': '0', // Ajusta el padding para que no se separe del label
                    '--placeholder-color': 'var(--ion-color-medium)', // Color del texto de ejemplo
                    '--color': 'var(--ion-color-dark)', // Color del texto del input
                    '--placeholder-opacity': '1' // Asegura que el placeholder se vea bien
                  }} 
                />
              </IonItem>
            ))}

            {errors.name && <p className="error-message text-red-500 mt-[-10px] mb-4">El nombre es requerido y no debe exceder los 25 caracteres.</p>}
            {errors.username && <p className="error-message text-red-500 mt-[-10px] mb-4">El nombre de usuario es requerido.</p>}
            {errors.email && <p className="error-message text-red-500 mt-[-10px] mb-4">El email es requerido y debe ser válido.</p>}

            {/* Sección cambio de contraseña */}
            <h2
              className="font-bold text-lg mt-8 mb-4"
              style={{ color: 'var(--ion-color-dark)' }}
            >
              Cambiar Contraseña
            </h2>

            {[
              { name: 'currentPassword', label: 'Contraseña Actual', type: 'password', rules: { required: newPassword } },
              { name: 'newPassword', label: 'Nueva Contraseña', type: 'password', rules: { minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres.' } } },
              { name: 'confirmNewPassword', label: 'Confirmar Nueva Contraseña', type: 'password', rules: { validate: (value) => value === newPassword || 'Las contraseñas no coinciden.' } }
            ].map((field, idx) => (
              <IonItem
                key={idx}
                className="rounded-lg mb-4"
                style={{
                  '--background': 'var(--ion-color-white)',
                  '--border-radius': '8px',
                  '--padding-start': '16px',
                  '--inner-border-width': '0',
                  '--border-width': '0',
                  '--box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                }}
              >
                <IonLabel position="stacked" style={{ fontWeight: '600' }}>
                  {field.label}
                </IonLabel>
                <IonInput 
                  type={field.type} 
                  {...register(field.name, field.rules)} 
                  style={{ 
                    '--padding-start': '0',
                    '--placeholder-color': 'var(--ion-color-medium)',
                    '--color': 'var(--ion-color-dark)',
                    '--placeholder-opacity': '1'
                  }} 
                />
              </IonItem>
            ))}

            {errors.currentPassword && <p className="error-message text-red-500 mt-[-10px] mb-4">La contraseña actual es requerida para cambiar la contraseña.</p>}
            {errors.newPassword && <p className="error-message text-red-500 mt-[-10px] mb-4">{errors.newPassword.message}</p>}
            {errors.confirmNewPassword && <p className="error-message text-red-500 mt-[-10px] mb-4">{errors.confirmNewPassword.message}</p>}
          </IonList>

          <IonButton
            expand="full"
            type="submit"
            className="ion-margin-top"
            disabled={loading}
            style={{
              '--background': 'var(--ion-color-tertiary)',
              '--color': 'var(--ion-color-light)',
              '--border-radius': '12px',
              '--box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginTop: '10px',
            }}
          >
            {loading ? <IonSpinner name="crescent" /> : <IonIcon slot="start" icon={save} />}
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </IonButton>
        </form>

        {/* Alert y Toast */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Confirmar actualización"
          message="Estás a punto de actualizar tu contraseña y/o tu información de perfil. ¿Quieres continuar?"
          buttons={[
            { text: 'Cancelar', role: 'cancel', handler: () => setLoading(false) },
            { text: 'Confirmar', handler: () => handleUpdate(getValues()) },
          ]}
        />

        <IonToast
          isOpen={showModalToast}
          onDidDismiss={() => setShowModalToast(false)}
          message={modalToastMessage}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </>
  );
};