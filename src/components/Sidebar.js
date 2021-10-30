/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SocialIcons from './UI/SocialIcons';
import { logout } from '../actions/auth';
import classes from '../styles/Sidebar.module.css';

const Sidebar = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    const navMenu = document.querySelector('nav');
    navMenu.classList.toggle(classes.toggle);
  };

  return (
    <div>
      <button type="button" className={classes.hamburger} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </button>
      <nav className={`${classes.sidenav} ${classes.toggle}`}>
        {currentUser && currentUser.user.type === 'admin'
          ? <h5>Admin Dashboard</h5>
          : currentUser && <h5>User Dashboard</h5>}
        <NavLink exact to="/">
          <h5>CoviBuddy</h5>
        </NavLink>
        {currentUser
            && (
              <NavLink to="/profile" className={classes.navlink} activeClassName={classes.active}>
                {currentUser.user.name}
              </NavLink>
            )}
        {currentUser && currentUser.user.type === 'admin'
            && (
              <ul>
                <li>
                  <NavLink to="/hospitals" className={classes.navlink} activeClassName={classes.active}>
                    Hospitals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/suppliers" className={classes.navlink} activeClassName={classes.active}>
                    Suppliers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/volunteers" className={classes.navlink} activeClassName={classes.active}>
                    Volunteers
                  </NavLink>
                </li>
                <li>
                  <a href="/login" onClick={logOut} className={classes.navlink}>
                    Logout
                  </a>
                </li>
              </ul>
            )}
        {currentUser ? (
          currentUser.user.type === 'user' && (
            <ul>
              <li>
                <NavLink to="/hospitals" className={classes.navlink} activeClassName={classes.active}>
                  Hospitals
                </NavLink>
              </li>
              <li>
                <NavLink to="/suppliers" className={classes.navlink} activeClassName={classes.active}>
                  Suppliers
                </NavLink>
              </li>
              <li>
                <NavLink to="/volunteers" className={classes.navlink} activeClassName={classes.active}>
                  Volunteers
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/bookings" className={classes.navlink} activeClassName={classes.active}>
                  Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/bookings/new" className={classes.navlink} activeClassName={classes.active}>
                  Add Booking
                </NavLink>
              </li>
              <li>
                <a href="/login" onClick={logOut} className={classes.navlink}>
                  Logout
                </a>
              </li>
            </ul>
          )
        ) : (
          <ul>
            <li>
              <NavLink to="/login" className={classes.navlink} activeClassName={classes.active}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={classes.navlink} activeClassName={classes.active}>
                Sign Up
              </NavLink>
            </li>
          </ul>
        )}
        <footer className={classes.social}>
          <SocialIcons />
        </footer>
      </nav>
    </div>
  );
};

export default Sidebar;
