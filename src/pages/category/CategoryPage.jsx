import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonSpinner,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useGetCategory } from "../../shared/hooks/category/useGetCategory";
import { CategoryForms } from "../../components/Categorys/CategoryForms";
import { useEffect, useState } from "react";
import { useAsing } from "../../shared/hooks/category/useAsing";
import { create } from "ionicons/icons";

export const CategoryPage = () => {
  const { categories, getCategory } = useGetCategory();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { handleAssignMe, loading: loadingAssign } = useAsing();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      await getCategory();
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const getAssignedCategoryIds = () => {
    return (Array.isArray(categories) ? categories : [])
      .filter((category) => category.isAssigned)
      .map((category) => category._id);
  };

  const handleAssignClick = async (id) => {
    const assignedCategoryIds = getAssignedCategoryIds();
    const success = await handleAssignMe(id, assignedCategoryIds);
    if (success) {
      await getCategory();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <IonSpinner name="crescent" />
        <p className="ml-3 text-lg">Cargando categorías...</p>
      </div>
    );
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">
        Categorias
      </h1>
      <IonAccordionGroup expand="inset">
        {(Array.isArray(categories) ? categories : []).map((category, index) => (
          <IonAccordion key={index} value={`accordion-${index}`}>
            <IonItem slot="header" color="light">
              <IonLabel>{category.nameSubject}</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              {category.descriptionSubject}
              <div className="mt-4">
                <IonButton
                  disabled={loadingAssign}
                  onClick={() => handleAssignClick(category._id)}
                  color="primary"
                  size="small"
                >
                  {loadingAssign ? "Asignando..." : "Asignarme"}
                </IonButton>
              </div>
            </div>
          </IonAccordion>
        ))}
      </IonAccordionGroup>

      <IonButton
        onClick={() => setIsOpen(true)}
        expand="block"
        className="mb-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow-xl transition-transform transform hover:scale-105"
      >
        <IonIcon slot="start" icon={create} />
        Solicitar Categoria
      </IonButton>

      {isOpen && <CategoryForms closeModal={closeModal} />}
    </div>
  );
};