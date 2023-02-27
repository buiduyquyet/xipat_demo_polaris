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

    const handleChangeToggle = () => {
        setchecked(!checked);
    }

    const [items, setItems] = useState([
        {
            id: 112,
            url: '#',
            name: 'Art To Cart 112',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            isActive: false,
            btn: (
                <ToggleSwitch
                    checked={checked}
                    onChangeToggle={handleChangeToggle}
                />
            ),
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
            btn: (
                <ToggleSwitch
                    checked={checked}
                    onChangeToggle={handleChangeToggle}
                />
            ),
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
            btn: (
                <ToggleSwitch
                    checked={checked}
                    onChangeToggle={handleChangeToggle}
                />
            ),
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
            btn: (
                <ToggleSwitch
                    checked={checked}
                    onChangeToggle={handleChangeToggle}
                />
            ),
            edited: (
                <>
                    <Button icon={EditMajor} accessibilityLabel="Edit item" />
                    <Button icon={DeleteMinor} accessibilityLabel="Remove item" />
                </>
            ),
        },
    ]);

    console.log("Items: ", items)

    const bulkActions = [
        {
            content: 'Set as active',
            onAction: () => {
                // console.log("Select Item: >>", selectedItems)
                let newItems = [];

                items.map((item) => {
                    if (selectedItems.includes(item.id)) {
                        // item.isActive = true
                        item.btn = (
                            <ToggleSwitch
                                checked={true}
                                onChangeToggle={handleChangeToggle}
                            />
                        )
                    }
                    newItems.push(item)
                })
                console.log("New Items", newItems)
                setItems([...newItems])
            },
        },
        {
            content: 'Set as draft',
            onAction: () => {
                console.log("draft")
            },
        },
        {
            content: 'Delete pixel',
            onAction: () => console.log('delete'),
        },
    ];

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
    useEffect(() => {
        console.log("Items: ", items)
    }, [items])

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
                <ResourceList
                    resourceName={resourceName}
                    items={items}
                    showHeader
                    renderItem={renderItem}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    bulkActions={bulkActions}
                    filterControl={filterControl}
                />
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
        const { id, name, pixel, code, isActive, btn, edited } = item;
        return (
            <ResourceItem id={id}>
                <Stack alignment='center' distribution='equalSpacing'>
                    <span>{name}</span>
                    <span>{pixel}</span>
                    <span>{code}</span>
                    <span>{btn}</span>
                    <span>{edited}</span>
                </Stack>
            </ResourceItem>

        );
    }
}

export default PixelManager
