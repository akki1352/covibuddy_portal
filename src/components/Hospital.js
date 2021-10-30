import React, { useState, useEffect } from 'react';
import { Redirect, Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';
import classes from '../styles/Doctor.module.css';
import hospitalLarge from '../assets/images/hospital_large.jpg';

const Hospital = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useSelector(state => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  const { id } = useParams();
  useEffect(() => {
    UserService.getHospital(id).then(
      response => {
        setLoading(false);
        setContent(response.data.hospital);
      },
      error => {
        setLoading(false);
        const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

        setContent(message);
      },
    );
  }, []);
  return (
    <div className="container">
      <div className="text-center">
        {loading && <span className="spinner-border spinner-border-lg" />}
      </div>
      <div className={classes.Doctor}>
        <img src={hospitalLarge} alt={content.name} className={classes.doctorImg} />
        <div>
          <h2 style={{ textTransform: 'uppercase' }}>
            {content.name}
          </h2>
          <p className={`${classes.badge} ${classes.badgeSecondary}`}>
            Hospital Name: &nbsp;&nbsp;&nbsp;&nbsp;
            {content.name}
          </p>
          <p className={classes.badge}>
            Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {content.location}
          </p>
          <p className={`${classes.badge} ${classes.badgeSecondary}`}>
            Bed Type: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {content.bedType}
          </p>
          <p className={classes.badge}>
            Availaibility: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {content.availability}
          </p>
          <p className={classes.badge}>
            Contact: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {content.contact}
          </p>
          <li>
            <Link
              to={{
                pathname: '/bookings/new',
                hospitalId: content.id,
              }}
              className={classes.btn}
            >
              Book Covid Vaccine
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Hospital;
