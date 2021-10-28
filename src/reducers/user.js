import {
  DOCTORS_SUCCESS,
  DOCTORS_FAIL,
  HOSPITALS_SUCCESS,
  HOSPITALS_FAIL,
  SUPPLIERS_SUCCESS,
  SUPPLIERS_FAIL,
  VOLUNTEERS_SUCCESS,
  VOLUNTEERS_FAIL,
} from '../actions/types';

const initialState = {
  doctors: [],
  hospitals: [],
  ambulances: [],
  suppliers: [],
  volunteers: [],
};

export default function user(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DOCTORS_SUCCESS:
      return {
        ...state,
        doctors: payload.doctors,
      };
    case DOCTORS_FAIL:
      return {
        ...state,
      };
    case HOSPITALS_SUCCESS:
      return {
        ...state,
        hospitals: payload.hospitals,
      };
    case HOSPITALS_FAIL:
      return {
        ...state,
      };
    case SUPPLIERS_SUCCESS:
      return {
        ...state,
        suppliers: payload.suppliers,
      };
    case SUPPLIERS_FAIL:
      return {
        ...state,
      };
    case VOLUNTEERS_SUCCESS:
      return {
        ...state,
        volunteers: payload.hospitals,
      };
    case VOLUNTEERS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
