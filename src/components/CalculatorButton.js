import React from 'react';

export default (props) => (
    <div>
        <button className="Cal__button" onClick={()=>{props.handleButtonClicked(props.value)}}>
            {props.value}
        </button>
    </div>
)