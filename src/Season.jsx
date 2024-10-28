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
                    <img className='vote-item-image' src={aq} alt="" />
                    <div className='vote-item-body'>
                        <div className='vote-item-header'>
                            <h3 className='vote-item-title'>Archer Queen</h3>
                            <h3 className='vote-item-percentage'>60%</h3>
                        </div>
                        <div className='vote-item-bar'>
                            <div className='background-bar'></div>
                            <div className='fill-bar'></div>
                        </div>
                        <h3 className='vote-item-vote-count'>2.3k votes</h3>
                    </div>
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default Season