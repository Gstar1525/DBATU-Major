import { API_URL } from "./apiConfig"
import { auth } from "./firebase-service";

export const createUser = async (uid, isCustomer) => {
    const token = await auth.currentUser.getIdToken()
    const response = await fetch(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ uid, isCustomer }),
        method: "POST",
    })
    return response.json();
}

export const updateUserRole = async (isCustomer) => {
    const token = await auth.currentUser.getIdToken()
    const response = await fetch(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "uid": auth.currentUser.uid, isCustomer }),
        method: "PUT",
    })
    return response.json();
}

export const readUserRole = async () => {
    if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken()
        const response = await fetch(`${API_URL}/get-role`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({ "uid": auth.currentUser.uid }),
            method: "POST",
        })
        return response.json();
    }
    return undefined
}