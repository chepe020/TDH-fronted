import { useState } from "react";
import { IonModal, IonButton, IonTextarea, IonLabel, IonIcon } from "@ionic/react";
import { closeOutline} from "ionicons/icons";
import { useAddComents } from "../../shared/hooks/coments/useAddComents";
import toast from "react-hot-toast";

export const ComentForm = ({ isOpen, onClose, publicationId }) => {
  const [comment, setComment] = useState("");
  const { createComment } = useAddComents();

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("El comentario no puede estar vacío");
      return;
    }

    const success = await createComment({ content: comment, publicationId });
    window.location.reload();


    if (success) {
      toast.success("Comentario agregado correctamente");
      setComment("");
      onClose(); 
    } else {
      toast.error("Error al agregar comentario");
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <div className="p-6 bg-white h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-indigo-700">Agregar Comentario</h2>
            <IonButton fill="clear" onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </div>

          <IonLabel className="block mb-2 text-gray-700 font-semibold">
            Comentario
          </IonLabel>
          <IonTextarea
            value={comment}
            onIonChange={(e) => setComment(e.detail.value)}
            placeholder="Escribe tu comentario aquí..."
            rows={6}
            className="w-full border border-gray-300 rounded p-3"
          />
        </div>

        <IonButton
          onClick={handleSubmit}
          expand="block"
          color="primary"
          className="mt-6 rounded-xl font-semibold text-lg"
        >
          Enviar Comentario
        </IonButton>
      </div>
    </IonModal>
  );
};
