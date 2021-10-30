/* eslint linebreak-style: ["error", "windows"] */
import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';

const Bookings = () => {
  const [content, setContent] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useSelector(state => state.auth);
  let bookings;

  useEffect(() => {
    if (currentUser) {
      UserService.getBookings(currentUser.user.id).then(
        response => {
          setLoading(false);
          setContent(response.data.bookings);
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
      ).then(
        UserService.getHospitals().then(
          response => {
            setLoading(false);
            setHospitals(response.data.hospitals);
          },
          error => {
            setLoading(false);
            const message = (error.response
                && error.response.data
                && error.response.data.message)
              || error.message
              || error.toString();
            setHospitals(message);
          },
        ),
      );
    }
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (!loading && content.length === 0) {
    bookings = (
      <h4>
        You do not have any Booking. Create one
        <Link to="/bookings/new">
          here
        </Link>
      </h4>
    );
  } else {
    bookings = content && content.map(booking => {
      const d = new Date(booking.bookingDate);
      const date = d.toLocaleDateString();
      return (
        <Link to={`/bookings/${booking.id}`} key={booking.id}>
          <div className="card m-4">
            <div className="card-body">
              <p>
                Booking Type: &nbsp;
                {booking.bookingType}
              </p>
              <p>
                On &nbsp;
                {date}
              </p>
              {hospitals.map(hospital => {
                if (booking.hospitalId === hospital.id) {
                  return (
                    <div key={hospital.id}>
                      <p>
                        Hospital Name: &nbsp;
                        {hospital.name}
                      </p>
                      <p>
                        Location: &nbsp;
                        {hospital.location}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </Link>
      );
    });
  }

  return (
    <div className="container text-center">
      <h3>Your Bookings</h3>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <div className="d-flex flex-wrap">
        {bookings}
      </div>
    </div>
  );
};

export default Bookings;
