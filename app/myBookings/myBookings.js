'use strict';

angular.module('myApp.myBookings', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/my-bookings', {
        templateUrl: 'myBookings/my-bookings.html',
        controller: 'MyBookingsCtrl'
    });
}])

.controller('MyBookingsCtrl', ['$scope', 'CommonProp', '$firebaseObject', '$location', function($scope, CommonProp, $firebaseObject, $location) {
	$scope.username = CommonProp.getUser();

	// check if authenticated/loggedin
    var fb = new Firebase("https://fa-slack.firebaseio.com");
    var authData = fb.getAuth();
    if (!authData) {
        $location.path("/home");
    }

    // connect to firebase 
    var fbDays = new Firebase("https://fa-slack.firebaseio.com/bookings");

    // sync as array 
    var syncObj= $firebaseObject(fbDays);

    syncObj.$bindTo($scope, "days");
      
    // function to set the default data
    $scope.reset = function() {
        fbDays.set({
            Day1: {
                name: 'Monday',
                slots: {
                    T0900: { time: '9:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1100: { time: '11:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1300: { time: '1:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1500: { time: '3:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1700: { time: '5:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1900: { time: '7:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' }
                }
            },
            Day2: {
                name: 'Tuesday',
                slots: {
                    T0900: { time: '9:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1100: { time: '11:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1300: { time: '1:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1500: { time: '3:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1700: { time: '5:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1900: { time: '7:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' }
                }
            },
            Day3: {
                name: 'Wednesday',
                slots: {
                    T0900: { time: '9:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1100: { time: '11:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1300: { time: '1:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1500: { time: '3:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1700: { time: '5:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1900: { time: '7:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' }
                }
            },
            Day4: {
                name: 'Thursday',
                slots: {
                    T0900: { time: '9:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1100: { time: '11:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1300: { time: '1:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1500: { time: '3:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1700: { time: '5:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1900: { time: '7:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' }
                }
            },
            Day5: {
                name: 'Friday',
                slots: {
                    T0900: { time: '9:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1100: { time: '11:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1300: { time: '1:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1500: { time: '3:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1700: { time: '5:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1900: { time: '7:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' }
                }
            },
            Day6: {
                name: 'Saturday',
                slots: {
                    T0900: { time: '9:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1100: { time: '11:00am', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1300: { time: '1:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1500: { time: '3:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1700: { time: '5:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' },
                    T1900: { time: '7:00pm', booked: false, name: 'John Smith', description: 'Enter booking details...' }
                }
            }
        });
        $location.path("/my-bookings");
    };

    $scope.logout = function(){
	    CommonProp.logoutUser();
	};

}]);
