import { Card, LegacyCard, Tabs } from '@shopify/polaris';
import './navbar.scss'
import React, { useCallback, useState } from 'react'
import PixelManager from '../../page/PixelManager';
import Pricing from '../../page/Pricing';
import Document from '../../page/Document';

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
            <LegacyCard className="navbar">
                <Tabs className="navbar-tab" tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <LegacyCard.Section>
                        {
                            renderSwitch(selected)
                        }
                    </LegacyCard.Section>
                </Tabs>
            </LegacyCard>
        </>
    );
}

export default Navbar
