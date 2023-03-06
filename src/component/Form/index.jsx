import { Button, Form, FormLayout, Text, TextField } from '@shopify/polaris';
import React, { useEffect, useState } from 'react'
import ToggleSwitch from '../ToggleSwitch';
import './form-pixel.scss'

const FormPixel = (props) => {
    const arr = [];
    const pixelId = () => {
        let pixel = {}
        props.items.forEach((item) => {
            if (item.id === props.id) {
                pixel = {
                    id: item.id,
                    url: item.url,
                    name: item.name,
                    pixel: item.pixel,
                    code: item.code,
                    isActive: item.isActive,
                }
            }
        });
        return pixel
    }

    const [pixelState, setPixelState] = useState(
        props.id === '' ? {
            id: 100,
            url: '#',
            name: '',
            pixel: '',
            code: '',
            isActive: false,
        } : pixelId()
    );

    const handleUrlChange = (value, id) => {
        setPixelState({ ...pixelState, [id]: value })
    }

    const handleChangeToggle = () => {
        setPixelState({ ...pixelState, isActive: !pixelState.isActive })
    }

    const UpdatePixel = () => {
        console.log("Pixel state: ", pixelState)
        props.items.forEach((item) => {
            if (item.id === props.id) {
                item.url = pixelState.url;
                item.name = pixelState.name;
                item.pixel = pixelState.pixel;
                item.code = pixelState.code;
                item.isActive = pixelState.isActive
            }
        })
        console.log("Edited: ", props.items)
    }

    const handleSubmit = () => {
        if (props.id === '') {
            arr.push(...props.items, { ...pixelState })
            props.setItems([...arr])
        } else {
            UpdatePixel()
        }
        props.onClose()
    }

    return (
        <Form onSubmit={handleSubmit}>
            {/* {console.log(props)} */}
            <FormLayout>
                <TextField
                    value={pixelState.name}
                    id="name"
                    onChange={handleUrlChange}
                    label="Name"
                    type="text"
                    autoComplete="off"
                />
                <TextField
                    value={pixelState.pixel}
                    id="pixel"
                    onChange={handleUrlChange}
                    label="Pixel"
                    type="text"
                    autoComplete="off"
                />
                <TextField
                    value={pixelState.code}
                    id="code"
                    onChange={handleUrlChange}
                    label="Code"
                    type="password"
                    autoComplete="off"
                />
                <Text>Active</Text>
                <ToggleSwitch
                    checked={pixelState.isActive}
                    handleChangeToggle={() => handleChangeToggle()}
                />

                <Button primary submit>
                    {
                        props.id === '' ? "Add now" : "Save"
                    }
                </Button>
            </FormLayout>
        </Form>
    )
}

export default FormPixel
