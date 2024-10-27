import { useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";

import aq from './assets/images/archer_queen.png';
import bk from './assets/images/barb_king.png';
import gw from './assets/images/grand_warden.png';
import rc from './assets/images/royal_champ.png';

function Season() {
  return (
    <div id='season-container'>
        <h1 id='season-title'>Current Season:</h1>
        <div className='vote-section'>
            <div className='vote-section-header'>
                <button className='vote-section-collapse'>
                    <IoMdArrowDropdown />
                </button>
                <h3 className='vote-section-title'>
                    Best Hero
                </h3>
                <button className='vote-button'>
                    Vote
                </button>
            </div>

            <div className='horizontal-bar-graph-container'>
                {/* THIS IS HOW THE NEW VOTE CARD STRUCTURE SHOULD LOOK LIKE */}
                <div className='vote-item'>
                    <img className='vote-item-image' src="" alt="" />
                    <div className='vote-item-body'>
                        <div className='vote-item-header'>
                            <h3 className='vote-item-title'>Archer Queen</h3>
                            <h3 className='vote-item-percentage'>60%</h3>
                        </div>
                        <div className='vote-item-bar'>
                            <div className='fill-bar'></div>
                            <div className='background-bar'></div>
                        </div>
                        <h3 className='vote-item-vote-count'>2.3k votes</h3>
                    </div>
                </div>

                {/* 
                    DEPRECATED VERSION OF VOTE CARD / DISCARD BELOW ONLY AFTER IMPLEMENTING 
                    THE NEW VOTE CARD ABOVE
                */}
                <h1 className='axis-name axis-name-leading'>Archer Queen: 2.3k votes</h1>
                <div className='axis-section'>
                    <div className='axis-section-header'>
                        <h3 className='axis-percentage'>60%</h3>
                        <img className='axis-image' src={aq} alt="" />
                    </div>
                    <div className='test test-won' id='queen-test'>
                    </div>
                </div>
                <h1 className='axis-name'>Barbarian King: 1.8k votes</h1>
                <div className='axis-section'>
                    <div className='axis-section-header'>
                        <h3 className='axis-percentage'>50%</h3>
                        <img className='axis-image' src={bk} alt="" />
                    </div>
                    <div className='test' id='king-test'>
                    </div>
                </div>
                <h1 className='axis-name'>Grand Warden: 1.2k votes</h1>
                <div className='axis-section'>
                    <div className='axis-section-header'>
                        <h3 className='axis-percentage'>10%</h3>
                        <img className='axis-image' src={gw} alt="" />
                    </div>
                    <div className='test' id='gw-test'>
                    </div>
                </div>
                <h1 className='axis-name'>Royal Champion: 103 votes</h1>
                <div className='axis-section'>
                    <div className='axis-section-header'>
                        <h3 className='axis-percentage'>0%</h3>
                        <img className='axis-image' src={rc} alt="" />
                    </div>
                    <div className='test' id='rc-test'>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Season