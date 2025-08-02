import { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonTextarea,
  IonButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonModal,
} from "@ionic/react";
import {
  pencilOutline,
  trashOutline,
  closeOutline,
  checkmarkOutline,
  chatbubbleOutline,
} from "ionicons/icons";
import { useAddPublication } from "../../shared/hooks/publication/useAddPublication";
import { useDeletePublication } from "../../shared/hooks/publication/useDeletePublication";
import { useViewPublications } from "../../shared/hooks/publication/useViewPublications";
import { useUpdatePublication } from "../../shared/hooks/publication/useUpdatePublication";
import { CommentList } from "../Coments/CommentList";
import { ComentForm } from "../Coments/ComentForms";

import toast from "react-hot-toast";

const PublicationForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [userRole, setUserRole] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editId, setEditId] = useState("");

  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  const { createPublication, isLoading } = useAddPublication();
  const { publications, getPublications } = useViewPublications();
  const { handleDeletePublication } = useDeletePublication();
  const { handleUpdatePublication } = useUpdatePublication();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.id) setAuthor(user.id);
        if (user.role) setUserRole(user.role);
      } catch (error) {
        console.error("Error al parsear el usuario desde localStorage:", error);
      }
    }

    getPublications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      return toast.error("Todos los campos son obligatorios.");
    }

    const success = await createPublication({ title, content, author });

    if (success) {
      toast.success("¡Publicación creada exitosamente!");
      setTitle("");
      setContent("");
      getPublications();
    }
  };

  const handleEdit = (id, content) => {
    setEditId(id);
    setEditContent(content);
    setEditModalOpen(true);
  };

  const confirmEdit = async () => {
    if (!editContent.trim()) {
      toast.error("El contenido no puede estar vacío.");
      return;
    }

    const updated = await handleUpdatePublication(editId, {
      content: editContent,
    });
    if (updated) {
      setEditModalOpen(false);
      getPublications();
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const deleted = await handleDeletePublication(deleteId);
    if (deleted) {
      setConfirmDeleteModalOpen(false);
      getPublications();
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding bg-gradient-to-br from-indigo-500 to-purple-600 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto py-12">
          {(userRole === "ADMIN_ROLE" || userRole === "USER_ROLE") && (
            <div className="lg:w-1/2 bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
                Crea una Publicación
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <IonLabel className="block mb-2 text-lg font-semibold text-gray-700">
                    Título
                  </IonLabel>
                  <IonInput
                    value={title}
                    onIonChange={(e) => setTitle(e.detail.value)}
                    placeholder="Escribe el título de tu publicación"
                    className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                    fill="outline"
                  />
                </div>

                <div>
                  <IonLabel className="block mb-2 text-lg font-semibold text-gray-700">
                    Contenido
                  </IonLabel>
                  <IonTextarea
                    value={content}
                    onIonChange={(e) => setContent(e.detail.value)}
                    placeholder="Escribe el contenido de tu publicación aquí..."
                    rows={8}
                    className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                    fill="outline"
                  />
                </div>

                <IonButton
                  type="submit"
                  expand="block"
                  color="primary"
                  className="rounded-xl text-lg font-bold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Publicando..." : "Publicar Ahora"}
                </IonButton>
              </form>
            </div>
          )}

          <div
            className={
              userRole === "ADMIN_ROLE"
                ? "lg:w-1/2 space-y-8"
                : "lg:w-full space-y-8"
            }
          >
            <h3 className="text-3xl font-bold text-center text-black drop-shadow-lg">
              Publicaciones
            </h3>

            {publications.length === 0 ? (
              <p className="text-center text-white text-xl">
                No hay publicaciones disponibles.
              </p>
            ) : (
              publications.map((pub) => (
                <IonCard
                  key={pub._id}
                  className="rounded-2xl shadow-xl overflow-hidden"
                >
                  <IonCardHeader className="bg-indigo-100 rounded-t-2xl px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <IonCardTitle className="text-2xl font-bold text-indigo-800 mb-2 sm:mb-0">
                      {pub.title}
                    </IonCardTitle>

                    {/* Mostrar editar/eliminar si es admin o si es el autor */}
                    {(userRole === "ADMIN_ROLE" || (userRole === "USER_ROLE" && author === pub.author)) && (
                      <div className="flex gap-4">
                        <IonButton
                          size="small"
                          color="warning"
                          onClick={() => handleEdit(pub._id, pub.content)}
                          className="rounded-lg shadow"
                        >
                          <IonIcon
                            icon={pencilOutline}
                            slot="icon-only"
                            className="text-lg"
                          />
                        </IonButton>
                        <IonButton
                          size="small"
                          color="danger"
                          onClick={() => handleDeleteClick(pub._id)}
                          className="rounded-lg shadow"
                        >
                          <IonIcon
                            icon={trashOutline}
                            slot="icon-only"
                            className="text-lg"
                          />
                        </IonButton>
                      </div>
                    )}

                    {/* Botón de comentar sigue igual */}
                    {(userRole === "ADMIN_ROLE" || userRole === "USER_ROLE") && (
                      <div className="flex gap-4">
                        <IonButton
                          size="small"
                          color="tertiary"
                          onClick={() => setShowCommentForm(pub._id)}
                          className="rounded-lg shadow"
                        >
                          <IonIcon
                            icon={chatbubbleOutline}
                            slot="icon-only"
                            className="text-lg"
                          />
                        </IonButton>

                        {showCommentForm === pub._id && (
                          <>
                            <ComentForm
                              publicationId={pub._id}
                              isOpen={true}
                              onClose={() => setShowCommentForm(false)}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </IonCardHeader>
                  <IonCardContent className="text-gray-800 px-6 py-5 text-lg leading-relaxed">
                    {pub.content}
                  </IonCardContent>
                  <div className="px-6 pb-4">
                    <CommentList publicationId={pub._id} />
                  </div>
                </IonCard>
              ))
            )}
          </div>
        </div>

        <IonModal
          isOpen={editModalOpen}
          onDidDismiss={() => setEditModalOpen(false)}
        >
          <div className="p-8 bg-white rounded-xl shadow-2xl m-4 md:m-auto max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
              Editar Publicación
            </h2>
            <IonLabel className="block mb-3 text-lg font-medium text-gray-700">
              Nuevo Contenido
            </IonLabel>
            <IonTextarea
              value={editContent}
              onIonChange={(e) => setEditContent(e.detail.value)}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
              rows={8}
              placeholder="Edita el contenido de tu publicación"
              fill="outline"
            />

            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
              <IonButton
                color="medium"
                onClick={() => setEditModalOpen(false)}
                className="rounded-lg text-lg font-semibold"
                expand="block"
              >
                <IonIcon icon={closeOutline} slot="start" />
                Cancelar
              </IonButton>
              <IonButton
                color="success"
                onClick={confirmEdit}
                className="rounded-lg text-lg font-semibold"
                expand="block"
              >
                <IonIcon icon={checkmarkOutline} slot="start" />
                Guardar Cambios
              </IonButton>
            </div>
          </div>
        </IonModal>

        <IonModal
          isOpen={confirmDeleteModalOpen}
          onDidDismiss={() => setConfirmDeleteModalOpen(false)}
        >
          <div className="p-8 bg-white rounded-xl shadow-2xl m-4 md:m-auto max-w-sm text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Confirmar Eliminación
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              ¿Estás seguro de que deseas eliminar esta publicación? Esta acción
              no se puede deshacer.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <IonButton
                color="medium"
                onClick={() => setConfirmDeleteModalOpen(false)}
                className="rounded-lg text-lg font-semibold"
                expand="block"
              >
                <IonIcon icon={closeOutline} slot="start" />
                Cancelar
              </IonButton>
              <IonButton
                color="danger"
                onClick={confirmDelete}
                className="rounded-lg text-lg font-semibold"
                expand="block"
              >
                <IonIcon icon={trashOutline} slot="start" />
                Eliminar
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default PublicationForm;