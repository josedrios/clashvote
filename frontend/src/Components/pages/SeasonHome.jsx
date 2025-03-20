import Data from '../../general_data.json';

// TEMPORARY (FOR COMMENT VOTE VALUES)
function randomValue(bot, top) {
  return Math.floor(Math.random() * (top - bot + 1)) + bot;
}

export default function SeasonHome() {
  return (
    <div className='season-home-container'>
      <div className='season-cards-container'>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
