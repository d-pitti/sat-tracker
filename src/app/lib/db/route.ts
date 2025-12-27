import { NextRequest, NextResponse } from "next/server";
import pool from "./db";
import { AccordionItem } from "../api/types";


export async function GET(request: NextRequest) {
   const connection = await pool.getConnection();
   try{
      const [rows] = await connection.query<AccordionItem[]>('SELECT OBJECT_NAME, TLE_LINE_ONE, TLE_LINE_TWO FROM satellites ORDER BY OBJECT_NAME ASC;');
      pool.releaseConnection(connection);
      return NextResponse.json(rows);

    }catch (error) {
      console.error('Database fetch error:', error);
      return NextResponse.json({ message: 'Error updating item.' }, { status: 500 }); // Return an empty array on error
    }
}

export async function POST(request: NextRequest) {
  const connection = await pool.getConnection();
    try {
      const { title, lineOne, lineTwo } = await request.json();
      const TLE_LINE1 = lineOne;
      const TLE_LINE2 = lineTwo;
      const OBJECT_NAME = title; 
      await connection.query(
        'INSERT INTO satellites (OBJECT_NAME, TLE_LINE_ONE, TLE_LINE_TWO) VALUES (?, ?, ?)',
        [OBJECT_NAME, TLE_LINE1, TLE_LINE2]
      );
      pool.releaseConnection(connection);
      return NextResponse.json({ message: 'Item added successfully.' });
    } catch (error) {
      console.error('Database insert error:', error);
      return NextResponse.json({ message: 'Error adding item.' }, { status: 500 });
    }
 
};


export async function PUT(request: NextRequest) {
  
  const connection = await pool.getConnection();
    try {
      const { title, lineOne, lineTwo } = await request.json();
      const TLE_LINE1 = lineOne;
      const TLE_LINE2 = lineTwo;
      const OBJECT_NAME = title;    
      await connection.query(
        'UPDATE satellites SET TLE_LINE_ONE = (?), TLE_LINE_TWO = (?) WHERE OBJECT_NAME = (?)',
        [TLE_LINE1, TLE_LINE2, OBJECT_NAME]
      );
      pool.releaseConnection(connection);
      return NextResponse.json({ message: 'Item updated successfully.' });
    } catch (error) {
      console.error('Database update error:', error);
      return NextResponse.json({ message: 'Error updating item.' }, { status: 500 });
    } 
};
