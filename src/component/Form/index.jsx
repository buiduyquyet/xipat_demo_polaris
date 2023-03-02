import { Button, Form, FormLayout, Text, TextField } from '@shopify/polaris';
import React, { useCallback, useState } from 'react'
import ToggleSwitch from '../ToggleSwitch';

const FormPixel = () => {
    const [url, setUrl] = useState('');

    const handleSubmit = useCallback((_event) => setUrl(''), []);

    const handleUrlChange = useCallback((value) => setUrl(value), []);

    return (
        <Form onSubmit={handleSubmit}>
            <FormLayout>
                <TextField
                    value={url}
                    onChange={handleUrlChange}
                    label="URL"
                    type="url"
                    autoComplete="off"
                />
                <TextField
                    value={url}
                    onChange={handleUrlChange}
                    label="Name"
                    type="text"
                    autoComplete="off"
                />
                <TextField
                    value={url}
                    onChange={handleUrlChange}
                    label="Pixel"
                    type="text"
                    autoComplete="off"
                />
                <TextField
                    value={url}
                    onChange={handleUrlChange}
                    label="Code"
                    type="password"
                    autoComplete="off"
                />
                <Text>Active</Text>
                <ToggleSwitch />

                <Button primary submit>Add Now</Button>
            </FormLayout>
        </Form>
    )
}

export default FormPixel
