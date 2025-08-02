import { useState, useEffect } from "react";
import { useAddFlashcard } from "../../shared/hooks/flashcadrs/useAddFlashcard";
import { useGetCategory } from "../../shared/hooks/category/useGetCategory";
import { useViewFlashCard } from "../../shared/hooks/flashcadrs/useViewFlashCard";
import { useDelteFlashcard } from "../../shared/hooks/flashcadrs/useDelteFlashcard";
import { useUpdateFlashCard } from "../../shared/hooks/flashcadrs/useUpdateFlashCard";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonList,
  IonSpinner,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import { createOutline, trashOutline, pencilOutline } from "ionicons/icons";

export const FalshCardForms = () => {
  const { categories, getCategory } = useGetCategory();
  const { createFlashcard, loading: loadingCreate, error: errorCreate } = useAddFlashcard();
  const { flashcards, fetchFlashcards, loading: loadingFlashcards, error: errorFlashcards } = useViewFlashCard();
  const { deleteFlashcard, loadingDelete, errorDelete } = useDelteFlashcard();
  const { updateFlashCard, isLoading: loadingUpdate, errorUpdate } = useUpdateFlashCard();

  const [form, setForm] = useState({
    question: "",
    answer: "",
    difficulty: "Easy",
    nameSubject: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    getCategory();
    fetchFlashcards();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({ question: "", answer: "", difficulty: "Easy", nameSubject: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nameSubject) {
      setAlertMessage("Selecciona una categoría");
      setShowAlert(true);
      return;
    }
    if (!form.question.trim() || !form.answer.trim()) {
      setAlertMessage("Pregunta y respuesta son requeridas");
      setShowAlert(true);
      return;
    }

    if (editingId) {
      const res = await updateFlashCard(editingId, form);
      if (!res?.error) {
        setAlertMessage("Flashcard actualizada correctamente");
        setShowAlert(true);
        resetForm();
        fetchFlashcards();
      } else {
        setAlertMessage("Error al actualizar flashcard");
        setShowAlert(true);
      }
    } else {
      const res = await createFlashcard(form);
      if (!res.error) {
        setAlertMessage("Flashcard creada correctamente");
        setShowAlert(true);
        resetForm();
        fetchFlashcards();
      } else {
        setAlertMessage("Error al crear flashcard: " + (res.message || "Error desconocido"));
        setShowAlert(true);
      }
    }
  };

  const handleEdit = (card) => {
    setEditingId(card._id);
    setForm({
      question: card.question,
      answer: card.answer,
      difficulty: card.difficulty || "Easy",
      nameSubject: card.keeperCategorySubject?.nameSubject || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await deleteFlashcard(id);
    if (result.success) {
      setAlertMessage("Flashcard eliminada correctamente");
      setShowAlert(true);
      fetchFlashcards();
    } else {
      setAlertMessage("Error al eliminar: " + (result.message || "Error desconocido"));
      setShowAlert(true);
    }
  };

  return (
    <div
      className="ion-padding p-4 space-y-6"
      style={{ backgroundColor: "#DEEFE7", minHeight: "100vh" }}
    >
      <IonCard
        style={{
          backgroundColor: "#FFFFFF",
          borderLeft: "6px solid #159A9C",
        }}
        className="shadow-lg rounded-xl"
      >
        <IonCardHeader style={{ backgroundColor: "#B4BEC9" }} className="text-center rounded-t-xl">
          <IonCardTitle style={{ color: "#001F2D" }} className="text-2xl font-bold">
            {editingId ? "Editar Flashcard" : "Crear Flashcard"}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="ion-padding">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fondo gris para pregunta y respuesta */}
            <div style={{ background: "#F3F4F6", borderRadius: "0.75rem", padding: "1rem" }}>
              <IonItem style={{ backgroundColor: "transparent", borderColor: "#159A9C" }} fill="outline" className="rounded-lg">
                <IonLabel position="floating">Pregunta</IonLabel>
                <IonInput
                  type="text"
                  name="question"
                  value={form.question}
                  onIonChange={handleChange}
                  required
                />
              </IonItem>
              <IonItem style={{ backgroundColor: "transparent", borderColor: "#159A9C" }} fill="outline" className="rounded-lg mt-4">
                <IonLabel position="floating">Respuesta</IonLabel>
                <IonTextarea
                  name="answer"
                  value={form.answer}
                  onIonChange={handleChange}
                  autoGrow
                  required
                />
              </IonItem>
            </div>
            <IonItem style={{ backgroundColor: "#FFFFFF", borderColor: "#159A9C" }} fill="outline" className="rounded-lg">
              <IonLabel>Dificultad</IonLabel>
              <IonSelect
                name="difficulty"
                value={form.difficulty}
                onIonChange={handleChange}
              >
                <IonSelectOption value="Easy">Fácil</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem style={{ backgroundColor: "#FFFFFF", borderColor: "#159A9C" }} fill="outline" className="rounded-lg">
              <IonLabel>Categoría</IonLabel>
              <IonSelect
                name="nameSubject"
                value={form.nameSubject}
                onIonChange={handleChange}
                required
              >
                {Array.isArray(categories) &&
                  categories.map((cat) => (
                    <IonSelectOption key={cat._id} value={cat.nameSubject}>
                      {cat.nameSubject}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>

            <IonButton
              type="submit"
              expand="block"
              className="mt-4 ion-no-margin rounded-lg"
              style={{ backgroundColor: "#159A9C", color: "#FFFFFF" }}
              disabled={loadingCreate || loadingUpdate}
            >
              <IonIcon slot="start" icon={createOutline} />
              {loadingCreate || loadingUpdate ? (
                <IonSpinner name="crescent" />
              ) : editingId ? (
                "Actualizar Flashcard"
              ) : (
                "Crear Flashcard"
              )}
            </IonButton>

            {editingId && (
              <IonButton
                onClick={resetForm}
                color="medium"
                expand="block"
                fill="outline"
                className="mt-2 rounded-lg"
              >
                Cancelar Edición
              </IonButton>
            )}
          </form>
        </IonCardContent>
      </IonCard>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center" style={{ color: "#001F2D" }}>
          Mis Flashcards
        </h3>
        <div className="flex flex-col space-y-4 mt-4">
          {loadingFlashcards && (
            <div className="text-center py-8">
              <IonSpinner name="crescent" style={{ color: "#159A9C" }} />
            </div>
          )}
          {flashcards.length === 0 && !loadingFlashcards && (
            <p className="text-center" style={{ color: "#6B7280" }}>
              No se encontraron flashcards.
            </p>
          )}

          {flashcards.map((card) => (
            <IonCard
              key={card._id}
              className="shadow-md rounded-xl"
              style={{ backgroundColor: "#FFFFFF", borderLeft: "4px solid #159A9C" }}
            >
              <IonCardHeader>
                <IonCardSubtitle style={{ color: "#159A9C" }} className="font-medium">
                  {card.keeperCategorySubject?.nameSubject || "Sin categoría"}
                </IonCardSubtitle>
                <IonCardTitle style={{ color: "#001F2D" }} className="text-xl">
                  {card.question}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p style={{ color: "#4B5563" }}>
                  <strong>Respuesta:</strong> {card.answer}
                </p>
                <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
                  Dificultad: {card.difficulty || "Fácil"}
                </p>
                <div className="flex justify-end space-x-2 mt-4">
                  <IonButton
                    onClick={() => handleEdit(card)}
                    color="warning"
                    size="small"
                    className="rounded-lg"
                  >
                    <IonIcon slot="icon-only" icon={pencilOutline} />
                  </IonButton>
                  <IonButton
                    onClick={() => handleDelete(card._id)}
                    color="danger"
                    size="small"
                    disabled={loadingDelete}
                    className="rounded-lg"
                  >
                    <IonIcon slot="icon-only" icon={trashOutline} />
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </div>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Notificación"}
        message={alertMessage}
        buttons={["OK"]}
      />
    </div>
  );
};