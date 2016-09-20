[![Build Status](https://travis-ci.org/mirageflow/blogproject.svg)](https://travis-ci.org/mirageflow/blogproject)
[![Latest Stable Version](https://poser.pugx.org/mirageflow/blogproject/v/stable.svg)](https://packagist.org/packages/mirageflow/blogproject)
[![Total Downloads](https://poser.pugx.org/mirageflow/blogproject/d/total.svg)](https://packagist.org/packages/mirageflow/blogproject)

# Blogproject

This is an opensource blog project made for Mirageflow Inc.

In this project we are using build-in text search index of Mongod, you might want to look at Elastisearch for production environment.


## Prerequisites

* **Git**
    > Download from [git](https://git-scm.com/)

* **Nodejs(LTS)/Npm**
    > Download from [nodejs](https://nodejs.org/en/download/)

* **Mongodb**
    > Download from [Mongodb](https://www.mongodb.org/downloads#production) | Instruction : from [Microsoft](https://code.msdn.microsoft.com/Mongo-Database-setup-on-6963f46f)

* **mongodb (Mongodb Admin Panel)**(Optional)
```
npm install -g mongo-express
```

## How to use this app

Type in windows terminal (Or linux obviously)

```
git clone https://github.com/Eloverflow/blogproject blogproject-folder
cd blogproject-folder
npm install
```

## To Run Blogroject
```
npm run serve
```
Now browse to blogproject at [http://localhost:3000/](http://localhost:3000/)

## To Run Database
(Be sure to have a destination folder for the database or use : mongod --dbpath \<Your mongo databse folder\>)
```
mongod
```

## To Run Blogroject API
```
npm run serve:api
```
Now browse to blogproject API at [localhost](http://localhost) [Debugger](http://localhost:8000)

## Content

- Blogproject API
- Angular 1 Blogproject
- You can try it here (soon):
- [http://blogproject.mirageflow.com](http://blogproject.mirageflow.com)


## Directory Layout

```
api_dev/                --> all of the source files for the API
  bin/                      --> www server and process files
  config/                   --> API config
  models/                   --> model and schema (database objects)
  routes/                   --> route (url->functions)
  views/                    --> render (html)
  server.js                 --> main api module
src/                    --> all of the source files for the application including scss
  index.scss                --> scss index
  modules/                  --> scss modules
  app/                      --> all of the source files for the application
    app.js                      --> main application module
    index.css                   --> will be generated by gulp using the scss
    index.html                  --> app layout file (the main html template file of the app)
    logoutcallback.html         --> facebook auth requirement
    oauthcallback.html          --> facebook auth requirement
    bower_components/           --> External modules | will be created and populated after npm install
    controllers_res/            --> controller resources
    contact/                    --> contact controller and views
    about/                      --> about controller and views
    post/                       --> post controller and views
    posts/                      --> posts controller and views
    profile/                    --> profile controller and views
    sign_in/                    --> sign_in controller and views
    js/                         --> other js files
    assests/                    --> assets (Such as font)
    img/                        --> images

```

## Full NPM Command
```
npm run serve (to launch a browser sync server on your source files)
npm run serve:api (to launch a server api on your optimized application)
npm run test (to launch your unit tests with Karma)
npm run test:auto (to launch your unit tests with Karma in watch mode)
```

## Testing

There are two kinds of tests in the angular-seed application: Unit tests and end-to-end tests.

### Running Unit Tests

The angular-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run test-single-run
```

## Updating Angular

Previously we recommended that you merge in changes to angular-seed into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


This will copy the contents of the `angular-loader.js` library file into the `index-async.html` page.
You can run this every time you update the version of Angular that you are using.

## Continuous Integration

### Travis CI

[Travis CI][travis] is a continuous integration service, which can monitor GitHub for new commits
to your repository and execute scripts such as building the app or running tests. The angular-seed
project contains a Travis configuration file, `.travis.yml`, which will cause Travis to run your
tests when you push to GitHub.

You will need to enable the integration between Travis and GitHub. See the Travis website for more
instruction on how to do this.

## Contact

For more information on Blogproject please check out [http://mirageflow.com/](http://mirageflow.com/)

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
