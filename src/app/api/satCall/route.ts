import { NextResponse } from "next/server";


export async function GET(){
    const results = await fetch('https://www.space-track.org/basicspacedata/query/class/gp/orderby/TLE_LINE0%20asc/limit/1000/emptyresult/show');
    const data =await results.json();

    return NextResponse.json({data});
}