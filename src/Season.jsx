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
                    Best Heroes
                </h3>
                <button className='vote-button'>
                    Vote
                </button>
            </div>
            <div className='horizontal-bar-graph-container'>
                <div className='axis-section'>
                    <div className='axis-section-header'>
                        <img className='axis-image' src={aq} alt="" />
                    </div>
                    <div className='test' id='queen-test'>
                        <h3 className='axis-percentage'>60%</h3>
                    </div>
                </div>
                <div className='axis-section'>
                    <div className='axis-section-header'>
                        <img className='axis-image' src={bk} alt="" />
                    </div>
                    <div className='test' id='king-test'>
                        <h3 className='axis-percentage'>50%</h3>
                    </div>
                </div>
                <div className='axis-section'>
                    <div className='axis-section-header'>
                        <img className='axis-image' src={gw} alt="" />
                    </div>
                    <div className='test' id='gw-test'>
                        <h3 className='axis-percentage'>10%</h3>
                    </div>
                </div>
                <div className='axis-section'>
                    <div className='axis-section-header'>
                        <img className='axis-image' src={rc} alt="" />
                    </div>
                    <div className='test' id='rc-test'>
                        <h3 className='axis-percentage'>0%</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Season