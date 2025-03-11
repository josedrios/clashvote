import images from '../../Components/features/Images';
import Login from '../features/Auth/login';
import Signup from '../features/Auth/signup';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const getImage = (name) => images[name.replace(/[ .]/g, '_')] || null;

export default function Auth({}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [authTab, setAuthTab] = useState(
    location.pathname.includes('signup') ? 'signup' : 'login'
  );

  useEffect(() => {
    navigate(`/auth/${authTab}`, { replace: true });
  }, [authTab, navigate]);

  return (
    <div id="auth-container">
      <div
        id="sign-log-container"
        style={
          'login' === authTab
            ? {
                height: '310px',
              }
            : {
                height: '430px',
              }
        }
      >
        <Signup authType={'signup'} authTab={authTab} setAuthTab={setAuthTab} />
        <Login authType={'login'} authTab={authTab} setAuthTab={setAuthTab} />
        <div
          id="art-slider"
          className={authTab === 'login' ? '' : 'art-slide-right'}
        >
          <h3>CV</h3>
          <img src={getImage('slider')} alt="" />
        </div>
      </div>
    </div>
  );
}