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
};


