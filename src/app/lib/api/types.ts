import { RowDataPacket } from "mysql2";

export interface TleData{
    OBJECT_NAME: string,
    TLE_LINE1: string, 
    TLE_LINE2: string,
}


export interface AccordionItem extends RowDataPacket{
    NAME: string, 
    LINE1: string, 
    LINE2: string
}