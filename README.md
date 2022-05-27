# Vouch Digital Node.js Development Task

## Contact Details

    Name: Karthikeya Bethu
    email: karthikeyabethu01@gmail.com
            karthikeya.b20@iiits.in
    phonenumber: 9492484369

---

## Steps to run the application

    ### requirements
    1. node
    2. mongodb
    3. you also need to create a .env file in the project folder (VdNodejsTask)
        with two varibles DATABASE and SECRET

---

### steps

1. open the project folder (VdNodejsTask) in terminal
2. run in the terminal
   `npm install`
   to install all the dependencies
3. run the following command to start the server
   `npm start`
4. You should see in the console
   ` app is running at 3000 db connected `
   If you see above message the REST api is up and running.

---

## api requests

You can install REST client a VS code extension and use the request.rest file in project or services like post man to make request to the api.

1. ### signup

   First you need to signup with email and password, example

   ```
   POST http://localhost:3000/api/signup
   Content-Type: application/json

   {
       "email": "karthikeyabethu01@gmail.com",
       "password": "12345"
   }
   ```

2. ### signin

   Next you need to signin with your account to get the token

   ```
   POST http://localhost:3000/api/signin
   Content-Type: application/json

   {
       "email": "karthikeyabethu01@gmail.com",
       "password": "12345"
   }
   ```

   **no need to pass the token for every request as header as it is set as cookie and cookie-parser is used to extract the token**

3. ### Add single contact

   To add single contact

   ```
   POST http://localhost:3000/api/contact/add
   Content-Type: application/json

   {
       "firstname": "karthikeya",
       "lastname": "Bethu",
       "phonenumber": 9492484369,
       "addressline1": "address line 1 test",
       "addressline2": "address line 2 test",
       "city": "test city",
       "state": "test state",
       "pincode": 500000
   }
   ```

4. ### Add bulk contacts

   to add bulk contacts you need send an object that contain array of contacts with variable name as contacts as shown below

   ```
   POST http://localhost:3000/api/contact/addbulk
   Content-Type: application/json

   {
       "contacts": [
       {
           "firstname": "Test fname 0",
           "lastname": "Test lname 0",
           "phonenumber": 9492484369,
           "addressline1": "address line 1 test",
           "addressline2": "address line 2 test",
           "city": "test city",
           "state": "test state",
           "pincode": 520000
       },
       {
           "firstname": "Test fname 1",
           "lastname": "Test lname 1",
           "phonenumber": 9492484369,
           "addressline1": "address line 1 test",
           "addressline2": "address line 2 test",
           "city": "test city",
           "state": "test state",
           "pincode": 500000
       },
       {
           "firstname": "Test fname 2",
           "lastname": "Test lname 2",
           "phonenumber": 9492484369,
           "addressline1": "address line 1 test",
           "addressline2": "address line 2 test",
           "city": "test city 2",
           "state": "test state 2",
           "pincode": 520000
       },
       {
           "firstname": "Test fname 3",
           "lastname": "Test lname 3",
           "phonenumber": 9492484369,
           "addressline1": "address line 3 test",
           "addressline2": "address line 3 test",
           "city": "test city 3",
           "state": "test state 3",
           "pincode": 520000
       }
       ]
   }
   ```

5. ### get a single contact with \_id

   **Don't forget change and pass the id in the request that is present in you Database**

   ```
   GET http://localhost:3000/api/contact/628f1b171385eb90801b64b7
   ```

6. ### get contacts with pagination and limit

   ```
   GET http://localhost:3000/api/contact?page=1&limit=3
   ```

7. ### To get contacts with paginationation, limit and filter by object

   example

   ```
   GET http://localhost:3000/api/contact?page=1&limit=3&match={"firstname":"karthikeya"}

   ```

8. ### To Update a contact id

   ```
   PUT http://localhost:3000/api/contact/62908b9ddebd7dfac4cdc748
   ```

9. ### To Delete a contact with id

   ```
   DELETE http://localhost:3000/api/contact/62908b9ddebd7dfac4cdc749
   ```

10. ### signout

    to sigout from the server

    ```
    GET  http://localhost:3000/api/signout
    ```
