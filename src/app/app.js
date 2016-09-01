'use strict';
// Declare app level module which depends on views, and components
var app  = angular.module('starter', ['starter.controllers','starter.services','starter.constants','ngRoute']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');


  $routeProvider.when('/posts', {
    templateUrl: 'posts/posts.html',
    controller: 'PostsCtrl'
  });


  $routeProvider.when('/post', {
    templateUrl: 'post/post.html',
    controller: 'PostCtrl'
  });
  $routeProvider.when('/post/:id', {
    templateUrl: 'post/post.html',
    controller: 'PostCtrl'
  });
  $routeProvider.when('/post-create', {
    templateUrl: 'post/create.html',
    controller: 'PostCreateCtrl'
  });
  $routeProvider.when('/post-edit/:id', {
    templateUrl: 'post/edit.html',
    controller: 'PostEditCtrl'
  });


  $routeProvider.when('/sign-in', {
    templateUrl: 'sign_in/sign_in.html',
    controller: 'LoginCtrl'
  });

  $routeProvider.when('/sign-up', {
    templateUrl: 'sign_in/sign_up.html',
    controller: 'LoginCtrl'
  });

  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/posts'});
}]);


app.run(function($rootScope,$http, API_ENDPOINT, AuthService) {
  $rootScope.getInfo = function () {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function (result) {
      $rootScope.user = result.data.user;
      console.log($rootScope.memberinfo);
      console.log(result.data.user);
    });
  };

  AuthService.startupAuthenticate();
  $rootScope.getInfo();

});