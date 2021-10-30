/* eslint linebreak-style: ["error", "windows"] */
import {
  DOCTORS_SUCCESS,
  DOCTORS_FAIL,
  SET_MESSAGE,
  HOSPITALS_SUCCESS,
  HOSPITALS_FAIL,
  SUPPLIERS_SUCCESS,
  SUPPLIERS_FAIL,
  VOLUNTEERS_SUCCESS,
  VOLUNTEERS_FAIL,
} from './types';

import UserService from '../services/user.service';

export default () => dispatch => UserService.getDoctors().then(
  response => {
    dispatch({
      type: DOCTORS_SUCCESS,
      payload: { doctors: response.data },
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    return Promise.resolve();
  },
  error => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    dispatch({
      type: DOCTORS_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);

const getHospitals = () => dispatch => UserService.getHospitals().then(
  response => {
    dispatch({
      type: HOSPITALS_SUCCESS,
      payload: { hospitals: response.data.hospitals },
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    return Promise.resolve();
  },
  error => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    dispatch({
      type: HOSPITALS_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);

const getSuppliers = () => dispatch => UserService.getSuppliers().then(
  response => {
    dispatch({
      type: SUPPLIERS_SUCCESS,
      payload: { suppliers: response.data.suppliers },
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    return Promise.resolve();
  },
  error => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    dispatch({
      type: SUPPLIERS_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);

const getVolunteers = () => dispatch => UserService.getVolunteers().then(
  response => {
    dispatch({
      type: VOLUNTEERS_SUCCESS,
      payload: { volunteers: response.data.volunteers },
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    return Promise.resolve();
  },
  error => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    dispatch({
      type: VOLUNTEERS_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);

export { getHospitals, getSuppliers, getVolunteers };
