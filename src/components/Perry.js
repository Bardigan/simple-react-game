import React from 'react';
import PerryImage from '../img/Perry.png';

const Perry = (props) => {
    return (
        <img 
        src={PerryImage} 
        alt="Perry" 
        className="Perry"
        style={props.loseProp ===true ? props.opacityProp : props.jump}
        />
    );
};

export default Perry;
