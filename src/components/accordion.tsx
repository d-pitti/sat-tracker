'use client';
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Button, Alert, Modal, ModalBody, ModalHeader, Label, TextInput } from "flowbite-react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";
import { AccordionItem, FormData } from "../app/lib/api/types";
import { AccordionForm } from "./accordionForm";


export function AccordionClient() {
    const [items, setItems] = useState<AccordionItem[]>([]);
    const [deleted, setDeleted] = useState<AccordionItem[]>([]);
    const [message, setMessage] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);


    async function fetchData() {
        try {
            const response = await fetch('/lib/db', { method: 'GET' });
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function deleteItem(objectName: string) {
        try {
            const response = await fetch(`/lib/db/${objectName}`, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setDeleted((currentItem) => currentItem.filter(item => item.OBJECT_NAME !== objectName.toString()));
            fetchData();
        } catch (error) {
            console.error('There was a problem with the delete operation:', error);
        }
    };

    const addItem = (newItem: AccordionItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    }

    const editItems = (newItem: AccordionItem) => {
        setItems((items) => items.map(item => item.OBJECT_NAME === newItem.OBJECT_NAME ? newItem : item));
        fetchData();
    }

    const saveItems = async (updatedItem: AccordionItem) => {
        try {
            const response = await fetch(`/lib/db/${updatedItem.OBJECT_NAME}`, {
                method: 'UPDATE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            }); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            editItems(updatedItem);
        } catch (error) {
            console.error('There was a problem with the update operation:', error);
        }
    }

    const handleSubmit = async (data: FormData): Promise<void> => {
        try {
            const response = await fetch('/lib/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    lineOne: data.lineOne,
                    lineTwo: data.lineTwo
                }),
            });

            if (response.ok) {
                const newData: AccordionItem = await response.json();
                addItem(newData);
                fetchData();
                setOpenModal(false);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
        <div className="flex z-5 flex-col w-full h-full">
            <div className="flex w-full h-fit p-5 backdrop-blur-xl bg-white/14">
                <div className="flex w-full justify-end">
                    <Button onClick={() => setOpenModal(true)}>
                        Add New Item
                    </Button>
                    <Modal show={openModal} size="lg" onClose={() => setOpenModal(false)} popup>
                        <ModalHeader />
                        <ModalBody>
                            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                <AccordionForm onAddItem={handleSubmit} />
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
            <div>
                {message && <Alert color="info">{message}</Alert>}
            </div>
            <div className="flex w-full h-full overflow-y-scroll p-5">
                <Accordion collapseAll className="w-full h-full bg-grey-500">
                    {items.map((item) => (
                        <AccordionPanel key={item.OBJECT_NAME} className="flex h-full w-full bg-white">
                            <AccordionTitle className="flex items-center bg-white">
                                {item.OBJECT_NAME}
                                {deleted ? null : <Alert color="success">Successfully deleted item!</Alert>}
                            </AccordionTitle>
                            <AccordionContent className="flex w-full h-fit justify-center items-center border-2 border-black">
                                <ul className="flex-col w-full h-full">
                                    <li className="justify-center items-center text-black">
                                        {item.TLE_LINE_ONE}
                                    </li>
                                    <li className="justify-center items-center text-black">
                                        {item.TLE_LINE_TWO}
                                    </li>
                                </ul>
                                <Button className="mt-4" color="blue" pill onClick={() => { editItems(item.OBJECT_NAME) }}>
                                <Button color="red" pill onClick={() => { deleteItem(item.OBJECT_NAME) }}>
                                    Delete <HiOutlineTrash className="ml-2 h-5 w-5" />
                                </Button>
                            </AccordionContent>

                        </AccordionPanel>
                    ))}
                </Accordion>
            </div>

        </div>
    );
};