# Token - A Universal Booking App for every business

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