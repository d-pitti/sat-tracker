import { NextRequest, NextResponse } from "next/server";
import pool from "../db";


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ objectName: string }> }){
    const {objectName} = await params;
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM satellites WHERE OBJECT_NAME = (?);', [objectName]);
        pool.releaseConnection(connection);    
        return NextResponse.json({ message: `Item with OBJECT_NAME ${objectName} deleted successfully.` }, { status: 200 });
    } catch (error) {
        console.error('Error deleting item:', error);
        return NextResponse.json({ message: 'Error deleting item.' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
  
  const connection = await pool.getConnection();
    try {
      const { title, lineOne, lineTwo } = await request.json();
      const TLE_LINE1 = lineOne;
      const TLE_LINE2 = lineTwo;
      const OBJECT_NAME = title;
      await connection.query(
        'UPDATE satellites SET TLE_LINE_ONE = ?, TLE_LINE_TWO = ? WHERE OBJECT_NAME = ?',
        [TLE_LINE1, TLE_LINE2, OBJECT_NAME]
      );
      pool.releaseConnection(connection);
      return NextResponse.json({ message: 'Item updated successfully.' });
    } catch (error) {
      console.error('Database update error:', error);
      return NextResponse.json({ message: 'Error updating item.' }, { status: 500 });
    } 
};