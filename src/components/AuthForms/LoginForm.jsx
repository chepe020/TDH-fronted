import React from 'react'; 
import { useForm, Controller } from "react-hook-form";
import {
    IonInput,
    IonText,
    IonItem,
    IonLabel,
    IonButton,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonSpinner,
    IonToast
} from "@ionic/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { mail, lockClosed, eye, eyeOff, logIn, person } from "ionicons/icons";
import { useState } from "react";
import { useLogin } from "../../shared/hooks/auth/useLogin";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Ingresa un correo válido")
        .required("El correo es requerido"),
    password: yup
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es requerida"),
});

export const LoginForm = () => {
    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });
    const  navigate = useNavigate();
    const { login, isLoading } = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const [showtToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');


    const onSubmit = async (data) => {
        try {
            login(data.email, data.password)
            await new Promise(resolve => setTimeout(resolve, 1500));
        } catch (err) {
            setToastMessage(err.message);
            setShowToast(true)
        }
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar className="bg-gradient-to-r from-blue-500 to-indigo-600">
                    <IonTitle className="text-white font-bold">Smart Study</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="flex items-center justify-center min-h-full py-8">
                    <div className="w-full max-w-md">
                        <IonCard className="shadow-2xl border-0 rounded-3xl overflow-hidden animate-fade-in">
                            <IonCardHeader className="text-center pb-4 bg-gradient-to-r from-blue-500 to-indigo-600">
                                <div className="flex justify-center mb-4">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-bounce-slow">
                                        <IonIcon icon={logIn} className="text-4xl text-white" />
                                    </div>
                                </div>
                                <IonCardTitle className="text-2xl font-bold text-white mb-2">
                                    Bienvenido
                                </IonCardTitle>
                                <p className="text-blue-100 text-sm">
                                    Inicia sesión en tu cuenta
                                </p>
                            </IonCardHeader>

                            <IonCardContent className="p-6">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <IonItem
                                            className={`rounded-xl border-2 transition-all duration-300 hover:shadow-md ${errors.email
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                            lines="none"
                                        >
                                            <IonIcon
                                                icon={mail}
                                                slot="start"
                                                className="text-gray-400 mr-2"
                                            />
                                            <IonLabel position="floating" className="font-semibold text-gray-700">
                                                Correo Electrónico
                                            </IonLabel>
                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({ field }) => (
                                                    <IonInput
                                                        {...field}
                                                        type="email"
                                                        placeholder="tu@ejemplo.com"
                                                        className="transition-all duration-200"
                                                        onIonInput={(e) => field.onChange(e.detail.value)}
                                                        onIonBlur={field.onBlur}
                                                    />
                                                )}
                                            />
                                        </IonItem>
                                        {errors.email && (
                                            <IonText color="danger" className="animate-shake">
                                                <p className="text-sm flex items-center ml-2">
                                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                                    {errors.email.message}
                                                </p>
                                            </IonText>
                                        )}
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2">
                                        <IonItem
                                            className={`rounded-xl border-2 transition-all duration-300 hover:shadow-md ${errors.password
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                            lines="none"
                                        >
                                            <IonIcon
                                                icon={lockClosed}
                                                slot="start"
                                                className="text-gray-400 mr-2"
                                            />
                                            <IonLabel position="floating" className="font-semibold text-gray-700">
                                                Contraseña
                                            </IonLabel>
                                            <Controller
                                                name="password"
                                                control={control}
                                                render={({ field }) => (
                                                    <IonInput
                                                        {...field}
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        className="transition-all duration-200"
                                                        onIonInput={(e) => field.onChange(e.detail.value)}
                                                        onIonBlur={field.onBlur}
                                                    />
                                                )}
                                            />
                                            <IonButton
                                                fill="clear"
                                                slot="end"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <IonIcon
                                                    icon={showPassword ? eyeOff : eye}
                                                    className="text-lg"
                                                />
                                            </IonButton>
                                        </IonItem>
                                        {errors.password && (
                                            <IonText color="danger" className="animate-shake">
                                                <p className="text-sm flex items-center ml-2">
                                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                                    {errors.password.message}
                                                </p>
                                            </IonText>
                                        )}
                                    </div>

                                    {/* Forgot Password */}
                                    <div className="text-right">
                                        <IonButton
                                            fill="clear"
                                            size="small"
                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </IonButton>
                                    </div>

                                    {/* Submit Button */}
                                    <IonButton
                                        type="submit"
                                        expand="block"
                                        disabled={isSubmitting}
                                        className={`rounded-xl font-semibold transition-all duration-300 transform ${isSubmitting
                                                ? 'opacity-70'
                                                : 'hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                            }`}
                                        style={{
                                            '--background': 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                            '--background-hover': 'linear-gradient(135deg, #2563eb, #4f46e5)',
                                            '--color': 'white'
                                        }}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <IonSpinner name="crescent" className="mr-2" />
                                                Iniciando sesión...
                                            </div>
                                        ) : (
                                            <>
                                                <IonIcon icon={logIn} slot="start" />
                                                Iniciar Sesión
                                            </>
                                        )}
                                    </IonButton>

                                    {/* Register Link */}
                                    <div className="text-center pt-4 border-t border-gray-200">
                                        <IonText className="text-gray-600">
                                            <p className="mb-3">¿No tienes cuenta?</p>
                                        </IonText>
                                        <IonButton
                                            fill="outline"
                                            expand="block"
                                            onClick={() => navigate("/register")}
                                            className="rounded-xl border-2 border-green-500 text-green-600 hover:bg-green-50 transition-all duration-300 transform hover:scale-[1.02]"
                                        >
                                            <IonIcon icon={person} slot="start" />
                                            Crear Cuenta
                                        </IonButton>
                                    </div>
                                </form>
                            </IonCardContent>
                        </IonCard>

                        {/* Footer */}
                        <div className="text-center mt-6 animate-fade-in-delayed">
                            <IonText className="text-gray-500">
                                <p className="text-sm">
                                    © 2025 Smart Study. Todos los derechos reservados.
                                </p>
                            </IonText>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LoginForm;