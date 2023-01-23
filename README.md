# Token - A Universal Booking App for every business

Token is for slot bookings and get tokens anywhere and anytime. It can be used by any businesses or intuitions, whoever wants to implement a booking system, whether they are small or well established, there customers can easily do bookings without visiting the place.
	
Token contains feature for businesses or intuitions to register themselves. People can watch available time slots and book them. 

<br/>

## Tech Stack

- ### Frontend : React, CSS
- ### Backend : ExpressJS, NodeJS
- ### Cloud Service : Firebase

<br/>


## Screenshots

- ### Login Page
![Login](https://user-images.githubusercontent.com/52004037/214092683-d3e79095-bd1a-4b7b-b86a-fbbaf9be0579.png)

<br/>

- ### Signup Page
![Signup](https://user-images.githubusercontent.com/52004037/214092785-47347047-cdcf-4718-a9d5-b35f3610f91f.png)

<br/>

- ### Customer Dashboard
![Customer Dashboard](https://user-images.githubusercontent.com/52004037/214092899-125addd1-6456-4a23-a3a0-a9a610765374.png)

<br/>

- ### Business Dashboard
![Business Dashboard](https://user-images.githubusercontent.com/52004037/214092959-c9dcff2b-a78c-445f-9d7d-421cf4452e09.png)

<br/>

- ### Add New Slots
![Add Slot](https://user-images.githubusercontent.com/52004037/214093015-f0b153ee-a603-44ab-9749-4780302a7b69.png)

<br/>

- ### Profile Menu
![menu](https://user-images.githubusercontent.com/52004037/214093086-248db889-e46f-4296-934f-d0401b8ec85f.png)

<br/>

- ### Booking Reciept
![Reciept](https://user-images.githubusercontent.com/52004037/214093150-4625f49a-12a8-4c4f-9b98-e79760f7fb76.png)

<br/>

- ### Profile Settings
![settings](https://user-images.githubusercontent.com/52004037/214093196-dff3c3d2-b0a8-49c3-a555-d9be9275fbe7.png)

<br/>

- ### Search
![search](https://user-images.githubusercontent.com/52004037/214093260-bdd7f7ae-b778-4855-a388-fd1d2420b15e.png)

<br/>

- ### Booking Terminal
![Booking Terminal](https://user-images.githubusercontent.com/52004037/214093313-be9d74d3-9af5-40eb-bd8a-29be0a1baa3b.png)

<br/>

<br/>

## Architecutral Diagrams

- ### Use Case Diagrams
![Use Case Diagram](https://user-images.githubusercontent.com/52004037/214093380-8cf2a135-185c-426e-a901-5de76a7d2e74.png)

<br/>

- ### Dataflow Diagrams
![Data flow Diagram](https://user-images.githubusercontent.com/52004037/214093421-770c6430-4290-46ec-a012-199dcc45532e.png)

<br/>

## Steps to run project in development mode
- setup firebase console and add firebase service key to
```src/api/firebase-service.js```.<br>
[Follow these steps to setup firebase console and download the key](https://firebase.google.com/docs/web/setup)

- setup firebase service account and add firebase admin key to
```src/service-account-file.json```.<br>
[Follow these steps to setup firebase service account and download the key](https://cloud.google.com/docs/authentication/getting-started)

- install dependecies by running the following command in client and server folders.

```bash
npm install
```

- run server by running the following command in server folder.

```bash
npm run dev
```

- run client by running the following command in client folder.

```bash
npm run start
```

- client will run on port 3000 and sever will run on port 5000.

## API routes

- slots
    - create slot (post) - ``` /api/v1/slots ```
    - read slots (post) - ``` /api/v1/get-slots ```
    - update slot (put) - ``` /api/v1/put-slot ```
    - delete slot (delete) - ``` /api/v1/delete-slot ```

</br>

- users 
    - create user (post) - ``` /api/v1/users ```
    - update user role (put) - ``` /api/v1/users ```
    - read user role (post) - ``` /api/v1/get-role ```

</br>

- businesses 
    - read businesses (get) - ``` /get-businesses ```
    - read businesses by id (post) - ``` /get-businesses-by-id ```

## Client URLs

- login - ``` / ```
- signup - ``` /signup ```
- dashboard - ``` /dashboard ```
- bookslots - ``` /u/[user_id] ```
- search - ``` /search ```
