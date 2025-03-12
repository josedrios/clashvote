import { IoMdShare } from 'react-icons/io';
import { FaUserCheck } from 'react-icons/fa';
import { IoBookmark } from 'react-icons/io5';
import { saveUnit } from '../../../../util/updateUserInfo';
import { useAlert } from '../../../../util/AlertContext';

import images from '../../Images';
const getImage = (name) => images[name.replace(/[ .]/g, '_')] || null;

function PlayerMain({ data }) {
  const { showAlert } = useAlert();

  const handlePlayerSave = (data) => {
    const token = localStorage.getItem('token');
    saveUnit(
      token,
      'player',
      data.username,
      data.tag.split('#').join(''),
      data.home.leagueIcon,
      showAlert
    );
  };

  return (
    <div id="player-general-info-section">
      {data.labels[0] !== '' && (
        <div id="player-labels">
          <img className="player-label" src={data.labels[0]} alt="" />
          <img className="player-label" src={data.labels[1]} alt="" />
          <img className="player-label" src={data.labels[2]} alt="" />
        </div>
      )}
      <div id="player-tag">{data.tag}</div>
      <div id="player-xp-container">
        <img id="xp-icon" src={getImage('xp')} alt="" />
        <div id="player-level">{data.level}</div>
      </div>
      <div id="player-action-btns">
        <button>
          <IoMdShare />
        </button>
        <button onClick={() => handlePlayerSave(data)}>
          <IoBookmark />
        </button>
        <button>
          <FaUserCheck />
        </button>
      </div>
    </div>
  );
}

export default PlayerMain;
