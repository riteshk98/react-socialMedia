import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../assets/codeial.png';
import { UseAuth } from '../hooks';
import { useEffect, useState } from 'react';
import searchIcon from '../assets/search.png';
import profileIcon from '../assets/user.png';
import { searchUsers } from '../api';

const Navbar = () => {
  const auth = UseAuth();
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);
      if (response.success) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) fetchUsers();
  }, [searchText]);

  return (
    <div>
      <div className={styles.nav}>
        <div className={styles.leftDiv}>
          <Link to="/">
            <img
              className={styles.logo}
              alt=""
              src={logo}
              width="100%"
              height="100%"
            />
          </Link>
        </div>
        <div className={styles.searchContainer}>
          <img src={searchIcon} alt="search" />
          <input
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {results.length > 0 && (
            <div className={styles.searchResults}>
              <ul>
                {results.map((user) => {
                  return (
                    <li
                      className={styles.searchResultsRow}
                      key={`user-${user._id}`}
                    >
                      <Link to={`user/${user._id}`} onClick={()=>setResults([])}>
                        <img src={profileIcon} alt="user" />
                        <span>{user.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.rightNav}>
          {auth.user && (
            <div className={styles.user}>
              <Link to="/settings">
                <img
                  alt=""
                  className={styles.userDp}
                  src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png"
                  width="100%"
                  height="100%"
                />
              </Link>
              <span>{auth.user.name}</span>
            </div>
          )}
          <div className={styles.navLinks}>
            <ul>
              {auth.user ? (
                <>
                  <li>
                    <button onClick={auth.logout}>Log Out</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Log In</Link>
                  </li>

                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
