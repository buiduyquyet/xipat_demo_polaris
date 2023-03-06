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
    Columns,
    Checkbox,
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
    const [queryValue, setQueryValue] = useState('');
    const [checkedAll, setCheckedAll] = useState(true);
    const [render, setRender] = useState(true);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);
    const [popoverActive, setPopoverActive] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [editID, setEditID] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
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
        },
        {
            id: 113,
            url: '#',
            name: 'Purchase',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            isActive: false,
        },
        {
            id: 114,
            url: '#',
            name: 'Added payment into',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            isActive: false,
        },
        {
            id: 115,
            url: '#',
            name: 'Site visits 001',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            isActive: false,
        },
        {
            id: 116,
            url: '#',
            name: 'Site visits 002',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            isActive: false,
        },
        {
            id: 117,
            url: '#',
            name: 'Site visits 003',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            isActive: false,
        },
        {
            id: 118,
            url: '#',
            name: 'Checkout initiated',
            pixel: 'Pixel 1',
            code: "tw-odaxb-oddhg",
            isActive: false,
        },
    ]);
    const [itemsFilter, setItemsFilter] = useState(items);

    const contentStatus = active ? 'Disable' : 'Enabled';
    const textStatus = active ? 'enabled' : 'disable';
    const options = [
        // { value: 'all-selected', label: 'All selected' },
        { value: 'Add to cart', label: 'Add to cart' },
        { value: 'Checkout initiated', label: 'Checkout initiated' },
        { value: 'Content view', label: 'Content view' },
        { value: 'Page view', label: 'Page view' },
        { value: 'Purchase', label: 'Purchase' },
    ];

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

    // Modal
    const handleOpenModel = () => {
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    // Settting toggle
    const handleToggle = useCallback(() => setActive((active) => !active), []);

    const indexOfLastPost = currentPage * limit;

    const togglePopoverActive = useCallback(() => setPopoverActive((popoverActive) =>
        !popoverActive
    ), [],);

    const activator = (
        <Button onClick={togglePopoverActive} disclosure="select">{limit}</Button>
    );

    // Base Search & Filter
    const baseSearch = (items, value) => {
        return items.filter((item) => {
            return item.name.toLowerCase().includes(value.toLowerCase())
        });
    }

    const baseFilter = (items, value) => {

        return items.filter((item) => {
            return value.includes(item.name)
        })
    }

    const filterSearch = (text) => {
        setCurrentPage(1);
        let newItems = baseSearch(items, text);
        if (!isEmpty(selectedOptions)) {
            newItems = baseFilter(newItems, selectedOptions);
            setItemsFilter([...newItems])
        }
        else {
            setItemsFilter([...newItems])
        }
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

    // Hàm cập nhật select
    const updateSelection = (selected) => {
        selected.length === 0 ? setCheckedAll(true) : setCheckedAll(false)
        setSelectedOptions(selected)
        filterPixelType(selected);
    };

    const filterPixelType = (selected) => {
        let newItems = []
        if (isEmpty(selected) && queryValue !== "") {
            newItems = baseSearch(items, queryValue);
            setItemsFilter(newItems)
        } else {
            items.forEach((item) => {
                if (selected.includes(item.name)) {
                    newItems.push(item)
                }
            });
            newItems = baseSearch(newItems, queryValue);
            setItemsFilter(newItems)
        }
    }

    const handleClearPixelType = useCallback(() => {
        setSelectedOptions([])
        setItemsFilter(items)
    }, [],);

    const appliedFilters = !isEmpty(selectedOptions)
        ? [{
            key: "pixelType",
            onRemove: handleClearPixelType,
        }] : '';

    const handleChangeAll = (newChecked) => {
        setCheckedAll(newChecked);
        setItemsFilter(items)
        setSelectedOptions([]);
    };

    const filters = [
        {
            key: 'pixelType',
            label: 'Pixel Type',
            filter: (
                <>
                    <Checkbox
                        label="All Selected"
                        checked={checkedAll}
                        onChange={handleChangeAll}
                    />
                    <OptionList
                        onChange={updateSelection}
                        options={options}
                        selected={selectedOptions}
                        allowMultiple
                    />
                </>
            ),
            shortcut: true,
        },
    ];

    const filterControl = (
        <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleQueryValueChange}
        >
        </Filters>
    );

    const handleEditPixel = (id) => {
        setOpen(true);
        setEditID(id);
    }

    const handleDeletePixel = (id) => {
        const newItems = items.filter((item) => item.id !== id)
        console.log(newItems)
        setItemsFilter([...newItems])
    }

    useEffect(() => {
        !render && setRender(true);
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
                            title={editID === '' ? "Add Pixel" : "Edit Pixel"}
                            open={open}
                            onClose={handleCloseModal}
                            content={
                                <>
                                    <FormPixel id={editID} onClose={handleCloseModal} items={itemsFilter} setItems={setItemsFilter} />
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
                                hasNext={itemsFilter.length > indexOfLastPost}
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
            <ResourceItem id={item.id}>
                <Columns columns={{ xs: '1fr 1fr 1fr 1fr 0.5fr' }}>
                    <Text>{item.name}</Text>
                    <Text>{item.pixel}</Text>
                    <Text>{item.code}</Text>
                    <ToggleSwitch
                        checked={item.isActive}
                        handleChangeToggle={() => handleChangeToggle(item.id)}
                    />
                    <Stack spacing='extraTight'>
                        <Button
                            icon={EditMajor}
                            onClick={() => handleEditPixel(item.id)}
                            accessibilityLabel="Edit item" />
                        <Button
                            icon={DeleteMinor}
                            onClick={() => handleDeletePixel(item.id)}
                            accessibilityLabel="Remove item" />
                    </Stack>
                </Columns>
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