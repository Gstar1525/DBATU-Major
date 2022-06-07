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

- slots (get, post) - ``` /api/v1/slots ```
- users (post, put) - ``` /api/v1/users ```
- get role (post) - ``` /api/v1/get-role ```

## Client URLs

- login - ``` / ```
- signup - ``` /signup ```
- dashboard - ``` /dashboard ```
- bookslots - ``` /u/[user_id] ```