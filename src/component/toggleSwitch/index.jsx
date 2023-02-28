import React, { useEffect, useState } from 'react'
import './toggle-switch.scss'

const ToggleSwitch = ({ checked, handleChangeToggle }) => {
    // const [data, setData] = useState(checked);


    return (
        <label className="toggle">
            <input name='toggle' type="checkbox" checked={checked} onChange={handleChangeToggle} />
            <span className="slider"></span>
            <span className="labels" data-on="ON" data-off="OFF"></span>
        </label>
    )
}

export default ToggleSwitch