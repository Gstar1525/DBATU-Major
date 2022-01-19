const API_URL = "http://localhost:5000";

export const fetchData = async (routes) => {
    const res = await fetch(API_URL+routes)
    return res.json();
}