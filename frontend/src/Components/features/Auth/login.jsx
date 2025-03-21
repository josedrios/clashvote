import { HiOutlineMail } from 'react-icons/hi';
import { MdLockOutline } from 'react-icons/md';
import { useState } from 'react';
import { useAlert } from '../../../util/AlertContext';
import { validateAuthForm } from '../../../util/processInputs';
import { processLogin } from '../../../util/processAuth';
import { useNavigate } from 'react-router-dom';

export default function Login({ authType, authTab, setAuthTab, setUserData }) {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const validation = validateAuthForm(formData, showAlert, 'login');
    if (validation) {
      processLogin(formData, navigate, showAlert, setUserData);
    }
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
        <HiOutlineMail className="auth-input-icon" />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="auth-input"
          aria-label="Email"
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
          aria-label="Password"
        />
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
      <>
        <a
          className="forgot-already-link"
          id="forgot-link"
          href=""
          onClick={(e) => {
            e.preventDefault();
            setAuthTab('signup');
          }}
        >
          Don't have an account?
        </a>
        <a
          className="forgot-already-link"
          href=""
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          Forgot password?
        </a>
      </>
    </form>
  );
}
