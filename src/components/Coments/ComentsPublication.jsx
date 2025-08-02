import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useViewPublications } from "../../shared/hooks/publication/useViewPublications";
import { CommentList } from "./CommentList";

export const ComentsPublication = () => {
  const { publications, getPublications } = useViewPublications();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getPublications();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.id) setUserId(user.id);
      } catch (error) {
        console.error("Error al parsear el usuario desde localStorage:", error);
      }
    }
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="w-full min-h-screen py-12 px-4 bg-gray-100">
      <h2 className="text-4xl text-center font-extrabold mb-12 text-gray-800 tracking-tight">
        Comentario Editar y eliminar
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {publications.map((pub) => (
          <IonCard
            key={pub._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <IonCardHeader className="pt-6 px-6">
              <IonItem
                lines="none"
                className="--background:transparent p-0 flex items-center"
              >
                <IonLabel className="text-gray-800">
                  <h3 className="font-bold text-xl">{pub.username}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {formatDate(pub.createdAt)}
                  </p>
                </IonLabel>
              </IonItem>
            </IonCardHeader>

            <IonCardContent className="text-gray-700 leading-relaxed text-base pt-0 px-6 pb-4">
              <p>{pub.content}</p>
            </IonCardContent>

            <div className="pt-2 pb-4 px-6">
              <hr className="border-t border-gray-200 mb-4" />
              <CommentList publicationId={pub._id} userId={userId} />
            </div>
          </IonCard>
        ))}
      </div>
    </section>
  );
};