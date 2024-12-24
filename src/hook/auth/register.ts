import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { saveUserToFireStore } from "~/services";
import { ApiResponse } from "~/types/api-response";
import { User } from "~/types/user";

export interface RegisterSuccessData {
    message: string;
    user: {
        email: string;
    };
}

export interface RegisterErrorData {
    error: string;
}

interface FirebaseAuthError {
    code: string;
    message: string;
}

interface UseRegisterReturn {
    handleRegister: (
        email: string,
        password: string,
        name: string
    ) => Promise<ApiResponse<RegisterSuccessData | RegisterErrorData>>;
    isLoading: boolean;
    error: string | null;
}

export const useRegister = (): UseRegisterReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (
        email: string,
        password: string,
        name: string
    ): Promise<ApiResponse<RegisterSuccessData | RegisterErrorData>> => {
        setIsLoading(true);
        setError(null);

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid;

            const role = email === "admin@gmail.com" ? "admin" : "keeper";

            const userData: User = {
                id: userId,
                name,
                email,
                role
            };

            await saveUserToFireStore(userId, userData);

            return {
                statusCode: 200,
                statusText: "OK",
                data: { message: "Registration successful!", user: { email } }
            };
        } catch (err) {
            console.error("Error during registration:", err);

            const firebaseError = err as FirebaseAuthError;

            let errorMessage = "An unexpected error occurred. Please try again.";

            switch (firebaseError.code) {
                case "auth/email-already-in-use":
                    errorMessage = "Email is already in use";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Invalid email format";
                    break;
                case "auth/weak-password":
                    errorMessage = "Password is too weak";
                    break;
                default:
                    errorMessage = "Registration failed. Please try again.";
                    break;
            }

            return {
                statusCode: 400,
                statusText: "Bad Request",
                data: { error: errorMessage }
            };
        } finally {
            setIsLoading(false);
        }
    };

    return { handleRegister, isLoading, error };
};
