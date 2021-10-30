/* eslint linebreak-style: ["error", "windows"] */
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-multi-carousel';
// import SocialIcons from '../UI/SocialIcons';
import 'react-multi-carousel/lib/styles.css';
import classes from '../../styles/Doctors.module.css';
import { getSuppliers } from '../../actions/user';
import sanitizerLogo from '../../assets/images/sanitizer.png';
import maskLogo from '../../assets/images/mask.jpg';
import cylinderLogo from '../../assets/images/cylinder.jpg';
import rationLogo from '../../assets/images/ration.jpg';

const Suppliers = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const { suppliers } = useSelector(state => state.user);
  const { message } = useSelector(state => state.message);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (suppliers.length === 0 && currentUser) {
      setLoading(true);
      dispatch(getSuppliers())
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [suppliers, dispatch]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const getImage = imageType => {
    if (imageType === 'Mask') {
      return maskLogo;
    }
    if (imageType === 'Sanitizer') {
      return sanitizerLogo;
    }
    if (imageType === 'Fruits' || imageType === 'Vegetables') {
      return rationLogo;
    }
    return cylinderLogo;
  };

  const suppliersList = suppliers.map(supplier => (
    <div key={supplier.id} className={classes.card}>
      {/* <Link to={`/hospitals/${supplier.id}`} className={classes.Doctors}> */}
      <div className="d-flex flex-column align-items-center">
        <img src={getImage(supplier.supplyType)} alt={supplier.name} className={`rounded-circle ${classes.img} corousal_img`} />
        <h5 className={`text-dark p-4 ${classes.border}`}>{supplier.name}</h5>
        <p className="text-secondary mt-3">
          <strong>Supply Type:&nbsp;</strong>
          {supplier.supplyType}
        </p>
        <p className="text-secondary mt-3">
          <strong>Stock:&nbsp;</strong>
          {supplier.stock}
        </p>
        <p className="text-secondary mt-3">
          <strong>Location:&nbsp;</strong>
          {supplier.location}
        </p>
        <p className="text-secondary mt-3">
          <strong>Contact:&nbsp;</strong>
          {supplier.contact}
        </p>
      </div>
      {/* </Link> */}
      {/* <SocialIcons /> */}
    </div>
  ));
  return (
    <div className="container text-center">
      <div>
        <h3>LIST OF SUPPLIERS</h3>
        <p className="text-secondary">Please contact supplier for more details.</p>
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
        {suppliersList}
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

export default Suppliers;
