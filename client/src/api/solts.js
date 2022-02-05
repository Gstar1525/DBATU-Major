import { API_URL } from "./apiConfig"
import { auth } from "./firebase-service";

export const getSlots = async () => {
    const token = await auth.currentUser.getIdToken()
    const response = await fetch(`${API_URL}/getslots`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Gourav Kolhatkar",
            Year: "final"
        }),
        method: "POST",
    })
    return response.json();
} 