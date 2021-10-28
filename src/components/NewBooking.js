import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { useAlert } from 'react-alert';
import UserService from '../services/user.service';
import { setMessage } from '../actions/message';
import { getHospitals } from '../actions/user';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  return null;
};

const NewBooking = ({ location }) => {
  const form = useRef();
  const checkBtn = useRef();
  const { user: currentUser } = useSelector(state => state.auth);
  const [hospitalId, setHospitalId] = useState('');
  const [bookingType, setBookingType] = useState([]);
  const [bookingId, setBookingId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const { message } = useSelector(state => state.message);
  const { hospitals } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    UserService.getBookingTypes().then(
      response => {
        setLoading(false);
        setBookingType(response.data.types);
      },
      error => {
        setLoading(false);
        const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

        setBookingType(message);
      },
    );
    if (location.hospitalId) {
      setHospitalId(location.hospitalId);
    } else {
      setHospitalId(1);
    }
    if (hospitals.length === 0 && currentUser) {
      setLoadingHospitals(true);
      dispatch(getHospitals())
        .then(() => {
          setLoadingHospitals(false);
        })
        .catch(() => {
          dispatch(setMessage('Unable to get Hospital list'));
        });
    }
  }, [hospitals, dispatch]);

  const onChangHospitalId = e => {
    const hospitalId = e.target.value;
    setHospitalId(hospitalId);
  };

  const onChangBookingType = e => {
    const bookingId = e.target.value;
    setBookingId(bookingId);
  };

  const onChangBookingDate = e => {
    const bookingDate = e.target.value;
    setBookingDate(bookingDate);
  };

  const handleRegister = e => {
    e.preventDefault();
    setLoading(true);
    setSuccessful(false);

    form.current.validateAll();

    // eslint-disable-next-line no-underscore-dangle
    if (checkBtn.current.context._errors.length === 0) {
      UserService.postBooking(currentUser.user.id, hospitalId, bookingId, bookingDate)
        .then(() => {
          setLoading(false);
          setSuccessful(true);
          alert.show('Appointment created', {
            type: 'success',
            timeout: 2000,
          });
        })
        .catch(() => {
          dispatch(setMessage('Something went wrong'));
          setLoading(false);
          setSuccessful(false);
        });
    } else {
      setLoading(false);
    }
  };
  const options = hospitals.map(hospital => (
    <option
      key={hospital.id}
      value={hospital.id}
    >
      {hospital.name}
    </option>
  ));

  const bookingTypesOptions = bookingType.map(type => (
    <option
      key={type.id}
      value={type.name}
    >
      {type.bookingType}
    </option>
  ));

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  if (successful) {
    return <Redirect to="/bookings" />;
  }
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="bookingDate">Booking Date</label>
                <Input
                  type="datetime-local"
                  className="form-control"
                  name="bookingDate"
                  value={bookingDate}
                  onChange={onChangBookingDate}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bookingType">Select Booking Type:</label>
                <select className="form-control" id="bookingType" onChange={onChangBookingType} value={bookingId}>
                  {loadingHospitals ? <option>Loading..</option> : bookingTypesOptions }
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="hospitalId">Select Hospital Type:</label>
                <select className="form-control" id="hospitalId" onChange={onChangHospitalId} value={hospitalId}>
                  {loadingHospitals ? <option>Loading..</option> : options }
                </select>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading || loadingHospitals} type="submit">
                  {loading && (
                  <span className="spinner-border spinner-border-sm" />
                  )}
                  <span>Book</span>
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

NewBooking.propTypes = {
  location: PropTypes.shape({
    hospitalId: PropTypes.string,
  }).isRequired,
};
export default NewBooking;
