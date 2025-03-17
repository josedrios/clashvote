import useImage from '../../util/images/useImage';
import Login from '../features/Auth/login';
import Signup from '../features/Auth/signup';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Auth({setUserData}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [authTab, setAuthTab] = useState(
    location.pathname.includes('signup') ? 'signup' : 'login'
  );

  useEffect(() => {
    navigate(`/auth/${authTab}`, { replace: true });
  }, [authTab, navigate]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const height =
    authTab === 'login' ? (windowWidth < 701 ? '200px' : '400px') : '430px';

  const imageSrc = useImage('slider');

  return (
    <div id="auth-container">
      <div
        id="sign-log-container"
        style={{
          height,
        }}
      >
        <Signup authType={'signup'} authTab={authTab} setAuthTab={setAuthTab} setUserData={setUserData}/>
        <Login authType={'login'} authTab={authTab} setAuthTab={setAuthTab} setUserData={setUserData}/>
        <div
          id="art-slider"
          className={authTab === 'login' ? '' : 'art-slide-right'}
        >
          <h3>CV</h3>
          <img src={imageSrc} alt="" />
        </div>
      </div>
    </div>
  );
}