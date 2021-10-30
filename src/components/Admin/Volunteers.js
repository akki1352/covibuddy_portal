import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-multi-carousel';
import SocialIcons from '../UI/SocialIcons';
import 'react-multi-carousel/lib/styles.css';
import classes from '../../styles/Doctors.module.css';
import { getVolunteers } from '../../actions/user';
import hospitalLogo from '../../assets/images/volunteer.jpg';

const Volunteers = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const { volunteers } = useSelector(state => state.user);
  const { message } = useSelector(state => state.message);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (volunteers.length === 0 && currentUser) {
      setLoading(true);
      dispatch(getVolunteers())
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [volunteers, dispatch]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const VolunteersList = volunteers.map(hospital => (
    <div key={hospital.id} className={classes.card}>
      {/* <Link to={`/hospitals/${hospital.id}`} className={classes.Doctors}> */}
      <div className="d-flex flex-column align-items-center">
        <img src={hospitalLogo} alt={hospital.name} className={`rounded-circle ${classes.img}`} />
        <h5 className={`text-dark p-4 ${classes.border}`}>{hospital.name}</h5>
        <p className="text-secondary mt-3">
          <strong>Contact:&nbsp;</strong>
          {hospital.contact}
        </p>
        <p className="text-secondary mt-3">
          <strong>Location:&nbsp;</strong>
          {hospital.location}
        </p>
      </div>
      {/* </Link> */}
      <SocialIcons />
    </div>
  ));
  return (
    <div className="container text-center">
      <div>
        <h3>LIST OF VOLUNTEERS</h3>
        <p className="text-secondary">Please contact volunteer for help.</p>
      </div>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {VolunteersList}
      </Carousel>
      {message && (
        <div className="form-group">
          <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Volunteers;
