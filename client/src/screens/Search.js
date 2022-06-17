import "../styles/Search-style.css"
import { useEffect, useState } from "react"
import { getBusinesses } from "../api/businesses"
import LoadingOverlay from 'react-loading-overlay';
import { Business } from "../components/Business";
const Search = () => {

    const [businesses, setBusinesses] = useState([]);
    const [searchedBusinesses, setSearchedBusinesses] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadBusinesses();
    }, [])

    const loadBusinesses = async () => {
        setLoading(true)
        const res = await getBusinesses();
        console.log(res)
        setBusinesses(res);
        setSearchedBusinesses(res)
        setLoading(false)
    }

    const search = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const credentials = Object.fromEntries(formData)
        setSearchedBusinesses(businesses.filter((business) => business.email.includes(credentials.searchText)));
        console.log(searchedBusinesses);
    }

    return (
        <LoadingOverlay
            active={loading}
            spinner={true}
            text='Loading...'
            className="loadingContain"
        >
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
        </LoadingOverlay>
    );
}

export default Search;