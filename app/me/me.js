'use strict';

angular.module('myApp.me', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/me', {
        templateUrl: 'me/me.html',
        controller: 'MeCtrl'
    });
}])

.controller('MeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location) {
    $scope.email = CommonProp.getEmail();
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
    $scope.articles = $firebaseArray(fbPosts.startAt($scope.email).endAt($scope.email));

    $scope.editPost = function(id) {

        var fbPost = new Firebase("https://fa-slack.firebaseio.com/Articles/" + id);

        $scope.postToUpdate = $firebaseObject(fbPost);

        $('#editModal').modal();
    }

    $scope.updatePost = function() {

        var fbPostToUpdate = new Firebase("https://fa-slack.firebaseio.com/Articles/" + $scope.postToUpdate.$id);

        fbPostToUpdate.update({
            title: $scope.postToUpdate.title,
            post: $scope.postToUpdate.post,
            emailId: $scope.postToUpdate.emailId
        }, function(error) {
            if (error) {
                console.log("Error:", error);
            } else {
                console.log("Post updated successfully");
                $('#editModal').modal('hide');
            }
        });

    }

    $scope.confirmDelete = function(id) {

        var fbPostToDelete = new Firebase("https://fa-slack.firebaseio.com/Articles/" + id);

        $scope.postToDelete = $firebaseObject(fbPostToDelete);
        $('#deleteModal').modal();

    }

    $scope.deletePost = function() {

        var fbDeletePost = new Firebase("https://fa-slack.firebaseio.com/Articles/" + $scope.postToDelete.$id);

        fbDeletePost.remove(function(error) {
            if (error) {
                console.log("Error:", error);
            } else {
                console.log("Post removed successfully!");
                $('#deleteModal').modal('hide');
            }
        });

    }

    $scope.logout = function(){
        CommonProp.logoutUser();
    }

}]);
