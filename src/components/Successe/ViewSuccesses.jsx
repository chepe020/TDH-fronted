import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonText,
  IonIcon,
} from "@ionic/react";
import { trophyOutline, rocketOutline } from "ionicons/icons";
import { useViewSuccesses } from "../../shared/hooks/successes/useViewSuccesses";

export const ViewSuccesses = () => {
  const { successes, loading, error } = useViewSuccesses();

  return (
    <IonPage className="bg-gray-100">


      <IonContent fullscreen className="ion-padding">
        <div className="flex flex-col items-center justify-center pt-8">
          <IonIcon
            icon={trophyOutline}
            className="text-6xl text-yellow-400 mb-4 animate-bounce"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Página de Logros
          </h1>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-full">
            <IonSpinner name="crescent" color="primary" />
            <p className="ml-3 text-lg text-gray-600">Cargando logros...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-full text-red-500 font-medium">
            <p>{error}</p>
          </div>
        )}

        {!loading && successes.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <IonIcon icon={rocketOutline} className="text-5xl mb-4" />
            <p className="text-xl">Aún no tienes logros disponibles.</p>
          </div>
        )}

        {!loading && successes.length > 0 && (
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              {successes.map((success) => (
                <IonCol
                  size="12"
                  size-md="6"
                  size-lg="4"
                  key={success._id}
                  className="mb-4"
                >
                  <IonCard className="h-full transform transition duration-300 hover:scale-105 shadow-lg rounded-xl overflow-hidden">
                    <IonCardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
                      <IonCardTitle className="font-bold text-lg">
                        {success.nameSuccess}
                      </IonCardTitle>
                      <IonCardSubtitle className="text-sm opacity-90 mt-1">
                        Puntos: {success.points}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className="p-4 bg-white">
                      <p className="text-gray-700">{success.descriptionSuccess}</p>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <IonIcon icon={rocketOutline} className="mr-1" />
                          <IonText>Tareas requeridas: {success.amountTasks}</IonText>
                        </div>
                        <IonText>
                          Estado:{" "}
                          <span className="font-semibold text-green-500">
                            Activo
                          </span>
                        </IonText>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};