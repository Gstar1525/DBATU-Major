import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

const SearchAndProfile = ({ setLoading, isCustomer, setIsCustomer }) => {
  return (
    <div className="search-profile-container">
      <div className="search-profile">
        <Link to="/search"><button>
          Search
        </button></Link>
        <ProfileMenu setLoading={setLoading} isCustomer={isCustomer} setIsCustomer={setIsCustomer} />
      </div>
    </div>
  )
}

export default SearchAndProfile;
