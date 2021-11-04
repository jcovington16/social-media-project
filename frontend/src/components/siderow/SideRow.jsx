import React from 'react';
import './SideRow.css';

const SideRow = ({Icon, title}) => {
    return (
        <div className="sideRow">
            <Icon className="siderow__icon" />
            <h3 className="siderow__title">{title}</h3>
            
        </div>
    )
}

export default SideRow;