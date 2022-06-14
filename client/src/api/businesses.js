import { API_URL } from "./apiConfig"

export const getBusinesses = async () => {
    try {
        const response = await fetch(`${API_URL}/get-businesses`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            method: "GET",
        })
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export const getBusinessesByUid = async (uid) => {
    try {
        const response = await fetch(`${API_URL}/get-businesses-by-id`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({ uid }),
            method: "POST",
        })
        return response.json();
    } catch (error) {
        console.log(error);
    }
}