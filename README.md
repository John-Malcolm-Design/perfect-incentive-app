![alt text][logo]
[logo]: http://johnmalcolmdesign.com/perfect_incentive_color.svg "Perfect Incentive Logo"

# Perfect Incentive Cross Platform App

[![Node version](https://img.shields.io/npm/v/npm.svg?style=flat)](http://nodejs.org/download/)
[![Bower version](https://img.shields.io/bower/v/bootstrap.svg?style=flat)](http://bower.io/#install-bower)


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

## Running Project
### Visual Studio 2015 IDE
- Make sure Ionic tools for VS 15 are installed, [see here for more info.] (https://taco.visualstudio.com/en-us/docs/tutorial-ionic/)
- Git clone the source code onto your computer.
- Right click dependencies in solution explorer and select restore dependencies to download both bower and npm modules.
- On Windows the app can be debugged using Ripple for iOS & Android, and natively for Windows Phone 8.1, Windows 10 & the Windows Univeral Platform.

### CLI & Text Editor
This app can be run using the command line and any IDE or text editor that supports Javascript.

- Install Node, NPM, Ionic, Cordova, Bower, Gulp and Gulp-Sass.
- Clone repo and cd into directory that contains the package.json.
- **Dependencies**: Run `npm install` and `bower install` to install dependencies.
- **Running**: Run `ionic serve` to start the gulp tasks and run the app locally.
- **Install OS**: Run `ionic platform add [OS]` to install packages for a target OS.
- **Building**: Run `ionic build [OS]` to build for a specific OS.
- **Emulating**: Run `ionic emulate [OS]` to emulate on that OS.

See [Ionic documentation](http://ionicframework.com/docs/cli/) for more info. 

## Issues
Main issues encountered while working on the project. 

#### CORS

Cross-origin HTTP requests that are from the localhost (aka origin) are quite rare, besides when developing and testing. I done most of my debugging on a local server spun up to test the app using my browser, this meant that all the server requests where coming from localhost:8100. I jumped in the perfect incentive test back end (which this app in interacts with) to try and resolve the issue. The project seemed to be alreay be annotated with `[Access-Control-Allow-Origin]` to allow for requests from the localhosts. After much debugging the issue boiled down to this: Some browsers and frameworks add custom HEADERS to your HTTP requests such as `Content-Type`, `Accept-Language` and `Content-Language` these initiate a 'preflight request' with the special HTTP method type of `OPTIONS`. 

`[Access-Control-Allow-Origin]` does not allow for OPTIONS requests by default so either annotate each method/class you want to expose with `[HttpOptions]` or import the `System.Web.Http.Cors` package to your project and add the following line to your web app config file `app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);` see references below for more info.

#### SSL
The app while in development is interacting with the test enviroment and not the production one. This enviroment had a self signed SSL cert that was not trusted by most browsers. I had to do a bit of debugging to figure out this was causing lots of issues while testing the app in certain browsers. They were returning an `ERR: INSECURE RESPONSE`. 

In the end the easiest solution was to move the test enviroment to a new subdomain of the production and use the parent domains SSL cert as it can cover all subdomains. 

#### Responsive Design
As I designed the app from scratch is Photoshop I had to create a lot of custom elements and deviate from the styles provided my Ionic. This meant that I was trading off some great inbuilt style normalization that Ionic provides for different devices and screen types in order to achieve a more bespoke UX that suited both the rebrand and the users needs.

## Mobile Apps Development Project 

## References

## Terms

PerfectIncentive is a business name of PerfectCard Limited. Registered in Ireland with Company Number 423276. Registered Office Address: Unit 1, Knightpark, Greystones, Co. Wicklow.

The card is issued by PSI-Pay Ltd pursuant to license by MasterCard International Incorporated. PSI-Pay Ltd is authorised and regulated by the Financial Conduct Authority (FCA) under the Electronic Money Regulations 2011 (register reference 900011) for the issuing of electronic money.

MasterCard and the MasterCard Brand Mark are registered trademarks of MasterCard International.

*Tax and PRSI free up to €500.00.

- [Full Terms of Use] (https://secure.perfectpaas.com/Help/TermsOfUse)
- [Privacy Policy] (https://secure.perfectpaas.com/Help/PrivacyPolicy)
