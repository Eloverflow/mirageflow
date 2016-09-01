angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $rootScope, UserService,  AuthService, $q, EmailService, $location) {

      // This is the fail callback from the login method
    var fbLoginError = function(error){
      console.log('fbLoginError', error);
      //$ionicLoading.hide();
    };

    $scope.goToSignIn = function () {
        $location.path('/sign-in');
    };

    $scope.goToSignUp = function () {
        $location.path('/sign-up');
    };

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function (authResponse) {
        console.log(authResponse)

        openFB.api({
            path: '/me',
            success: function(data) {
                console.log(JSON.stringify(data));
                console.log(data)
                UserService.setUser({
                    authResponse: authResponse,
                    userID: data.id,
                    name: data.name,
                    email: data.email,
                    gender: data.gender,
                    picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
                });

                //document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
            },
            error: errorHandler});

    };

    $scope.user = {is_admin:"false"};

    $scope.signup = function() {
      AuthService.register($scope.user).then(function(msg) {
      }, function(errMsg) {
      });
    };

    $scope.fbLoginBrowser = function () {
        openFB.login(
        function (response) {
          if (response.status === 'connected') {
            console.log('Facebook login succeeded');

              if (!response.authResponse){
                  console.log("Cannot find the authResponse");
                  return;
              }
              var authResponse = response.authResponse;

              getFacebookProfileInfo(authResponse)


          } else {
            alert('Facebook login failed');
          }
        },{scope: 'public_profile,email,publish_actions,user_friends'})
    };


    $scope.login = function() {
      AuthService.login($scope.user).then(function(msg) {
          AuthService.startupAuthenticate();
          $rootScope.getInfo();
          $location.path('/')
      }, function(errMsg) {
      });
    };

    //This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function() {
        $scope.fbLoginBrowser();
    };

    $scope.logout = function() {
      AuthService.logout();
    };

    $scope.forgotpwd = function() {
        EmailService.resetPwd($scope.user).then(function(msg) {
        }, function(errMsg) {
        });
    };

});