import { FaCheck } from 'react-icons/fa';
import useImage from '../../../../util/images/useImage';

function PlayerAchievements({ achievements, base, achCurrent }) {
  achievements.map((ach) => {
    if (ach.value >= ach.target) {
      ach.stars = 3;
    }
  });

  const starImg = useImage('star');

  return (
    <div
      className={`achievements-container ${base}-ach ${
        achCurrent !== base ? 'hide' : ''
      }`}
    >
      <div className="ach-section">
        <div className="base-ach-container">
          {achievements.map((ach, index) => (
            <div className="ach-container" key={index}>
              <div className="ach-stars">
                {Array.from({ length: ach.stars }, (_, index) => (
                  <img
                    className="ach-star"
                    key={index}
                    src={starImg}
                    alt=""
                  />
                ))}
                {Array.from({ length: 3 - ach.stars }, (_, index) => (
                  <img
                    className="ach-star-empty"
                    key={index}
                    src={starImg}
                    alt=""
                  />
                ))}
              </div>
              <div className="ach-body">
                <div className="ach-name">{ach.name}</div>
                <div className="ach-info">{ach.info}</div>
              </div>
              {ach.stars === 3 ? (
                <div className="ach-progress ach-completion">
                  <p className="ach-completion-note">{ach.completionInfo}</p>
                  <FaCheck className="ach-check" />
                </div>
              ) : (
                <div className="ach-progress">
                  <div className="ach-progress-text">
                    {ach.value}/{ach.target}
                  </div>
                  <div className="ach-progress-bar">
                    <div
                      className="ach-fill-bar"
                      style={{
                        width: `${(ach.value / ach.target) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="ach-percentage">
                    {((ach.value / ach.target) * 100).toFixed(1)}%
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerAchievements;
