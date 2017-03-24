# THESIS IT (version 4)

## Details
* Website: [Thesis IT v4](https://thesis-it.herokuapp.com) . (If not working, try the [Thesis IT testsite](https://thesis-really-it.herokuapp.com) instead)
* Facebook page: [Thesis IT](https://www.facebook.com/ThesisReallyIt)
* A Node.JS CRUD web application of Student Theses repository upgraded with  `Form Wizard` ,  `Tags` ,  `Search by Tags & Year` ,  `Passport Facebook` ,  `Facebook Plugins` ,  `File Upload` ,  `division by Department` , and  `updated Admin capabilities` .

## Versions
* Github Repo:
	> master   [Thesis IT v1](https://github.com/fbvillasanta/coen3463-m3t5)
	> module-4 [Thesis IT v2](https://github.com/fbvillasanta/coen3463-m3t5/tree/module-4)
	> module-5 [Thesis IT v3](https://github.com/fbvillasanta/coen3463-m3t5/tree/module-5)

* Websites:
	> [Thesis IT v1](https://coen3463-m3t5.herokuapp.com) without login but with ADD, EDIT, DELETE, and READ entry capabilities.
	> [Thesis IT v2](https://coen3463-m4t5.herokuapp.com) with login, registration, admin dashboard.
	> [Thesis IT v3](https://coen3463-m5t5.herokuapp.com) with search by thesis title, and uses mongoose restify

## Prerequisites
* [Node.js](https://nodejs.org/en/) installed.
* [MongoDB](https://www.mongodb.com/) installed.
* [Facebook Application](https://developers.facebook.com) ID with webhooks.
* [Filestack](https://filestack.com) API key.
* [Email](https://mail.google.com) account.

## Optional
* [Git](https://git-scm.com/downloads) tools installed.
* [Nodemon](https://nodemon.io/) installed globally.

## Installation
* Clone or download this repository.
* Navigate to the project directory.
* Install node modules.
```
	> $ npm install
```
* Start the MongoDB Server by navigating to the installation folder of MongoDB on your device and opening the file:
```
	> mongod.exe
``` 
* Wait for this message to show:
```
	> ... waiting for connections on port 27017
``` 
* On the same folder run the file:
```
	> mongo.exe
```
* On the mongo.exe terminal, create a new database by typing:
```
	> use thesisIt
```
* Open email.js file inside the config folder and replace with your email credentials.
```
	> 'email': 'PLACE YOUR EMAIL ADDRESS HERE',
	> 'password': 'PLACE THE PASSWORD FOR THAT EMAIL'
```
* Open passport.js file inside the config folder and replace the facebookAuth object with your app credentials.
```
	> 'clientID': 'YOUR FACEBOOK APP ID GOES HERE',
	> 'clientSecret': 'YOUR FACEBOOK APP SECRET KEY GOES HERE',
	> 'callbackURL': 'PLACE THE CALLBACK URL FOR YOUR WEBSITE FACEBOOK AUTH'
```
* Replace the Facebook App ID inside the file views/layout.jade
```
	> FB.init({
	> 	appId      : 'YOUR FACEBOOK APP ID',
	> 	xfbml      : true,
	> 	version    : 'THE VERSION USED BY THE FACEBOOK APP'
	> });
```
* Update the Filestack API key by modifying the file public/javascripts/api/api.js
```
	> filepicker.setKey("REPLACE THIS WITH YOUR OWN KEY");
```
* Open another terminal or cmd and run 'www' file inside the bin directory in 3 ways:
	1. ``` $ node ./bin/www ```
	2. ``` $ npm start ```
	3. ``` $ nodemon ```

* Open a browser and visit ```localhost:3000```.
* Signup to create an account.
* Manually update account type to ``` "admin" ``` to have admin privileges.

## Credits
* [FreeHTML5.co](https://freehtml5.co/)
* [Colorlib](https://colorlib.com/)