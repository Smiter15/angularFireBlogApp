'use strict';

angular.module('myApp.register', ['ngRoute', 'firebase'])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
    });
}])

// Register controller
.controller('RegisterCtrl', ['$scope', '$location', function($scope, $location) {

    var registering = {};
    $scope.registering = registering;

    var fb = new Firebase("https://fa-slack.firebaseio.com/");

    $scope.signUp = function() {

        registering.loading = true;

        if (!$scope.regForm.$invalid) {
            var userEmail = $scope.user.email;
            var userPassword = $scope.user.password;
            if (userEmail && userPassword) {

                fb.createUser({
                    email: userEmail,
                    password: userPassword
                }, function(error, userData) {
                    if (error) {
                        switch (error.code) {
                            case "EMAIL_TAKEN":
                                $scope.regError = true;
                                $scope.regErrorMessage = "The new user account cannot be created because the email is already in use.";
                                console.log("The new user account cannot be created because the email is already in use.");
                                registering.loading = false;
                                $scope.$apply();
                                break;
                            case "INVALID_EMAIL":
                                $scope.regError = true;
                                $scope.regErrorMessage = "The specified email is not a valid email.";
                                console.log("The specified email is not a valid email.");
                                registering.loading = false;
                                $scope.$apply();
                                break;
                            default:
                                console.log("Error creating user:", error);
                        }
                        registering.loading = false;
                    } else {
                        console.log(userData);
                        registering.loading = false;
                        $location.path('/home');
                        $scope.$apply();
                    }
                });

            }
        }
    };

}]);
