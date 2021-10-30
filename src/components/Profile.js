import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import UserService from '../services/user.service';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  return '';
};

const Profile = () => {
  const form = useRef();
  const checkBtn = useRef();
  const { user: currentUser } = useSelector(state => state.auth);
  const [name, setName] = useState(currentUser.user.name);
  const [contact, setContact] = useState(currentUser.user.contact);
  const [location, setLocation] = useState(currentUser.user.location);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const handleUpdate = e => {
    e.preventDefault();

    setLoading(true);
    form.current.validateAll();
    // eslint-disable-next-line no-underscore-dangle
    if (checkBtn.current.context._errors.length === 0) {
      UserService.updateUser(name, currentUser.user.email, contact, location).then(
        () => {
          setLoading(false);
          alert.show('Profile Updated Successfully.', {
            type: 'success',
            timeout: 5000,
          });
        },
        () => {
          setLoading(false);
        },
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ width: '400px' }}>
      <h3>
        <strong>{currentUser.user.name}</strong>
        {' '}
        Profile
      </h3>
      <Form onSubmit={handleUpdate} ref={form}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={e => { setName(e.target.value); }}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            className="form-control"
            name="email"
            value={currentUser.user.email}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <Input
            id="contact"
            type="text"
            className="form-control"
            name="contact"
            value={contact}
            onChange={e => { setContact(e.target.value); }}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <Input
            id="location"
            type="text"
            className="form-control"
            name="location"
            value={location}
            onChange={e => { setLocation(e.target.value); }}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" disabled={loading} type="submit">
            {loading && (
              <span className="spinner-border spinner-border-sm" />
            )}
            <span>Update</span>
          </button>
        </div>
        <CheckButton style={{ display: 'none' }} ref={checkBtn} />
      </Form>
    </div>
  );
};

export default Profile;
