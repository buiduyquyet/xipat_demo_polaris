import React from 'react'
import './toggle-switch.scss'

const ToggleSwitch = () => {
    return (
        <label className="toggle">
            <input type="checkbox" />
            <span className="slider"></span>
            <span className="labels" data-on="ON" data-off="OFF"></span>
        </label>
    )
}

export default ToggleSwitch
