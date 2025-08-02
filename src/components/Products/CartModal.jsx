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
  IonIcon,
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

export const CartModal = ({ isOpen, onClose, cart, total, userPoints, onConfirm }) => (
  <IonModal isOpen={isOpen} onDidDismiss={onClose}>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Carrito de Compras</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={onClose} color="light">Cerrar</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      {cart?.keeperProduct?.length > 0 ? (
        <>
          <IonList>
            {cart.keeperProduct.map((item) => (
              <IonItem key={item.product?._id || item._id}>
                <img src={item.product?.imageUrl || 'https://via.placeholder.com/150'} className="w-12 h-12 rounded-lg mr-4" />
                <IonLabel>
                  <h3>{item.product?.name}</h3>
                  <p>Cantidad: {item.amountProduct}</p>
                  <p>Precio: ${(item.product?.price * item.amountProduct).toFixed(2)}</p>
                </IonLabel>
                <IonButton fill="clear" color="danger">
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>
          <div className="mt-4 text-right">
            <p className="text-lg font-bold">Total: ${total}</p>
            {userPoints && <p className="text-sm text-gray-600">Tus puntos: {userPoints}</p>}
          </div>
          <IonButton expand="block" className="mt-4" onClick={onConfirm}>
            Confirmar Compra
          </IonButton>
        </>
      ) : (
        <div className="text-center mt-8">
          <p className="text-lg">Tu carrito está vacío.</p>
        </div>
      )}
    </IonContent>
  </IonModal>
);
