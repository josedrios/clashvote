import { useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";

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
                        
                    </div>
                    <div className='test' id='queen-test'>
                    
                    </div>
                </div>
                <div className='axis-section'>
                    <div className='axis-section-header'>
                        
                    </div>
                    <div className='test' id='king-test'>
                    
                    </div>
                </div>
                <div className='axis-section'>
                    <div className='axis-section-header'>
                        
                    </div>
                    <div className='test' id='gw-test'>
                    
                    </div>
                </div>
                <div className='axis-section'>
                    <div className='axis-section-header'>
                        
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