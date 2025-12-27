/*****************************************************************/
/*  This form takes new data from add panel modal and sends      */
/*  back new FormData to accordion and then to database.         */
/*                                                               */
/*****************************************************************/

'use client'
import { useState } from "react";
import type { FormData } from "../app/lib/api/types";
import { Button, Label, TextInput } from "flowbite-react";


interface AccordionFormProps {
    readonly onAddItem: (data: FormData) => Promise<void>;
}

export function AccordionForm({ onAddItem }: AccordionFormProps) {
    const [title, setTitle] = useState<string>('');
    const [lineOne, setLineOne] = useState<string>('');
    const [lineTwo, setLineTwo] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data: FormData = {
            title: formData.get('title') as string,
            lineOne: formData.get('lineOne') as string,
            lineTwo: formData.get('lineTwo') as string,
        };
        await onAddItem(data);
        setTitle('');
        setLineOne('');
        setLineTwo('');
        form.reset();
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" key={title}>
                <div>
                    <Label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</Label>
                    <TextInput type="text" key={title} id="title" name="title" defaultValue={title} required placeholder="Enter title" />
                </div>
                <div>
                    <Label htmlFor="lineOne" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Line One</Label>
                    <TextInput type="text" id="lineOne" name="lineOne" defaultValue={lineOne} required placeholder="Enter TLE Line 1" />
                </div>
                <div>
                    <Label htmlFor="lineTwo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Line Two</Label>
                    <TextInput type="text" id="lineTwo" name="lineTwo" defaultValue={lineTwo} required placeholder="Enter TLE Line 2" />
                </div>
            <Button type="submit" pill color="blue">Add Item</Button>
        </form>
    );
}   