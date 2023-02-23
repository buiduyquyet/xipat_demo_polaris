import React, { useCallback, useState } from 'react'
import {
    TextField,
    Filters,
    Button,
    Card,
    ResourceList,
    Avatar,
    ResourceItem,
    Text,
    SettingToggle,
    Page,
    Grid,
    Layout,
    Pagination,
    Columns,
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

    const items = [
        {
            id: 112,
            url: '#',
            name: 'Art To Cart',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            btn: (
                <ToggleSwitch />
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
            name: 'Art To Cart',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            btn: (
                <ToggleSwitch />
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
            name: 'Art To Cart',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            btn: (
                <ToggleSwitch />
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
            name: 'Art To Cart',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            btn: (
                <ToggleSwitch />
            ),
            edited: (
                <>
                    <Button icon={EditMajor} accessibilityLabel="Edit item" />
                    <Button icon={DeleteMinor} accessibilityLabel="Remove item" />
                </>
            ),
        },
    ];

    const promotedBulkActions = [
        {
            content: 'Actions',
            onAction: () => console.log('Todo: implement bulk edit'),
        },
    ];

    const bulkActions = [
        {
            content: 'Set as active',
            onAction: () => console.log('active'),
        },
        {
            content: 'Set as draft',
            onAction: () => console.log('draft'),
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



            <Card>
                <ResourceList
                    resourceName={resourceName}
                    items={items}
                    showHeader
                    renderItem={renderItem}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    promotedBulkActions={promotedBulkActions}
                    bulkActions={bulkActions}
                    filterControl={filterControl}
                />
            </Card>
            {/* <Layout.Section>
                <OptionList />
            </Layout.Section> */}


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
        const { id, url, name, pixel, code, btn, edited } = item;
        return (
            <ResourceItem
                id={id}
            >
                <div className='resource-item' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{name}</span>
                    <span>{pixel}</span>
                    <span>{code}</span>
                    <span>{btn}</span>
                    <span>{edited}</span>
                </div>
            </ResourceItem>

        );
    }

    function disambiguateLabel(key, value) {
        switch (key) {
            case 'taggedWith3':
                return `Tagged with ${value}`;
            default:
                return value;
        }
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === '' || value == null;
        }
    }
}

export default PixelManager
