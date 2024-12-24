import firestore from "@react-native-firebase/firestore";
import { User } from "~/types/user";

/**
 * Save user information to Firestore.
 * @param userId - User ID.
 * @param userData - User data.
 * @returns Promise<void>
 */
export const saveUserToFireStore = async (userId: string, userData: User): Promise<void> => {
    try {
        await firestore().collection("users").doc(userId).set(userData);
        console.log("User saved to Firestore successfully");
    } catch (error) {
        console.error("Error saving user to Firestore:", error);
        throw error;
    }
};
