import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  IonIcon,
  IonButtons,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import { create, trash, reorderFourOutline, } from 'ionicons/icons';
import { FormTaskModal } from '../../components/Tasks/FormModalTask';
import { CameraModal } from '../../components/Tasks/TakePhotoTask';
import { useGetTask } from '../../shared/hooks/tasks/useGetTask';
import { useDeleteTask } from '../../shared/hooks/tasks/useDeleteTask';
import { TaskDetailsModal } from '../../components/Tasks/ModalDetailsTask';

export const TaskPage = () => {
  const { getTasks, tasks } = useGetTask();
  const { deleteTask } = useDeleteTask();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); 
  const [selectedTask, setSelectedTask] = useState(null); 
  const [isOpen, setIsOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const handleTaskCreate = async () => {
    await getTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    await getTasks();
  };

  const toggleTaskCompletion = (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    if (task && task.taskStatus !== 'Completed') {
      setSelectedTask(task);
      setIsCameraOpen(true);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
    setSelectedTaskId(selectedTaskId);
    setIsCameraOpen(true);
  };

  return (
    <div className="p-6 animate-fade-in" style={{ backgroundColor: 'var(--ion-color-light)', minHeight: '100vh' }}>
      <h1
        className="text-4xl font-bold text-center mb-6"
        style={{ color: 'var(--ion-color-primary)' }}
      >
        Mis Tareas
      </h1>

      {/* Botón Crear Tarea */}
      <IonButton
        onClick={() => {
          setTaskToEdit(null);
          setIsFormModalOpen(true);
        }}
        expand="block"
        style={{
          background: 'linear-gradient(90deg, var(--ion-color-primary), var(--ion-color-dark))',
          color: 'var(--ion-color-light)',
          fontWeight: '600',
          borderRadius: '12px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}
      >
        <IonIcon slot="start" icon={create} />
        Crear nueva tarea
      </IonButton>

      {/* Lista de Tareas */}
      <IonList
        style={{
          background: 'var(--ion-color-white)',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          marginTop: '20px'
        }}
      >
        {!isDisabled && (
          <div
            style={{
              backgroundColor: 'var(--ion-color-light)',
              color: 'var(--ion-color-primary)',
              fontWeight: '500',
              padding: '8px 16px',
              fontSize: '14px'
            }}
          >
            Arrastra para reordenar.
          </div>
        )}

        <IonReorderGroup disabled={isDisabled}>
          {tasks.length === 0 ? (
            <IonItem style={{ background: 'var(--ion-color-light)' }}>
              <IonLabel style={{ color: 'var(--ion-color-dark)', textAlign: 'center' }}>
                No hay tareas. ¡Crea una!
              </IonLabel>
            </IonItem>
          ) : (
            tasks.map((task) => (
              <IonItem
                key={task._id}
                onClick={() => handleTaskClick(task)} // Agregado: para abrir el modal de detalles
                style={{
                  background: 'var(--ion-color-white)',
                  transition: 'transform 0.2s ease',
                  opacity: task.taskStatus === 'Completed' ? '0.6' : '1',
                  cursor: 'pointer' // Para indicar que es clicable
                }}
                className="hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 flex-grow">
                  <input
                    type="checkbox"
                    checked={task.taskStatus === 'Completed'}
                    onChange={(e) => {
                      e.stopPropagation(); // Evita que el clic en el checkbox active el clic del item
                      toggleTaskCompletion(task._id);
                    }}
                    style={{
                      accentColor: 'var(--ion-color-primary)',
                      height: '20px',
                      width: '20px'
                    }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <IonLabel
                      style={{
                        color: task.taskStatus === 'Completed' ? 'var(--ion-color-medium)' : 'var(--ion-color-dark)',
                        textDecoration: task.taskStatus === 'Completed' ? 'line-through' : 'none',
                        fontWeight: 'bold',
                        fontSize: '1.2em'
                      }}
                    >
                      {task.taskName}
                    </IonLabel>
                    <p
                      style={{
                        color: task.taskStatus === 'Completed' ? 'var(--ion-color-medium)' : 'var(--ion-color-dark)',
                        textDecoration: task.taskStatus === 'Completed' ? 'line-through' : 'none',
                        fontSize: '0.9em',
                        marginTop: '4px'
                      }}
                    >
                      {task.taskDescription}
                    </p>
                    <p style={{ fontSize: '0.8em', color: 'var(--ion-color-medium)' }}>
                      Vence: {task.dueDate} | Prioridad: {task.priority}
                    </p>
                  </div>
                </div>

                <IonButtons slot="end" className="flex items-center gap-2">
                  <IonButton
                    fill="clear"
                    style={{ color: 'red' }}
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que el clic del botón abra el modal de detalles
                      setSelectedTask(task);
                      setShowAlert(true);
                    }}
                  >
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonButton>

                  <IonButton
                    fill="clear"
                    style={{ color: 'var(--ion-color-primary)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaskToEdit(task);
                      setIsFormModalOpen(true);
                    }}
                  >
                    Editar
                  </IonButton>

                  {!isDisabled && (
                    <IonReorder slot="end">
                      <IonIcon icon={reorderFourOutline} style={{ color: 'var(--ion-color-accent)' }} />
                    </IonReorder>
                  )}
                </IonButtons>
              </IonItem>
            ))
          )}
        </IonReorderGroup>
      </IonList>

      {/* Alert */}
      <IonAlert
        isOpen={showAlert}
        header="¿Desea eliminar esta tarea?"
        message="Esta acción no se puede deshacer."
        cssClass="custom-alert"
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'alert-button-cancel',
          },
          {
            text: 'Confirmar',
            role: 'confirm',
            cssClass: 'alert-button-confirm',
            handler: () => handleDeleteTask(selectedTask._id),
          },
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />

      {/* Modales */}
      <FormTaskModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setTaskToEdit(null); 
        }}
        onTaskCreated={handleTaskCreate}
        taskToEdit={taskToEdit}
      />
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        taskId={selectedTask?._id}
        onTaskCreated={handleTaskCreate}
      />
      <TaskDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};
