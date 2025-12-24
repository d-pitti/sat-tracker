import './envConfig';
import { TleData } from '../api/types';


const params = new URLSearchParams({ identity: process.env.URL_USER!, password: process.env.URL_PASS!});

export async function getCredentials() { 
    const cookieStore = await fetch( 'https://www.space-track.org/ajaxauth/login', {
        method: 'POST', 
        body:params,
    })

    return cookieStore;
}

export async function getJson(){
    const cookieSession = await getCredentials();    
    console.log(cookieSession);

    const results = await fetch('https://www.space-track.org/basicspacedata/query/class/gp/orderby/TLE_LINE0%20asc/predicates/OBJECT_NAME,TLE_LINE1,TLE_LINE2/limit/1000/emptyresult/show', { 
       headers: {
        'Cookie': cookieSession.headers.getSetCookie()[0], 
       }
    });

    console.log(results);
    const data: TleData[] = await results.json();

    return data;
}