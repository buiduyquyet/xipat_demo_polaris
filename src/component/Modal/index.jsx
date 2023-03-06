import { Button, Modal, TextContainer } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export default function ModalComponent({ title, open, onClose, content }) {
    return (
        <Modal
            title={title}
            open={open}
            onClose={onClose}
        >
            <Modal.Section>
                {content}
            </Modal.Section>
        </Modal>
    );
}