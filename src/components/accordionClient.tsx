'use client';
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Button, Alert } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import { AccordionItem } from "../app/lib/api/types";


export function AccordionClient() {
    const [items, setItems] = useState<AccordionItem[]>([]);
    const [deleted, setDeleted] = useState<AccordionItem[]>([]);
    
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


    return (
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
                        
                        <Button color="red" pill onClick={() => {deleteItem(item.OBJECT_NAME)}}>
                            Delete <HiOutlineTrash className="ml-2 h-5 w-5" />
                        </Button>
                    </AccordionContent>

                </AccordionPanel>
            ))}
        </Accordion>
    );
};