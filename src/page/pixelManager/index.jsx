import React, { useCallback, useEffect, useState } from 'react'
import {
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
    ActionList,
    Popover,
    OptionList,
} from '@shopify/polaris';
import { DeleteMinor, EditMajor } from '@shopify/polaris-icons';
import './pixel-manager.scss'
import ToggleSwitch from '../../component/ToggleSwitch';
import ModalComponent from '../../component/Modal';
import FormPixel from '../../component/Form';

const PixelManager = () => {
    const resourceName = {
        singular: '',
        plural: 'by event name',
    };
    const [selectedItems, setSelectedItems] = useState([]);
    const [queryValue, setQueryValue] = useState(null);

    // Modal
    const [open, setOpen] = useState(false);
    const handleOpenModel = () => {
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    // Settting toggle
    const [active, setActive] = useState(false);
    const handleToggle = useCallback(() => setActive((active) => !active), []);
    const contentStatus = active ? 'Disable' : 'Enabled';
    const textStatus = active ? 'enabled' : 'disable';

    // Popover
    const [popoverActive, setPopoverActive] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const indexOfLastPost = currentPage * limit;
    const indexOfFirstPost = indexOfLastPost - limit;

    const [checked, setchecked] = useState(false);

    let newItems = [];
    const [items, setItems] = useState([
        {
            id: 112,
            url: '#',
            name: 'Add to cart',
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
            name: 'Purchase',
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
            name: 'Added payment into',
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
            name: 'Site visits 001',
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
            id: 116,
            url: '#',
            name: 'Site visits 002',
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
            id: 117,
            url: '#',
            name: 'Site visits 003',
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
            id: 118,
            url: '#',
            name: 'Checkout initiated',
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

    const [itemsFilter, setItemsFilter] = useState(items);

    const bulkActions = [
        {
            content: 'Set as active',
            onAction: () => {
                items.forEach((item) => {
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
    const bulkActions_noDraf = [
        {
            content: 'Set as active',
            onAction: () => {
                items.forEach((item) => {
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

    // Pagination
    const currentItems = items.slice(indexOfFirstPost, indexOfLastPost)

    const togglePopoverActive = useCallback(() => setPopoverActive((popoverActive) =>
        !popoverActive
    ), [],);

    const activator = (
        <Button onClick={togglePopoverActive} disclosure="select">{limit}</Button>
    );

    const filterSearch = (text) => {
        const newItems = items.filter((item) => {
            return item.name.includes(text)
        });
        setItemsFilter([...newItems])
    }

    const handleQueryValueChange = (value) => {
        setQueryValue(value)
        filterSearch(value)
    };

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

    const handleChangeToggle = (id) => {
        let newItems = items
        newItems.forEach((item) => {
            if (item.id === id) {
                item.isActive = !item.isActive
            }
        })
        setItems([...newItems]);
    }
    const options = [
        { value: 'all-selected', label: 'All selected' },
        { value: 'Add to cart', label: 'Add to cart' },
        { value: 'Checkout initiated', label: 'Checkout initiated' },
        { value: 'Content view', label: 'Content view' },
        { value: 'Page view', label: 'Page view' },
        { value: 'Purchase', label: 'Purchase' },
    ]
    const [selectedOptions, setSelectedOptions] = useState([]);

    const updateSelection = useCallback((selected) => {
        const newItems = [];
        if (selected.includes("all-selected")) {
            options.forEach((item) => {
                newItems.push(item.value)
            })
            setSelectedOptions([...newItems]);
            filterPixelType(newItems);
        }
        else {
            setSelectedOptions(selected)
            filterPixelType(selected);
        }
    }, [selectedOptions]);

    const handleAccountStatusRemove = useCallback(() => {
        setSelectedOptions([])
        setItemsFilter(items)
    },
        [],);

    const appliedFilters = !isEmpty(selectedOptions)
        ? [{
            key: "taggedWith3",
            // label: "...",
            onRemove: handleAccountStatusRemove,
        }]
        : [];

    const filters = [
        {
            key: 'taggedWith3',
            label: 'Pixel Type',
            filter: (
                <OptionList
                    onChange={updateSelection}
                    options={options}
                    selected={selectedOptions}
                    allowMultiple
                />
            ),
            shortcut: true,
        },
    ];

    const filterPixelType = (selected) => {
        const newItems = []
        items.forEach((item) => {
            if (selected.includes(item.name)) {
                newItems.push(item)
            }
        });
        setItemsFilter(newItems)
    }

    const filterControl = (
        <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleQueryValueChange}
        >
        </Filters>
    );

    const [render, setRender] = useState(true);
    useEffect(() => {
        !render && setRender(true);
        // console.log(selectedOptions)
    }, [render, checked, selectedOptions]);

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
                        <Button onClick={handleOpenModel}>+ Add Pixel</Button>
                        <ModalComponent
                            title="Add Pixel"
                            open={open}
                            onClose={handleCloseModal}
                            content={
                                <>
                                    <FormPixel />
                                </>
                            }
                        />
                    </div>
                </div>
            </Layout.Section>

            <LegacyCard>
                {
                    render &&
                    <ResourceList
                        resourceName={resourceName}
                        items={
                            itemsFilter.filter((item, index) => {
                                return index >= (currentPage - 1) * limit && index < currentPage * limit
                            })
                        }
                        showHeader
                        renderItem={renderItem}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        bulkActions={!handleCheckStatus('active') ? bulkActions_noActive : !handleCheckStatus('draft') ? bulkActions_noDraf : bulkActions}
                        filterControl={filterControl}
                    />
                }
            </LegacyCard>

            <Layout.Section>
                <div className='pagination'>
                    <Stack>
                        <Popover
                            active={popoverActive}
                            activator={activator}
                            autofocusTarget="first-node"
                            onClose={togglePopoverActive}
                        >
                            <ActionList
                                actionRole="menuitem"
                                items={[
                                    {
                                        content: '5',
                                        onAction: () => {
                                            setLimit(5)
                                        },
                                    },
                                    {
                                        content: '10',
                                        onAction: () => {
                                            setLimit(10)
                                        },
                                    },
                                    {
                                        content: '15',
                                        onAction: () => {
                                            setLimit(15)
                                        },
                                    }
                                ]}
                            />
                        </Popover>
                        {
                            limit > items.length ? "" : <Pagination
                                hasPrevious={currentPage > 1}
                                onPrevious={() => {
                                    setCurrentPage(currentPage - 1)
                                }}
                                hasNext={items.length > indexOfLastPost}
                                onNext={() => {
                                    setCurrentPage(currentPage + 1)
                                }}
                            />
                        }
                    </Stack>
                </div>
            </Layout.Section>
        </Page>
    )

    function renderItem(item) {
        return (
            // Sửa lại CSS phần này
            <ResourceItem id={item.id}>
                <Stack alignment='center' distribution='fillEvenly'>
                    <span>{item.name}</span>
                    <span>{item.pixel}</span>
                    <span>{item.code}</span>
                    <ToggleSwitch checked={item.isActive} handleChangeToggle={() => handleChangeToggle(item.id)} />
                    <span>{item.edited}</span>
                </Stack>
            </ResourceItem>

        );
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