# StudentCommunity

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

# University-Student-Comminuty(Angular6 with Firebase)
Angular 6 firebase (Authentication and CRUD)
This website made for University Students to share with each other any topic or any experience they get through

## Demo Video
  https://www.youtube.com/watch?v=ZCrmUyi4tXM

## Technologies:
1. Angular6 Firebase 
2. Angularfire2
3. UI Kit framework

## Feactures:
1. SignUp
2. LoginIn
3. LogOut
4. Add New Topic(Add)
5. Update Topic(Edit)
6. Delete Topic

## Firebase Config:
 DO NOT FORGET TO:
 - Create account on firebase
 - Enable Email/Password sign-in
 - Open `/src/environments/environment.ts` and add your Firebase configuration:
 
 ```
 export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
 
 ```

## Running Server:
 DO NOT FORGET TO: 
 Download node-modules   `npm i`
 Run `ng serve`
 Navigate `http://localhost:4200/`
