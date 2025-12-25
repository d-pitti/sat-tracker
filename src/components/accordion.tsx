import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Button } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import pool from "../app/lib/db/db";
import { AccordionItem } from "../app/lib/api/types";

export async function GetAccordionData(){
  const connection = await pool.getConnection();
  try{
    const [rows] = await connection.query<AccordionItem[]>('SELECT OBJECT_NAME, TLE_LINE_ONE, TLE_LINE_TWO FROM satellites ORDER BY OBJECT_NAME ASC;');
    pool.releaseConnection(connection);
    return rows;

  }catch (error) {
    console.error('Database fetch error:', error);
    return []; // Return an empty array on error
  }
};

export async function AccordionComponent(){
    let items: AccordionItem[] = [];

    try{
        items = await GetAccordionData();
    }catch (error){
        console.error('Error fetching accordion data:', error);
    }

    return (
        <Accordion collapseAll className="w-full h-full bg-grey-500">
            {items.map((item) => (
                <AccordionPanel key={item.OBJECT_NAME} className="flex h-full w-full bg-white">
                    <AccordionTitle className="flex items-center bg-white">{item.OBJECT_NAME}</AccordionTitle>
                    <AccordionContent className="flex w-full h-fit justify-center items-center border-2 border-black">
                        <ul className="flex-col w-full h-full">
                            <li className="justify-center items-center text-black">
                                {item.TLE_LINE_ONE}
                            </li>
                            <li className="justify-center items-center text-black">
                                {item.TLE_LINE_TWO}
                            </li>
                        </ul>
                        <Button color="red" pill>
                            Delete <HiOutlineTrash className="ml-2 h-5 w-5" />
                        </Button>
                        
                    </AccordionContent>

                </AccordionPanel>
            ))}
        </Accordion>
    );
};