import { FiUser } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { MdLockOutline } from 'react-icons/md';
import { useState } from 'react';
import { useAlert } from '../../../util/AlertContext';

export default function Signup({ authType, authTab, setAuthTab }) {
  const { showAlert } = useAlert();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    tos: false,
    age: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    console.log('Form submitted: ', formData);
    showAlert('You have registered!', 'success');
  };

  return (
    <form
      id={`${authType}-form`}
      className="auth-form"
      style={{
        animation:
          authType === authTab
            ? 'swipe-in 0.5s forwards'
            : 'swipe-out 0.2s forwards',
      }}
    >
      <h3 className="sign-log-header">
        {authType === 'login' ? 'Login' : 'Sign Up'}
      </h3>

      <div className="auth-input-container">
        <FiUser className="auth-input-icon" />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="auth-input"
        />
      </div>

      <div className="auth-input-container">
        <HiOutlineMail className="auth-input-icon" />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="auth-input"
        />
      </div>
      <div className="auth-input-container">
        <MdLockOutline className="auth-input-icon" />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="auth-input"
        />
      </div>
      <div className="auth-checkbox-container">
        <p>
          <input
            type="checkbox"
            name="tos"
            checked={formData.tos}
            onChange={handleChange}
            id="auth-form-tos"
          />{' '}
          I agree to the{' '}
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms of services
          </a>
        </p>
        <div className="auth-checkbox-container">
          <p>
            <input
              type="checkbox"
              name="age"
              checked={formData.age}
              onChange={handleChange}
              id="auth-form-age"
            />{' '}
            I am 13 or older
          </p>
        </div>
      </div>
      <button
        className="auth-form-confirm"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {authType.toUpperCase()}
      </button>
      <a
        className="forgot-already-link"
        id="already-link"
        href=""
        onClick={(e) => {
          e.preventDefault();
          setAuthTab('login');
        }}
      >
        Already have an account?
      </a>
    </form>
  );
}
