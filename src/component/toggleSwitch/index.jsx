import React, { useEffect, useState } from 'react'
import './toggle-switch.scss'

const ToggleSwitch = ({ checked }) => {
    const [data, setData] = useState(checked);
    const handleChangeToggle = () => {
        setData(!data);
    }

    return (
        <label className="toggle">
            <input name='toggle' type="checkbox" checked={data} onChange={handleChangeToggle} />
            <span className="slider"></span>
            <span className="labels" data-on="ON" data-off="OFF"></span>
        </label>
    )
}

export default ToggleSwitch