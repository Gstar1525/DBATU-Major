import { API_URL } from "./apiConfig"
import { auth } from "./firebase-service";

export const createUser = async (uid, isCustomer) => {

    try {
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
    } catch (error) {
        console.log(error);
    }
}

export const updateUserRole = async (isCustomer, uid) => {
    const token = await auth.currentUser.getIdToken()
    const response = await fetch(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "uid": uid, isCustomer }),
        method: "PUT",
    })
    return response.json();
}

export const readUserRole = async (uid) => {
    if (auth.currentUser) {
        try {
            const token = await auth.currentUser.getIdToken()
            const response = await fetch(`${API_URL}/get-role`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ "uid": uid }),
                method: "POST",
            })
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }
    return undefined
}

export const getUserData = async (uid) => {
    try {
        // const token = await auth.currentUser.getIdToken()
        const response = await fetch(`${API_URL}/get-user-data`, {
            headers: {
                // Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({ uid }),
            method: "POST",
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}
