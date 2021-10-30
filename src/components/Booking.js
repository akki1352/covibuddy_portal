/* eslint linebreak-style: ["error", "windows"] */
import React, { useState, useEffect } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import UserService from '../services/user.service';

const Booking = () => {
  const [content, setContent] = useState('');
  const [hospital, setHospital] = useState('');
  const [loading, setLoading] = useState(true);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);
  const { user: currentUser } = useSelector(state => state.auth);
  const alert = useAlert();
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const { bookingId } = useParams();
  useEffect(() => {
    UserService.getBooking(bookingId).then(
      response => {
        setContent(response.data);
        return response.data.hospitalId;
      },
      error => {
        setLoading(false);
        setError(true);
        const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

        setContent(message);
      },
    ).then(hospitalId => UserService.getHospital(hospitalId))
      .then(response => {
        setLoading(false);
        setHospital(response.data.hospital);
      });
  }, []);

  const handleClick = () => {
    setLoading(true);
    UserService.deleteBooking(bookingId).then(() => {
      alert.show('Booking Deleted', {
        type: 'success',
        timeout: 5000,
      });
      setLoading(false);
      setSuccessful(true);
    });
  };

  if (successful) {
    return <Redirect to="/bookings" />;
  }

  return (
    <div className="container">
      <h3>Your Booking</h3>
      <header className="jumbotron">
        {loading && <span className="spinner-border spinner-border-lg" />}
        {
          hospital && (
          <div>
            <p>
              Your Booking with: &nbsp;
              {hospital.name}
            </p>
            <p>
              Booking Id: &nbsp;
              {content.bookingId}
            </p>
            <p>
              Booking Type: &nbsp;
              {content.bookingType}
            </p>
            <p>
              Hospital Name: &nbsp;
              <Link to={`/hospitals/${hospital.id}`}>
                {hospital.name}
              </Link>
            </p>
            <p>
              On &nbsp;
              {new Date(content.bookingDate).toLocaleDateString()}
            </p>
            <button className="btn btn-primary btn-block custom-btn" type="button" onClick={handleClick} disabled={loading}>
              Delete
            </button>
          </div>
          )
        }
        {
          error && <p>{content}</p>
        }
      </header>
    </div>
  );
};

export default Booking;
