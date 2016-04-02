![alt text][logo]
[logo]: http://johnmalcolmdesign.com/perfect_incentive_color.svg "Perfect Incentive Logo"

# Perfect Incentive Cross Platform App

Perfect Incentive allows SME's and corporates to incentivise their staff and customers with prepaid debit cards that they can spend anywhere.
Tax free incentives* that can be: Occasional, Bespoke, Instant or Ongoing. 

## About

### Rebrand

The app is part of an ongoing rebrand project which I am driving and includes:
- Web Sites
- Web Apps
- Mobile Apps
- Credit Cards
- Product Packaging 
- Gift Cards
- Social Media & Email Marketing

All fonts, iconography, imagery and sizing within the app are consistent with the style guides in development. 

[See here for rebrand designs concepts]( https://projects.invisionapp.com/boards/9Z1FO774Y5FJW/)

### Technologies
Cross platform app written in Javascript.

- **Visual Studio 2015**: Provides debugging and templating out of the box for Ionic and although I used it for this project any IDE that supports Javascript can be used, and Ionic commands can be run via the terminal.
- **Ionic**: Style normalisation with Bootsrap & Ionic scss. SPA MVC code structure with AngularJS.
- **Cordova**: Compiles app and provides hooks into underlying device OS. App sits in Webview present on all mobile devices.
- **NPM**: Back end package manager.
- **Bower**: Client Side package manager.
- **Gulp**: Build tool. Used for compiling sass and performing live reload.
- **Git**: Version Control.
- **ASP.NET MVC 5**: Server side code - not written by me although I had to do some work on the server side in order to get the endpoints for my app working correctly (mostly CORS and SSL issues).

## Files
This is a list of the most imporant files in the application.

### JS
- js/app.js - Global app decleration and configuration, includes route configuration, onrun() method and global variables. 
- js/controllers.js - Contains the controller for each of the views in the app.
- js/services.js - REStfull user service file used for client authentication and endpoint communication.

### HTML & SASS
- index.html - App template, code which is global to each view.
- views/login.html - Inital app login page.
- views/intro.html - How to use app.
- views/home.html - Home screen once app is closed down and user re-enters app.
- views/my-cards.html - Card Management.
- views/sign-up.html - New user registration.
- views/edit-profile.html - Edit profile view.
- scss/ionic.app.scss - Stylesheet used for all custom styles.

## Issues
-  

## Mobile Apps Development Project 


*Tax and PRSI free up to €500.00.
