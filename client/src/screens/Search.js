import "../styles/Search-style.css"
import { useEffect, useState } from "react"
import { getBusinesses } from "../api/businesses"
import { Business } from "../components/Business";
const Search = () => {

    const [businesses, setBusinesses] = useState([]);
    const [searchedBusinesses, setSearchedBusinesses] = useState([])
    useEffect(() => {
        loadBusinesses();
    }, [])

    const loadBusinesses = async () => {
        const res = await getBusinesses();
        console.log(res)
        setBusinesses(res);
        setSearchedBusinesses(res)
    }

    const search = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const credentials = Object.fromEntries(formData)
        setSearchedBusinesses(businesses.filter((business) => business.email.includes(credentials.searchText)));
        console.log(searchedBusinesses);
    }

    return (
        <div className="search-box-container">
            <form
                onSubmit={search}
                className="search-box" action=""
            >
                <input placeholder="Search and Book" type="text" name="searchText" />
                <button type="submit">Search</button>
            </form>

            {searchedBusinesses.map(business => (
                <Business key={business.uid} {...business} />
            ))}
        </div>

    );
}

export default Search;