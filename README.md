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

## Getting Started

#### ***A local instance of MySQL will need to be installed in order to run the app*** 
<br>
<br>
<br>
<br>
First, create a .env.local file in the root of the project with the following variables:

##### localhost or static ip of local machine
DB_HOST=<value> 

##### Port for your MyQSL DB (Default port is 3306) 
DB_PORT=<value>

##### Your DB username and password
DB_USER=<value>  
DB_PASS=<value> 

##### Your DB SCHEMA name, not table name
DB_NAME=<value> 

##### Your username and password for Space-Track.org
URL_USER= <value> 
URL_PASS= <value>

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
