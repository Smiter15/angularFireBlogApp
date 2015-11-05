'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'AddPostCtrl'
    });
}])

.controller('AddPostCtrl', ['$scope', 'CommonProp', '$location', function($scope, CommonProp, $location) {

    // check if authenticated/loggedin
    var fb = new Firebase("https://fa-slack.firebaseio.com");
    var authData = fb.getAuth();
    if (!authData) {
        $location.path("/home");
    }

    var addingPost = {};
    $scope.addingPost = addingPost;

    $scope.AddPost = function() {

        addingPost.loading = true;

        var fb = new Firebase("https://fa-slack.firebaseio.com/Articles");

        var title = $scope.article.title;
        var post = $scope.article.post;

        var user = CommonProp.getUser();
        var email = CommonProp.getEmail();

        var timestamp = Firebase.ServerValue.TIMESTAMP;
        var createdDate = $scope.createDate();

        fb.push({
            unixTimestamp: timestamp,
            date: createdDate,
            title: title,
            post: post,
            username: user,
            emailId: email,
            '.priority': email
        }, function(error) {
            if (error) {
                console.log("Error:", error);
                addingPost.loading = false;
            } else {
                console.log("Post sent successfully");
                addingPost.loading = false;
                $location.path("/welcome");
                $scope.$apply();
            }
        });

    }

    $scope.createDate = function() {

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        var yearString = year.toString(); 

        var formattedDate = day+"/"+(month + 1)+"/"+yearString.substring(2);

        return formattedDate;
    }

    $scope.logout = function() {
        CommonProp.logoutUser();
    }

}]);
