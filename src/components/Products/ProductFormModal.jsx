import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
} from '@ionic/react';

export const ProductFormModal = ({ isOpen, onClose, title, onSubmit, initialData }) => (
  <IonModal isOpen={isOpen} onDidDismiss={onClose}>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={onClose} color="light">Cerrar</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          onSubmit({
            name: form.name.value,
            price: parseFloat(form.price.value),
            description: form.description.value,
          });
        }}
      >
        <IonList>
          <IonItem className="mb-3">
            <IonLabel position="floating">Nombre del Producto</IonLabel>
            <IonInput name="name" type="text" defaultValue={initialData?.name} required />
          </IonItem>
          <IonItem className="mb-3">
            <IonLabel position="floating">Precio</IonLabel>
            <IonInput name="price" type="number" step="0.01" defaultValue={initialData?.price} required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Descripción</IonLabel>
            <IonTextarea name="description" defaultValue={initialData?.description} />
          </IonItem>
        </IonList>
        <IonButton expand="block" type="submit" className="mt-6">
          Guardar
        </IonButton>
      </form>
    </IonContent>
  </IonModal>
);
