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