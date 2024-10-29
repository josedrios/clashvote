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
                    <img className='vote-item-image win-img' src={aq} alt="" />
                    <h3 className='vote-item-percentage-xs'>60%</h3>
                    <div className='vote-item-body'>
                        <div className='vote-item-header'>
                            <h3 className='vote-item-title'>Archer Queen</h3>
                            <h3 className='vote-item-percentage'>60%</h3>
                        </div>
                        <div className='vote-item-bar'>
                            <div className='background-bar win-bar'></div>
                            <div className='fill-bar win-fill-bar aq'></div>
                        </div>
                        <h3 className='vote-item-vote-count'>2.3k votes</h3>
                    </div>
                </div>

                <div className='vote-item'>
                    <img className='vote-item-image' src={bk} alt="" />
                    <h3 className='vote-item-percentage-xs'>30%</h3>
                    <div className='vote-item-body'>
                        <div className='vote-item-header'>
                            <h3 className='vote-item-title'>Barbarian King</h3>
                            <h3 className='vote-item-percentage'>30%</h3>
                        </div>
                        <div className='vote-item-bar'>
                            <div className='background-bar lose-bar'></div>
                            <div className='fill-bar lose-fill-bar bk'></div>
                        </div>
                        <h3 className='vote-item-vote-count'>1.1k votes</h3>
                    </div>
                </div>

                <div className='vote-item'>
                    <img className='vote-item-image' src={gw} alt="" />
                    <h3 className='vote-item-percentage-xs'>8%</h3>
                    <div className='vote-item-body'>
                        <div className='vote-item-header'>
                            <h3 className='vote-item-title'>Grand Warden</h3>
                            <h3 className='vote-item-percentage'>8%</h3>
                        </div>
                        <div className='vote-item-bar'>
                            <div className='background-bar lose-bar'></div>
                            <div className='fill-bar lose-fill-bar gw'></div>
                        </div>
                        <h3 className='vote-item-vote-count'>302 votes</h3>
                    </div>
                </div>

                <div className='vote-item'>
                    <img className='vote-item-image' src={rc} alt="" />
                    <h3 className='vote-item-percentage-xs'>2%</h3>
                    <div className='vote-item-body'>
                        <div className='vote-item-header'>
                            <h3 className='vote-item-title'>Royal Champion</h3>
                            <h3 className='vote-item-percentage'>2%</h3>
                        </div>
                        <div className='vote-item-bar'>
                            <div className='background-bar lose-bar'></div>
                            <div className='fill-bar lose-fill-bar rc'></div>
                        </div>
                        <h3 className='vote-item-vote-count'>98 votes</h3>
                    </div>
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default Season