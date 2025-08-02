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
    IonSpinner
} from "@ionic/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { mail, lockClosed, eye, eyeOff, person, personAdd } from "ionicons/icons";
import React ,{ useState } from "react";
import { useRegister } from "../../shared/hooks/auth/useRegister";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    name: yup
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .required("El nombre es requerido"),
    username: yup
        .string()
        .min(2, "El username debe tener al menos 2 caracteres")
        .required("El username es requerido"),
    email: yup
        .string()
        .email("Ingresa un correo válido")
        .required("El correo es requerido"),
    password: yup
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es requerida"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
        .required("Confirma tu contraseña"),
});

export const RegisterForm = () => {
    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    const  navigate = useNavigate();
    const { register, isLoading} = useRegister();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data) => {
        register(data)
        await new Promise(resolve => setTimeout(resolve, 1500));
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar className="bg-gradient-to-r from-green-500 to-emerald-600">
                    <IonTitle className="text-white font-bold">Smart Study</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent className="ion-padding bg-gradient-to-br from-green-50 to-emerald-100">
                <div className="flex items-center justify-center min-h-full py-8">
                    <div className="w-full max-w-md">
                        <IonCard className="shadow-2xl border-0 rounded-3xl overflow-hidden animate-fade-in">
                            <IonCardHeader className="text-center pb-4 bg-gradient-to-r from-green-500 to-emerald-600">
                                <div className="flex justify-center mb-4">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-bounce-slow">
                                        <IonIcon icon={personAdd} className="text-4xl text-white" />
                                    </div>
                                </div>
                                <IonCardTitle className="text-2xl font-bold text-white mb-2">
                                    Crear Cuenta
                                </IonCardTitle>
                                <p className="text-green-100 text-sm">
                                    Únete a Smart Study hoy
                                </p>
                            </IonCardHeader>
                            
                            <IonCardContent className="p-6">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Name Field */}
                                    <div className="space-y-2">
                                        <IonItem 
                                            className={`rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                                                errors.name 
                                                    ? 'border-red-300 bg-red-50' 
                                                    : 'border-gray-200 hover:border-green-300'
                                            }`}
                                            lines="none"
                                        >
                                            <IonIcon 
                                                icon={person} 
                                                slot="start" 
                                                className="text-gray-400 mr-2" 
                                            />
                                            <IonLabel position="floating" className="font-semibold text-gray-700">
                                                Nombre Completo
                                            </IonLabel>
                                            <Controller
                                                name="name"
                                                control={control}
                                                render={({ field }) => (
                                                    <IonInput
                                                        {...field}
                                                        type="text"
                                                        placeholder="Tu nombre completo"
                                                        className="transition-all duration-200"
                                                        onIonInput={(e) => field.onChange(e.detail.value)}
                                                        onIonBlur={field.onBlur}
                                                    />
                                                )}
                                            />
                                        </IonItem>
                                        {errors.name && (
                                            <IonText color="danger" className="animate-shake">
                                                <p className="text-sm flex items-center ml-2">
                                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                                    {errors.name.message}
                                                </p>
                                            </IonText>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <IonItem 
                                            className={`rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                                                errors.username 
                                                    ? 'border-red-300 bg-red-50' 
                                                    : 'border-gray-200 hover:border-green-300'
                                            }`}
                                            lines="none"
                                        >
                                            <IonIcon 
                                                icon={person} 
                                                slot="start" 
                                                className="text-gray-400 mr-2" 
                                            />
                                            <IonLabel position="floating" className="font-semibold text-gray-700">
                                                Nombre de Usuario
                                            </IonLabel>
                                            <Controller
                                                name="username"
                                                control={control}
                                                render={({ field }) => (
                                                    <IonInput
                                                        {...field}
                                                        type="text"
                                                        placeholder="Tu nombre completo"
                                                        className="transition-all duration-200"
                                                        onIonInput={(e) => field.onChange(e.detail.value)}
                                                        onIonBlur={field.onBlur}
                                                    />
                                                )}
                                            />
                                        </IonItem>
                                        {errors.username && (
                                            <IonText color="danger" className="animate-shake">
                                                <p className="text-sm flex items-center ml-2">
                                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                                    {errors.username.message}
                                                </p>
                                            </IonText>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <IonItem 
                                            className={`rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                                                errors.email 
                                                    ? 'border-red-300 bg-red-50' 
                                                    : 'border-gray-200 hover:border-green-300'
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
                                            className={`rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                                                errors.password 
                                                    ? 'border-red-300 bg-red-50' 
                                                    : 'border-gray-200 hover:border-green-300'
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

                                    {/* Confirm Password Field */}
                                    <div className="space-y-2">
                                        <IonItem 
                                            className={`rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                                                errors.confirmPassword 
                                                    ? 'border-red-300 bg-red-50' 
                                                    : 'border-gray-200 hover:border-green-300'
                                            }`}
                                            lines="none"
                                        >
                                            <IonIcon 
                                                icon={lockClosed} 
                                                slot="start" 
                                                className="text-gray-400 mr-2" 
                                            />
                                            <IonLabel position="floating" className="font-semibold text-gray-700">
                                                Confirmar Contraseña
                                            </IonLabel>
                                            <Controller
                                                name="confirmPassword"
                                                control={control}
                                                render={({ field }) => (
                                                    <IonInput
                                                        {...field}
                                                        type={showConfirmPassword ? "text" : "password"}
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
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <IonIcon 
                                                    icon={showConfirmPassword ? eyeOff : eye} 
                                                    className="text-lg"
                                                />
                                            </IonButton>
                                        </IonItem>
                                        {errors.confirmPassword && (
                                            <IonText color="danger" className="animate-shake">
                                                <p className="text-sm flex items-center ml-2">
                                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                                    {errors.confirmPassword.message}
                                                </p>
                                            </IonText>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <IonButton
                                        type="submit"
                                        expand="block"
                                        disabled={isSubmitting}
                                        className={`rounded-xl font-semibold transition-all duration-300 transform ${
                                            isSubmitting 
                                                ? 'opacity-70' 
                                                : 'hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                        }`}
                                        style={{
                                            '--background': 'linear-gradient(135deg, #10b981, #059669)',
                                            '--background-hover': 'linear-gradient(135deg, #059669, #047857)',
                                            '--color': 'white'
                                        }}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <IonSpinner name="crescent" className="mr-2" />
                                                Creando cuenta...
                                            </div>
                                        ) : (
                                            <>
                                                <IonIcon icon={personAdd} slot="start" />
                                                Crear Cuenta
                                            </>
                                        )}
                                    </IonButton>

                                    {/* Login Link */}
                                    <div className="text-center pt-4 border-t border-gray-200">
                                        <IonText className="text-gray-600">
                                            <p className="mb-3">¿Ya tienes cuenta?</p>
                                        </IonText>
                                        <IonButton
                                            fill="outline"
                                            expand="block"
                                            onClick={() => navigate("/login")}
                                            className="rounded-xl border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.02]"
                                        >
                                            Iniciar Sesión
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

export default RegisterForm;