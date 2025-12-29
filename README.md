## Getting Started
---
To run this app you will need:
* A Space-Track account
* A running MySQL Database
* A Schema named space-tracker in MySQL Database

#### Steps

##### 1. Install dependencies    
    npm i

##### 2. Create an <mark>.env.local</mark> using the template:
    URL_USER=<Your Space-Track API username>
    URL_PASS=<Your Space-Track API password>
    DB_USER=<MySQL Database username>  
    DB_PASS=<MySQL Database password> 
    DB_PORT=<MySQL Database port>
    DB_NAME=<MySQL Database schema> 
   

##### 3. Start the applicaiton  

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## SAT-TRACKER

Web app built wit React, Next.JS, Tailwind, React-Flowbite components, using MySQL 8.0.44 for the database. 

Displays a list of current information for Satellites in orbit and subsets alike. Listed info is formatted as TLE (Two Line Element) for each given name. All fields are editable except for object name. 

*Screen shot of Main page:*
![sat-tracker main page](https://github.com/d-pitti/sat-tracker/blob/main/public/Screenshot%20sat-tracker.png)

## API WARNING

* Since the data is coming from an external source, an account will need to be set up in order for the app to run. https://www.space-track.org<br/>

* There are rules for running the api call, *you will lose access and privilages if the rules are not followed!* API's can only be called once every hour for tle's. So please be kind and follow the guidelines.<br/>

* Create an .env for credentials and link with *Config.ts files.<br/> 

## Future TO-DO's 

* Implement robust Authentication wihtin the application
* Implement a mult-tiered user schema database
* restrict some functionality for general users.
* set time limit for API call to max times per day
