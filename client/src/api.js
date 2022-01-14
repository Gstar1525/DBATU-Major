const API_URL = "http://localhost:5000/";

export const fetchData = async () => {
    const res = await fetch(API_URL)
    return res.json();
}