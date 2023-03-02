import { Button, Modal, TextContainer } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export default function ModalComponent({ title, open, onClose, content }) {
    // const [active, setActive] = useState(true);

    // const handleChange = useCallback(() => setActive(!active), [active]);

    // const activator = <Button onClick={handleChange}>Open</Button>;

    return (
        <Modal
            // activator={activator}
            title={title}
            open={open}
            onClose={onClose}
        // primaryAction={{
        //     content: 'Add Instagram',
        //     onAction: handleChange,
        // }}
        // secondaryActions={[
        //     {
        //         content: 'Learn more',
        //         onAction: handleChange,
        //     },
        // ]}
        >
            <Modal.Section>
                {content}
            </Modal.Section>
        </Modal>
    );
}