import { Card, Tabs } from '@shopify/polaris';
import './navbar.scss'
import React, { useCallback, useState } from 'react'
import PixelManager from '../../page/pixelManager';
import Pricing from '../../page/pricing';
import Document from '../../page/document';

const Navbar = () => {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'all-customers-1',
            content: 'Setting',
            accessibilityLabel: 'setting',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'accepts-marketing-1',
            content: 'Pricing',
            panelID: 'pricing',
        },
        {
            id: 'repeat-customers-1',
            content: 'Document',
            panelID: 'document',
        },
    ];

    const renderSwitch = (param) => {
        switch (param) {
            case 0:
                return <PixelManager />;
            case 1:
                return <Pricing />;
            case 2:
                return <Document />;
            default:
                return;
        }
    }

    return (
        <>
            <Card className="navbar">
                <Tabs className="navbar-tab" tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <Card.Section>
                        {
                            renderSwitch(selected)
                        }
                    </Card.Section>
                </Tabs>
            </Card>
        </>
    );
}

export default Navbar
