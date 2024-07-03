import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './registerStyle.css';






function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const RegisterForm = () => {
  const history = useNavigate ();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phone) => {
    const re = /^01\d{9}$/; // Adjust the regex according to your phone number format requirements
    return re.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { email, phone } = formData;

    // Clear previous errors
    setErrors({});

    let validationErrors = {};

    // Validate email
    if (!validateEmail(email)) {
      validationErrors.email = ["Invalid email address"];
    }

     // Validate phone number
  if (!validatePhoneNumber(phone)) {
    validationErrors.phone = ["Phone number must start with 01 and be 11 digits long"];
  }

    // Add other validations as needed

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      // Proceed with form submission
      console.log("Form data:", formData);
      // Add form submission logic here
    }


    const headers = {
      'Content-Type': 'application/json',
    };

    axios.post("https://game1.makegame.io/game/players/", {
      name: formData.username,
      email: formData.email,
      phone: formData.phone,
      profile_pic_id: getRandomNumber(0, 129)
    }, { headers: headers })
    .then(resp => {
      console.log('Response data:', resp.data);
      localStorage.setItem("userid", resp.data.id);
      setErrors({}); // Clear any previous errors on success
      history("/play");
    })
    .catch(error => {
      console.log('Error response:', error);
      
      if (error.response && error.response.data) {
        console.log('Error response 2:', error.response.data);
        setErrors(error.response.data); // Set errors from API response
      } else {
        console.log('An error occurred. Please try again.');
        setErrors({ non_field_errors: 'An error occurred. Please try again.' });
      }
    });
  };

  return (
    <div className="container">
      <h1 className="heading">
        Enter your details <br /> to win prizes
      </h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="User-name"
            className="input"
          />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            className="input"
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>
        <div className="input-group">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="input"
          />
          {errors.phone && <p className="error">{errors.phone[0]}</p>}
        </div>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};


export default RegisterForm;
