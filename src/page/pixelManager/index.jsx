import React, { useCallback, useEffect, useState } from 'react'
import {
    TextField,
    Filters,
    Button,
    ResourceList,
    ResourceItem,
    SettingToggle,
    Page,
    Layout,
    Pagination,
    Stack,
    Text,
    LegacyCard,
} from '@shopify/polaris';
import { DeleteMinor, EditMajor } from '@shopify/polaris-icons';
import './pixel-manager.scss'
import ToggleSwitch from '../../component/toggleSwitch';
import OptionList from '../../component/optionList';


const PixelManager = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [taggedWith, setTaggedWith] = useState('');
    const [queryValue, setQueryValue] = useState(null);

    const handleTaggedWithChange = useCallback(
        (value) => setTaggedWith(value),
        [],
    );
    const handleQueryValueChange = useCallback(
        (value) => setQueryValue(value),
        [],
    );
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
    const handleClearAll = useCallback(() => {
        handleTaggedWithRemove();
        handleQueryValueRemove();
    }, [handleQueryValueRemove, handleTaggedWithRemove]);

    const resourceName = {
        singular: 'pixel',
        plural: 'pixel',
    };

    const [checked, setchecked] = useState(false);

    let newItems = [];
    const [items, setItems] = useState([
        {
            id: 112,
            url: '#',
            name: 'Art To Cart 112',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            isActive: checked,
            edited: (
                <>
                    <Button icon={EditMajor} accessibilityLabel="Edit item" />
                    <Button icon={DeleteMinor} accessibilityLabel="Remove item" />
                </>
            ),
        },
        {
            id: 113,
            url: '#',
            name: 'Art To Cart 113',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            isActive: false,
            edited: (
                <>
                    <Button icon={EditMajor} accessibilityLabel="Edit item" />
                    <Button icon={DeleteMinor} accessibilityLabel="Remove item" />
                </>
            ),
        },
        {
            id: 114,
            url: '#',
            name: 'Art To Cart 114',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            isActive: false,
            edited: (
                <>
                    <Button icon={EditMajor} accessibilityLabel="Edit item" />
                    <Button icon={DeleteMinor} accessibilityLabel="Remove item" />
                </>
            ),
        },
        {
            id: 115,
            url: '#',
            name: 'Art To Cart 115',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            isActive: false,
            edited: (
                <>
                    <Button icon={EditMajor} accessibilityLabel="Edit item" />
                    <Button icon={DeleteMinor} accessibilityLabel="Remove item" />
                </>
            ),
        },
    ]);

    const bulkActions = [
        {
            content: 'Set as active',
            onAction: () => {
                items.map((item) => {
                    if (selectedItems.includes(item.id)) {
                        item.isActive = true
                    }
                    newItems.push(item)
                })
                setRender(false)
                setItems([...newItems])
            },
        },
        {
            content: 'Set as draft',
            onAction: () => {
                items.forEach((item) => {
                    if (selectedItems.includes(item.id)) {
                        item.isActive = false
                    }
                    newItems.push(item)
                })
                setRender(false)
                setItems([...newItems])
            },
        },
        {
            content: 'Delete pixel',
            onAction: () => {
                const newItems = items.filter((item) => !selectedItems.includes(item.id))
                setItems([...newItems])
            },
        },
    ];
    const bulkActions_noActive = [
        {
            content: 'Set as draft',
            onAction: () => {
                items.map((item) => {
                    if (selectedItems.includes(item.id)) {
                        item.isActive = false
                    }
                    newItems.push(item)
                })
                setRender(false)
                setItems([...newItems])
            },
        },
        {
            content: 'Delete pixel',
            onAction: () => {
                const newItems = items.filter((item) => !selectedItems.includes(item.id))
                setItems([...newItems])
            },
        },
    ];
    const bulkActions_noDraf = [
        {
            content: 'Set as active',
            onAction: () => {
                items.map((item) => {
                    if (selectedItems.includes(item.id)) {
                        item.isActive = true
                    }
                    newItems.push(item)
                })
                setRender(false)
                setItems([...newItems])
            },
        },
        {
            content: 'Delete pixel',
            onAction: () => {
                const newItems = items.filter((item) => !selectedItems.includes(item.id))
                setSelectedItems([])
                setItems([...newItems])
            },
        },
    ];

    const handleCheckStatus = (type) => {
        let active = false;
        let draft = false;
        items.forEach(item => {
            if (selectedItems.includes(item.id)) {
                if (item.isActive === false) {
                    active = true;
                }
                if (item.isActive === true) {
                    draft = true;
                }
            }
        });
        return type === 'active' ? active : draft;
    }

    const filters = [
        {
            key: 'taggedWith3',
            label: 'Pixel Type',
            filter: (
                <TextField
                    label="Pixel Type"
                    value={taggedWith}
                    onChange={handleTaggedWithChange}
                    autoComplete="off"
                    labelHidden
                />
            ),
            shortcut: true,
        },
    ];

    const filterControl = (
        <Filters
            queryValue={queryValue}
            filters={filters}
            onQueryChange={handleQueryValueChange}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleClearAll}
        >
        </Filters>
    );

    // Settting toggle
    const [active, setActive] = useState(false);
    const handleToggle = useCallback(() => setActive((active) => !active), []);

    const contentStatus = active ? 'Disable' : 'Enabled';
    const textStatus = active ? 'enabled' : 'disable';

    const handleChangeToggle = (id) => {
        let newItems = items
        newItems.forEach((item) => {
            if (item.id === id) {
                item.isActive = !item.isActive
            }
        })
        setItems([...newItems]);
    }

    const [render, setRender] = useState(true);
    useEffect(() => {
        !render && setRender(true);
    }, [render, checked]);

    return (
        <Page>
            <SettingToggle
                action={{
                    content: contentStatus,
                    onAction: handleToggle,
                }}
                enabled={active}
            >
                The app is{' '}
                <Text variant="bodyMd" fontWeight="bold" as="span">
                    {textStatus}
                </Text>
                .
            </SettingToggle>

            <Layout.Section>
                <div className='text-first'>
                    <div className='text-pixel'>
                        <Text variant="headingMd" as='h2'>Pixel Manager</Text>
                    </div>
                    <div className='btn-add'>
                        <Button>+ Add Pixel</Button>
                    </div>
                </div>
            </Layout.Section>

            <LegacyCard>
                {
                    // render &&
                    <ResourceList
                        resourceName={resourceName}
                        items={items}
                        showHeader
                        renderItem={renderItem}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        bulkActions={!handleCheckStatus('active') ? bulkActions_noActive : !handleCheckStatus('draft') ? bulkActions_noDraf : bulkActions}
                        filterControl={filterControl}
                    />
                }
            </LegacyCard>

            <Layout.Section fullWidth>
                <Pagination
                    hasPrevious
                    onPrevious={() => {
                        console.log('Previous');
                    }}
                    hasNext
                    onNext={() => {
                        console.log('Next');
                    }}
                />
            </Layout.Section>
        </Page>
    )

    function renderItem(item) {
        return (
            <ResourceItem id={item.id}>
                <Stack alignment='center' distribution='equalSpacing'>
                    <span>{item.name}</span>
                    <span>{item.pixel}</span>
                    <span>{item.code}</span>
                    <ToggleSwitch checked={item.isActive} handleChangeToggle={() => handleChangeToggle(item.id)} />
                    <span>{item.edited}</span>
                </Stack>
            </ResourceItem>

        );
    }
}

export default PixelManager