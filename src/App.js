import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Switch, Route, useLocation,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Doctors from './components/Doctors';
import Doctor from './components/Doctor';
import Appointments from './components/Appointments';
import Appointment from './components/Appointment';
import NewAppointment from './components/NewAppointment';
import { clearMessage } from './actions/message';
import Hospitals from './components/Hospitals';
import Hospital from './components/Hospital';
import Bookings from './components/Bookings';
import Booking from './components/Booking';
import NewBooking from './components/NewBooking';
import Suppliers from './components/Admin/Suppliers';
import Volunteers from './components/Admin/Volunteers';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(clearMessage()); // clear message when changing location
  }, [dispatch, location]);

  return (
    <div>
      <Sidebar />
      <main>
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/doctors" component={Doctors} />
          <Route exact path="/doctors/:id" component={Doctor} />
          <Route exact path="/appointments" component={Appointments} />
          <Route exact path="/appointments/new" component={NewAppointment} />
          <Route exact path="/appointments/:id" component={Appointment} />
          <Route exact path="/hospitals" component={Hospitals} />
          <Route exact path="/hospitals/:id" component={Hospital} />
          <Route exact path="/bookings" component={Bookings} />
          <Route exact path="/bookings/new" component={NewBooking} />
          <Route exact path="/bookings/:bookingId" component={Booking} />
          <Route exact path="/suppliers" component={Suppliers} />
          <Route exact path="/volunteers" component={Volunteers} />
          <Route exact path="/ambulance" component={Suppliers} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
