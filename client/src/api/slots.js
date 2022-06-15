import { API_URL } from "./apiConfig"
import { auth } from "./firebase-service";

export const createSlot = async (date, time, isAvailable) => {
    const token = await auth.currentUser.getIdToken()
    const response = await fetch(`${API_URL}/slots`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            date: `${date}`,
            time: `${time}`,
            isAvailable: `${isAvailable}`,
            uid: auth.currentUser.uid
        }),
        method: "POST",
    })
    return response.json();
}

export const readAllSlot = async (uid) => {
    // const token = await auth.currentUser.getIdToken()
    const response = await fetch(`${API_URL}/get-slots`, {
        headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            uid: uid
        }),
        method: "POST",
    })
    return response.json();
}

export const updateSlot = async (data) => {
    const token = await auth.currentUser.getIdToken()
    const response = await fetch(`${API_URL}/put-slot`, {
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
        method: "PUT",
    })
    return response.json();
}