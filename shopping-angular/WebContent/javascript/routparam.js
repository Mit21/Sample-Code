
/*var phonecatApp = angular.module('phonecatApp', ['ngRoute']);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when("/",
    		{
    			templateUrl : 'mainforroute.html',
    			controller : 'PhoneDetailCtrl'
    		})
     .when('/Mobile/:galaxy', 
    		 {
        templateUrl: 'detailForPhone.html',
        controller: 'PhoneDetailCtrl'
      });*/
//'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', ['ngRoute']);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
     /* when('/', {
        templateUrl: 'mainforroute.html',
        controller: 'PhoneListCtrl'
      }).*/
      when('/phones/:phoneId', {
        templateUrl: 'detailForPhone.html',
        controller: 'PhoneDetailCtrl'
      });
     /*.otherwise({
        redirectTo: '/phones'
      });
*/  }]);



phonecatApp.controller('PhoneListCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('JSON/phone.json').success(function(data) {
    
      $scope.phones = data.allProducts;
    });

  }]);

phonecatApp.controller('PhoneDetailCtrl', ['$scope', '$http','$routeParams',
  function($scope, $http,$routeParams) {
    $http.get('JSON/phone.json').success(function(data) {
    	
      $scope.phone = data.allProducts;
      $scope.mainImageUrl = $scope.phone[0].moreImages;
      $scope.mainImg=$scope.phone[0].moreImages[0];
     
    

    $scope.setImage = function(imageUrl) {
      $scope.mainImg = imageUrl;
    };
    });
  }]);


//}]);
