import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';

export const ProductCard = ({ product, isAdmin, onAddToCart, onEdit, onDelete }) => {
  return (
    <IonCard className="shadow-md rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
      <img
        src={product.imageUrl || 'https://via.placeholder.com/150'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <IonCardHeader>
        <IonCardTitle className="text-center text-lg font-bold">{product.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p className="text-xl font-semibold text-primary mb-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <div className="flex gap-2">
          <IonButton expand="block" onClick={onAddToCart} color="secondary">
            Agregar al Carrito
          </IonButton>
          {isAdmin && (
            <>
              <IonButton onClick={onEdit} color="warning">
                <IonIcon icon={pencilOutline} />
              </IonButton>
              <IonButton onClick={onDelete} color="danger">
                <IonIcon icon={trashOutline} />
              </IonButton>
            </>
          )}
        </div>
      </IonCardContent>
    </IonCard>
  );
};
