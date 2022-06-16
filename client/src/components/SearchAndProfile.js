import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

const SearchAndProfile = ({ isCustomer, setIsCustomer }) => {
  return (
    <div className="search-profile-container">
      <div className="search-profile">
        <Link to="/search"><button>
          Search
        </button></Link>
        <ProfileMenu isCustomer={isCustomer} setIsCustomer={setIsCustomer} />
      </div>
    </div>
  )
}

export default SearchAndProfile;
