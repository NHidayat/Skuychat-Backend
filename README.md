<h1 align="center">ExpressJS - SkuyChat RESTfull API</h1>

SkuyChat is a RESTfull API that provides various features to send / reply to messages in real time. This application is built with express js and socket io. Besides the chat feature, SkuyChat also has other features including location updates, manage friends, manage accounts, and notifications.
[More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-v.2.3.0-black.svg?style=rounded-square)](https://socket.io/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost // Database host
DB_USER = root // Database user
DB_PASSWORD =  Database pasword
DB_NAME= Database name
```

## End Point
You can see the enpoints in the Postman documentation [here](https://documenter.getpostman.com/view/12631524/TVRq25oM)
