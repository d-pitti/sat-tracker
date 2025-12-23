import './envConfig';
import { NextResponse } from "next/server";

const params = new URLSearchParams({ identity: process.env.URL_USER!, password: process.env.URL_PASS!});

export async function getCredentials() { 
    const cookieStore = await fetch( 'https://www.space-track.org/ajaxauth/login', {
        method: 'POST', 
        body:params,
    })

    return cookieStore;
}

export async function GET(){
    const cookieSession = await getCredentials();    
    console.log(cookieSession);

    const results = await fetch('https://www.space-track.org/basicspacedata/query/class/gp/orderby/TLE_LINE0%20asc/limit/1000/emptyresult/show', { 
       headers: {
        'Cookie': cookieSession.headers.getSetCookie()[0], 
       }
    });
    const data =await results.json();

    return NextResponse.json({data});
}