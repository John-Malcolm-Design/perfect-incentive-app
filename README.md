# Perfect Incentive App

[![Node version](https://img.shields.io/npm/v/npm.svg?style=flat)](http://nodejs.org/download/)
[![Bower version](https://img.shields.io/bower/v/bootstrap.svg?style=flat)](http://bower.io/#install-bower)


Perfect Incentive allows SME's and corporates to incentivise their staff and customers with prepaid debit cards that they can spend anywhere.
Tax free incentives* that can be: occasional, bespoke, instant or ongoing. 

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

- **Visual Studio 2015**: Provides debugging and templating out of the box for Ionic and although I used it for this project any IDE that supports Javascript can be used, and commands can be run via the terminal.
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
- www/js/app.js - Global app decleration and configuration, includes route configuration, onrun() method and global variables. 
- www/js/controllers.js - Contains the controller for each of the views in the app.
- www/js/services.js - RESTfull user service. Used for client authentication and endpoint communication.

### HTML & SASS
- www/index.html - App template. Code which is global to each view.
- www/views/login.html - Inital app login page.
- www/views/intro.html - Instructions on how to use app.
- www/views/home.html - Home screen for app.
- www/views/my-cards.html - Card Management.
- www/views/sign-up.html - New user registration.
- www/views/edit-profile.html - Edit profile.
- scss/ionic.app.scss - Stylesheet used for all custom styles.

## Running Project
### Visual Studio 2015 IDE
1. Make sure Ionic tools for VS 15 are installed, [see here for more info.] (https://taco.visualstudio.com/en-us/docs/tutorial-ionic/)
2. Git clone the source code or manually download.
3. Right click dependencies in solution explorer and select restore dependencies to download both bower and npm modules.
4. On Windows the app can be debugged using Ripple for iOS & Android, and natively on OS/emulators or external device for Windows Phone 8.1, Windows 10 & the Windows Univeral Platform.

### CLI & Text Editor
This app can be run using the command line and any IDE/text editor that supports Javascript.

1. Install Node, NPM, Ionic, Cordova, Bower, Gulp and Gulp-Sass.
2. Clone repo and cd into directory that contains the package.json file.
3. **Dependencies**: Run commands `npm install` and also `bower install` to install dependencies.
4. **Running**: Run `ionic serve` to start the gulp tasks and run the app on a local port.
5. **Install OS**: Run `ionic platform add [OS]` to install packages for a target OS.
6. **Building**: Run `ionic build [OS]` to build for a specific OS.
7. **Emulating**: Run `ionic emulate [OS]` to emulate on that OS.

See [Ionic documentation](http://ionicframework.com/docs/cli/) for more info. 

## Issues
Main issues encountered while working on the project include: 

#### CORS

Many of my HTTP requests when starting development threw the `No Access-Control-Allow-Origin header present in response` errors. Cross-origin HTTP requests that are from the localhost (aka origin) are quite rare, besides during developing and testing. I done most of my debugging on a local server spun up to test the app using my browser, this meant that all the server requests where coming from localhost:8100. I jumped into the perfect incentive test enviroment (which this app interacts with) to try and resolve the issue. The project seemed to be alreay be annotated with `[Access-Control-Allow-Origin]` to allow for requests from the localhosts. After much debugging the issue boiled down to this: Some browsers and frameworks add custom HEADERS to your HTTP requests such as `Content-Type`, `Accept-Language` and `Content-Language` these initiate a 'preflight request' with the special HTTP method type of `OPTIONS`. 

The `[Access-Control-Allow-Origin]` annotation in ASP.NET MVC 5 does not allow for OPTIONS requests by default so either annotate each method/class you want to expose with `[HttpOptions]` or import the `System.Web.Http.Cors` package to your project and add the following line to your web app config file `app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);` see references below for more info.

#### SSL
The app while in development is interacting with the test enviroment and not the production one. This enviroment had a self signed SSL cert that was not trusted by most browsers. I had to do a bit of debugging to figure out this was causing lots of issues while testing the app in certain browsers. They were returning an `ERR: INSECURE RESPONSE`. 

In the end the easiest solution was to move the test enviroment to a new subdomain of the production and use the parent domains SSL cert as it can cover all subdomains. 

#### Responsive Design
As I designed the app from scratch in Photoshop I had to create a lot of custom elements and deviate from the styles provided my Ionic. This meant that I was trading off some great inbuilt style normalization that Ionic provides for different devices and screen types in order to achieve a more bespoke UX that suited both the rebrand and the users needs.

## Mobile Apps Development Project 
Because this app did not need any fancy mobile hardware features such as accelerometer or GPS most of my time was spent on building a UX that worked for the customers and addressed common complaints that users had about interacting with the web app. The emphasis was also on desiging and developing a user experience and that is both intuitive and falls inline with the rebrands style guides.

The app is far from finished but is approaching MVP stage. 

###Issues to be tackled before MVP release:
- Responsive Design (Finish writing media queries to takle different resolutions and orientations).
- Forgot your password page (C# needs refactoring in back end and API needs to be opened to allow for this).
- Robust validaition and error messages.
- Fix intro screen bug.
- Card management functionality (ACTIVATE, SUSPEND, REPLACE).

#### Of the 3 minumum features required by the brief this app tries to cover:
1. Isolated Storage
2. Remote data storage (either blob storage, http transfer or users own onedrive)
3. Dynamic data retrieval and use

## References

| Technology | Issues | URL |
| :--------- | :----- | :-- |
| **CSS** | Responsive Positioning | http://stackoverflow.com/questions/4804581/css-expand-child-div-height-to-parents-height |
| **CSS** | Child Elements | http://stackoverflow.com/questions/4804581/css-expand-child-div-height-to-parents-height |
| **CSS** | Creating Diagonals | http://code.tutsplus.com/tutorials/how-to-create-diagonal-lines-with-css--net-20763 |
| **CSS** | Transparent borders | http://stackoverflow.com/questions/17751093/how-to-make-a-transparent-border-using-css |
| **JS** | Loop through DOM elements | https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/ |
| **AngularJS** | Setting flags in AngularJS | http://stackoverflow.com/questions/21786492/if-statement-in-ng-click |
| **Ionic** | Relative Sizing | https://forum.ionicframework.com/t/set-height-in-percentage-of-an-element-inside-ion-content/6315 |
| **Ionic** | App instructions | http://codepen.io/ionic/pen/AjgEB |
| **Ionic** | Getting ionic path | http://stackoverflow.com/questions/29967743/getting-current-location-in-ionic-project-for-android |
| **SSL** | Easy SSL | https://letsencrypt.org/getting-started/ |
| **CORS** | ASP.NET MVC 5 Config | http://www.codeproject.com/Articles/742532/Using-Web-API-Individual-User-Account-plus-CORS-En |
| **CORS** | ASP.NET + AngularJS Config | http://stackoverflow.com/questions/24461605/angularjs-and-owin-authentication-on-webapi |
| **CORS** | Bypassing preflight | http://stackoverflow.com/questions/11442632/how-can-i-post-data-as-form-data-instead-of-a-request-payload/14868725#14868725 |
| **CORS** | Jquery Vs AngularJS | http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/ |

## Terms

PerfectIncentive is a business name of PerfectCard Limited. Registered in Ireland with Company Number 423276. Registered Office Address: Unit 1, Knightpark, Greystones, Co. Wicklow.

The card is issued by PSI-Pay Ltd pursuant to license by MasterCard International Incorporated. PSI-Pay Ltd is authorised and regulated by the Financial Conduct Authority (FCA) under the Electronic Money Regulations 2011 (register reference 900011) for the issuing of electronic money.

MasterCard and the MasterCard Brand Mark are registered trademarks of MasterCard International.

*Tax and PRSI free up to €500.00.

- [Full Terms of Use] (https://secure.perfectpaas.com/Help/TermsOfUse)
- [Privacy Policy] (https://secure.perfectpaas.com/Help/PrivacyPolicy)
