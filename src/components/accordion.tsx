'use client';
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionPanel,
    AccordionTitle,
    Button,
    Alert,
    Modal,
    ModalBody,
    ModalHeader,
    TextInput
} from "flowbite-react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { AccordionItem, FormData } from "../app/lib/api/types";
import { AccordionForm } from "./accordionForm";




export function AccordionClient() {
    const [items, setItems] = useState<AccordionItem[]>([]);
    const [deleted, setDeleted] = useState<AccordionItem[]>([]);
    const [message, setMessage] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [editName, setEditName] = useState('');
    const [editFormData, setEditFormData] = useState<FormData>({ title: '', lineOne: '', lineTwo: '' });


    /****************************Get Data and Load items*****************************/
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

    /**************************** Get object name and delete panel *****************************/
    async function deleteItem(objectName: string) {
        setMessage("Item deleted Successfully!");
        const encodeObject = encodeURIComponent(objectName);
        try {
            const response = await fetch(`/lib/db/${encodeObject}`, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setDeleted((currentItem) => currentItem.filter(item => item.OBJECT_NAME !== objectName.toString()));
            fetchData();
            setTimeout(() => { setMessage(''); }, 3000);

        } catch (error) {
            console.error('There was a problem with the delete operation:', error);
        }
    };

    /**************************** Helpers for setting data on button clicks *****************************/
    const addItem = (newItem: AccordionItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    }

    const editItems = (item: AccordionItem) => {
        setEditName(item.OBJECT_NAME);
        setEditFormData({ title: item.OBJECT_NAME, lineOne: item.TLE_LINE_ONE, lineTwo: item.TLE_LINE_TWO });
    }

    const handleCancel = () => {
        setEditFormData({ title: '', lineOne: '', lineTwo: '' });
        setEditName('');
    }

    /**************************** Get updated data and submit to db *****************************/
    const saveItems = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`/lib/db/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: editFormData.title,
                    lineOne: editFormData.lineOne,
                    lineTwo: editFormData.lineTwo
                }),

            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMessage("Items saved successfully!");
            setEditName('');
            fetchData();
            setEditFormData({ title: '', lineOne: '', lineTwo: '' });
            setTimeout(() => { setMessage(''); }, 3000);


        } catch (error) {
            console.error('There was a problem with the update operation:', error);
        }
    }


    /****************************Get new panel Data and reload items*****************************/
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
                setMessage("Items added successfully!");
                fetchData();
                setOpenModal(false);
                setTimeout(() => { setMessage(''); }, 3000);

            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }



    return (
        <div className="flex z-5 flex-col w-full h-full">
            <div className="flex w-full h-fit p-5 backdrop-blur-xl bg-white/14">
                <div className="z-10 w-1/4 h-fit justify-self-center">
                    {message && <Alert color="info">{message}</Alert>}
                </div>
                <div className="flex w-full justify-end">
                    <Button onClick={() => setOpenModal(true)}>
                        Add New Item <HiPlus className="ml-2 h-5 w-5" />
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

            <div className="flex w-full h-full overflow-y-scroll p-5">
                <Accordion collapseAll className="w-full h-full bg-grey-500">
                    {items.map((item) => (
                        <AccordionPanel key={item.OBJECT_NAME} className="flex h-full w-full bg-white">
                            <AccordionTitle className="flex items-center bg-white">
                                {item.OBJECT_NAME}
                                {deleted ? null : <Alert color="success">Successfully deleted item!</Alert>}
                            </AccordionTitle>
                            <AccordionContent className="flex w-full h-fit justify-center items-center border-2 border-black">
                                {editName === item.OBJECT_NAME ? (
                                    <div className="flex flex-col w-full h-full gap-4">
                                        <form id="formUpdate" onSubmit={saveItems}>
                                            <TextInput
                                                name="TLE_LINE_ONE"
                                                defaultValue={editFormData.lineOne}
                                                onChange={(e) => setEditFormData((prevData) => ({ ...prevData, lineOne: e.target.value }))}
                                                className="w-full"
                                                required
                                            />
                                            <TextInput
                                                name="TLE_LINE_TWO"
                                                defaultValue={editFormData.lineTwo}
                                                onChange={(e) => setEditFormData((prevData) => ({ ...prevData, lineTwo: e.target.value }))}
                                                className="w-full"
                                                required
                                            />

                                            <div className="flex gap-2">
                                                <Button type="submit" color="success" size="sm">Save</Button>
                                                <Button onClick={() => handleCancel()} color="failure" size="sm">Cancel</Button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="flex flex-row justify-around items-center w-full h-full gap-4">
                                        <ul className="flex-col w-full h-full">
                                            <li className="justify-center items-center text-black">
                                                {item.TLE_LINE_ONE}
                                            </li>
                                            <li className="justify-center items-center text-black">
                                                {item.TLE_LINE_TWO}
                                            </li>
                                        </ul>
                                        <div className="flex flex-row justify-center items-center gap-4">
                                            <Button color="blue" pill onClick={() => { editItems(item) }}>
                                                EDIT <HiOutlinePencil className="ml-2 h-5 w-5" />
                                            </Button>
                                            <Button color="red" pill onClick={() => { deleteItem(item.OBJECT_NAME) }}>
                                                Delete <HiOutlineTrash className="ml-2 h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                )
                                }
                            </AccordionContent>

                        </AccordionPanel>
                    ))}
                </Accordion>
            </div>

        </div>
    );
};