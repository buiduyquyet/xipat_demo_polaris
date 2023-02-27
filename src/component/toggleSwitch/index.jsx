import React, { useEffect, useState } from 'react'
import './toggle-switch.scss'

const ToggleSwitch = ({ checked, onChangeToggle }) => {

    useEffect(() => {
        console.log("Toggle: ", { checked })
    }, [checked])

    return (
        <label className="toggle">
            <input name='toggle' type="checkbox" checked={checked} onChange={onChangeToggle} />
            <span className="slider"></span>
            <span className="labels" data-on="ON" data-off="OFF"></span>
        </label>
    )
}

export default ToggleSwitch
