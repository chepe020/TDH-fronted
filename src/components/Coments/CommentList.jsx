import { useViewComentId } from "../../shared/hooks/coments/useViewComentId";
import { useDeleteComment } from "../../shared/hooks/coments/useDeleteComment";
import { usePutComent } from "../../shared/hooks/coments/usePutComent";
import { useEffect, useState } from "react";
import { IonList, IonItem, IonLabel, IonButton, IonInput } from "@ionic/react";
import { createOutline, trashOutline, saveOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export const CommentList = ({ publicationId, userId }) => {
  const { comments, loadingComments } = useViewComentId(publicationId);
  const { deleteComment } = useDeleteComment();
  const { putComment } = usePutComent();

  const [localComments, setLocalComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleDelete = async (id) => {
    await deleteComment(id);
    setLocalComments(localComments.filter((c) => c._id !== id));
  };

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditedContent(comment.content);
  };

  const handleSave = async (id) => {
    const { error } = await putComment(id, { content: editedContent });
    if (!error) {
      setLocalComments(
        localComments.map((c) =>
          c._id === id ? { ...c, content: editedContent } : c
        )
      );
      setEditingId(null);
      setEditedContent("");
    }
  };

  if (loadingComments) {
    return (
      <p className="p-4 text-gray-500 text-center">Cargando comentarios...</p>
    );
  }

  if (localComments.length === 0) {
    return (
      <p className="p-4 text-gray-400 italic text-center">
        No hay comentarios aún.
      </p>
    );
  }

  return (
    <IonList className="bg-transparent p-4">
      {localComments.map((comment) => (
        <IonItem
          key={comment._id}
          className="ion-no-padding rounded-lg mb-2 shadow-sm"
        >
          {editingId === comment._id ? (
            <div className="flex items-center w-full p-2 bg-white rounded-lg transition-all duration-300 ease-in-out scale-100">
              <IonInput
                value={editedContent}
                onIonChange={(e) => setEditedContent(e.detail.value)}
                className="flex-grow mr-2 border-none"
                animated
              />
              <div className="flex items-center space-x-2 ml-2">
                <IonButton
                  onClick={() => handleSave(comment._id)}
                  color="success"
                  fill="clear"
                  size="small"
                >
                  <IonIcon icon={saveOutline} />
                </IonButton>
                <IonButton
                  onClick={() => {
                    setEditingId(null);
                    setEditedContent("");
                  }}
                  color="medium"
                  fill="clear"
                  size="small"
                >
                  Cancelar
                </IonButton>
              </div>
            </div>
          ) : (
            <div className="flex items-center w-full p-2 bg-white rounded-lg transition-all duration-300 ease-in-out scale-100">
              <IonLabel className="ion-text-wrap text-black flex-grow">
                {comment.content}
              </IonLabel>
              {/* Solo mostrar los botones si el comentario es del usuario actual */}
              {(
                comment.authorComment === userId ||
                (comment.authorComment?._id && comment.authorComment._id === userId)
              ) && (
                <div className="flex items-center space-x-2 ml-4">
                  <IonButton
                    onClick={() => handleEdit(comment)}
                    color="warning"
                    fill="clear"
                    size="small"
                  >
                    <IonIcon icon={createOutline} />
                  </IonButton>
                  <IonButton
                    onClick={() => handleDelete(comment._id)}
                    color="danger"
                    fill="clear"
                    size="small"
                  >
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </div>
              )}
            </div>
          )}
        </IonItem>
      ))}
    </IonList>
  );
};