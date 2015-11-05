'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$location', function($scope, CommonProp, $firebaseArray, $location) {
	$scope.username = CommonProp.getUser();

	// check if authenticated/loggedin
    var fb = new Firebase("https://fa-slack.firebaseio.com");
    var authData = fb.getAuth();
    if (!authData) {
        $location.path("/home");
    }

    // get data
    var fbPosts = new Firebase("https://fa-slack.firebaseio.com/Articles");

    // sync data to array - adding scope username shows posts only for this user
    $scope.articles = $firebaseArray(fbPosts);

    $scope.logout = function(){
	    CommonProp.logoutUser();
	}

}]);
