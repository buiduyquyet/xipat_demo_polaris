import React from 'react'
import './toggle-switch.scss'

const ToggleSwitch = ({ checked, handleChangeToggle }) => {
    return (
        <label className="toggle">
            <input name='toggle' type="checkbox" checked={checked} onChange={handleChangeToggle} />
            <span className="slider"></span>
            <span className="labels" data-on="ON" data-off="OFF"></span>
        </label>
    )
}

export default ToggleSwitch