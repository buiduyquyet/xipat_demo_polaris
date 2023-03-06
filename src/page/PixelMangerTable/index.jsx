import React, { useCallback, useState } from 'react'
import {
    TextField,
    IndexTable,
    LegacyCard,
    Filters,
    Select,
    useIndexResourceState,
    Text,
    Button,
    Stack,
    Page,
    OptionList,
} from '@shopify/polaris';
import { DeleteMinor, EditMajor } from '@shopify/polaris-icons';
import './pixel-manager-table.scss'

const PixelManagerTable = () => {
    const customers = [
        {
            id: '0001',
            url: '#',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
            orders: 20,
            amountSpent: '$2,400',
            action: (
                <Stack distribution='center'>
                    <Button icon={EditMajor} accessibilityLabel="Edit item" />
                    <Button icon={DeleteMinor} accessibilityLabel="Remove item" />
                </Stack>
            )
        },
        {
            id: '0002',
            url: '#',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
            orders: 30,
            amountSpent: '$140',
            action: (
                <Stack distribution='center'>
                    <Button icon={EditMajor} accessibilityLabel="Edit item" />
                    <Button icon={DeleteMinor} accessibilityLabel="Remove item" />
                </Stack>
            )
        },
    ];
    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(customers);
    const [queryValue, setQueryValue] = useState(null);
    const [sortValue, setSortValue] = useState('today');

    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);

    const handleClearAll = useCallback(() => {
        handleQueryValueRemove();
    }, [handleQueryValueRemove]);

    const handleSortChange = useCallback((value) => setSortValue(value), []);

    const bulkActions = [
        {
            content: 'Add tags',
            onAction: () => console.log('Todo: implement bulk add tags'),
        },
        {
            content: 'Remove tags',
            onAction: () => console.log('Todo: implement bulk remove tags'),
        },
        {
            content: 'Delete customers',
            onAction: () => console.log('Todo: implement bulk delete'),
        },
    ];

    // Option List
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'all-selected', label: 'All selected' },
        { value: 'Add to cart', label: 'Add to cart' },
        { value: 'Checkout initiated', label: 'Checkout initiated' },
        { value: 'Content view', label: 'Content view' },
        { value: 'Page view', label: 'Page view' },
        { value: 'Purchase', label: 'Purchase' },
    ]

    const handleChangOptionList = (selected) => {
        setSelectedOptions(selected)
    }

    const filters = [
        {
            key: 'pixelType',
            label: 'Pixel Type',
            filter: (
                <OptionList
                    options={options}
                    selected={selectedOptions}
                    onChange={handleChangOptionList}
                    allowMultiple
                />
            ),
            shortcut: true,
        },
    ];

    // const appliedFilters = !isEmpty(taggedWith)
    //     ? [
    //         {
    //             key: 'taggedWith',
    //             label: disambiguateLabel('taggedWith', taggedWith),
    //             onRemove: handleTaggedWithRemove,
    //         },
    //     ]
    //     : [];

    const sortOptions = [
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Last 7 days', value: 'lastWeek' },
    ];

    const rowMarkup = customers.map(
        ({ id, name, location, orders, amountSpent, action }, index) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {name}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{location}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Text variant="bodyMd" as="span" alignment="end" numeric>
                        {orders}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Text variant="bodyMd" as="span" alignment="end" numeric>
                        {amountSpent}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {action}
                </IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    return (
        <Page>
            <LegacyCard>
                <div style={{ padding: '16px', display: 'flex' }}>
                    <div style={{ flex: 1 }}>
                        <Filters
                            queryValue={queryValue}
                            filters={filters}
                            // appliedFilters={appliedFilters}
                            onQueryChange={setQueryValue}
                            onQueryClear={handleQueryValueRemove}
                            onClearAll={handleClearAll}
                        />
                    </div>
                    <div style={{ paddingLeft: '0.25rem' }}>
                        <Select
                            labelInline
                            label="Sort by"
                            options={sortOptions}
                            value={sortValue}
                            onChange={handleSortChange}
                        />
                    </div>
                </div>
                <IndexTable
                    resourceName={resourceName}
                    itemCount={customers.length}
                    selectedItemsCount={
                        allResourcesSelected ? 'All' : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    hasMoreItems
                    bulkActions={bulkActions}
                    lastColumnSticky
                    headings={[
                        { title: 'Name' },
                        { title: 'Location' },
                        {
                            id: 'order-count',
                            title: (
                                <Text
                                    as="span"
                                    variant="bodySm"
                                    fontWeight="medium"
                                    alignment="end"
                                >
                                    Order count
                                </Text>
                            ),
                        },
                        {
                            id: 'amount-spent',
                            hidden: false,
                            title: (
                                <Text
                                    as="span"
                                    variant="bodySm"
                                    fontWeight="medium"
                                    alignment="end"
                                >
                                    Amount spent
                                </Text>
                            ),
                        },
                        {
                            title: (
                                <Text
                                    as='h5'
                                    variant='bodySm'
                                    fontWeight='medium'
                                    alignment='center'
                                >
                                    Action
                                </Text>
                            )
                        }
                    ]}
                >
                    {rowMarkup}
                </IndexTable>
            </LegacyCard>
        </Page>
    );

    function disambiguateLabel(key, value) {
        switch (key) {
            case 'taggedWith':
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

export default PixelManagerTable
