import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://frozen-river-95471.herokuapp.com/';
// const D_API_URL = 'http://localhost:7000/';
const D_API_URL = 'https://covibuddy.herokuapp.com/';

const getDoctors = () => axios.get(`${API_URL}api/v1/doctors`, { headers: authHeader() });
const getDoctor = id => axios.get(`${API_URL}api/v1/doctors/${id}`, { headers: authHeader() });
const getAppointments = id => axios.get(`${API_URL}api/v1/users/${id}/appointments`, { headers: authHeader() });
const getAppointment = (userId, appointmentId) => axios.get(`${API_URL}api/v1/users/${userId}/appointments/${appointmentId}`, { headers: authHeader() });
const postAppointment = (userId, doctorId, appointmentDate) => axios.post(`${API_URL}api/v1/users/${userId}/appointments`, { doctor_id: doctorId, appointment_date: appointmentDate }, { headers: authHeader() });
const deleteAppointment = (userId, appointmentId) => axios.delete(`${API_URL}api/v1/users/${userId}/appointments/${appointmentId}`, { headers: authHeader() });
const getUsers = () => axios.get(`${D_API_URL}api/v1/users`);
const updateUser = (name_, email_, contact_, location_) => axios.put(`${D_API_URL}api/v1/users`, { name: name_, email: email_, contact: contact_, location: location_ });
const getHospitals = () => axios.get(`${D_API_URL}api/v1/hospital`);
const getHospital = hospitalId => axios.get(`${D_API_URL}api/v1/hospital/${hospitalId}`);
const getBookings = userId => axios.get(`${D_API_URL}api/v1/bookings/user/${userId}`);
const getBooking = bookingId => axios.get(`${D_API_URL}api/v1/bookings/${bookingId}`);
const postBooking = (userId, hospitalId, bookingType, bookingDate) => axios.post(`${D_API_URL}api/v1/bookings`, {
  user_id: userId, hospital_id: hospitalId, booking_type: bookingType, booking_date: bookingDate,
});
const deleteBooking = bookingId => axios.delete(`${D_API_URL}api/v1/bookings/${bookingId}`);
const getBookingTypes = () => axios.get(`${D_API_URL}api/v1/bookingTypes`);
const getSuppliers = () => axios.get(`${D_API_URL}api/v1/suppliers`);
const getVolunteers = () => axios.get(`${D_API_URL}api/v1/volunteers`);
export default {
  getDoctors,
  getDoctor,
  getAppointments,
  getAppointment,
  postAppointment,
  deleteAppointment,
  getUsers,
  getHospitals,
  getHospital,
  getBookings,
  getBooking,
  postBooking,
  deleteBooking,
  getBookingTypes,
  updateUser,
  getSuppliers,
  getVolunteers,
};
