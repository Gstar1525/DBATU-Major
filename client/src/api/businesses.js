import { API_URL } from "./apiConfig"

export const postBusiness = async (data) =>{
    try {
        const response = await fetch(`${API_URL}/post-business-data`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
            method: "POST",
        })
        return response.json();
    } catch (error) {
        console.log(error);
    }
}


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

export const getAllBookingData = async (uid, isCustomer) => {
    try {
        const response = await fetch(`${API_URL}/get-all-booking-data`, {
            headers: {
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

export const postBookingData = async (business, customer, data) => {
    try {
        const response = await fetch(`${API_URL}/post-booking-data`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({ business, customer, data }),
            method: "POST",
        })
        return response.json();
    } catch (error) {
        console.log(error);
    }
}