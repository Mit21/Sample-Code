var serviceapp = angular.module("serviceMod", [ 'ui.router' ]);
serviceapp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/service');
	$stateProvider.state('service', {
		url : '/service',
		templateUrl : 'partial-service.html',
		controller : 'EmployeeList',
		resolve : {
			employees : function(empService) {
				return empService.EmpData();
			}
		}
	}),
		$stateProvider.state('newuser', {
			url : '/newuser/:id',
			templateUrl : 'partial-newuser.html',
			controller : 'EditController'

		}),
	$stateProvider.state('edit', {
		url : '/edit/:id',
		templateUrl : 'partial-edit.html',
		controller : 'EditController'

	});
});

serviceapp.controller("EmployeeList", [ '$scope', '$location','employees', 'empService',EmployeeList]);
function EmployeeList($scope, $location, employees, empService) {

	console.log(employees);
	$scope.emps = employees;
	console.log($scope.emps);
	$scope.edit = function (index) {
		empService.setIndex(index);
		$location.path("/edit/");
	}
	$scope.delete=function(index){
		empService.deleteData(index);
	}
}

serviceapp.controller('EditController', ['$scope','$location', 'empService', function($scope,$location, empService) {
	console.log(empService.EmpData());
	console.log(empService.getIndex());
	$scope.user = angular.copy(empService.EmpData()[empService.getIndex()]); //edit data
	console.log($scope.user);

	$scope.update=function(){
		empService.updateData($scope.user);
		console.log($scope.user);
		$location.path("/service/");
	};
	$scope.NewUser=function(){
		$location.path("/edit/");
	};
	$scope.add=function(){
		empService.addData().push($scope.user);
		$location.path("/service/");
	};
	$scope.cancel=function(){
		$location.path("/service/");
	};

}]);
serviceapp.factory('empService', function($http) {
	var employees;
	var index = -1;
	var getEmployees = function () {
		return $http.get('data/service.json').then(function(response){
			return employees = response.data.CandidateInfo;
		});
	};
	return {
		EmpData : function () {
			if (!employees) {
				return employees = getEmployees();
			}
			return employees;
		},
		setIndex:function(id) {
			index = id;
		},
		getIndex:function() {
			return index;
		},
		updateData:function(user) {
			if(index >= 0 && employees[index])
				employees[index] = user;
			else {

			}
			index = -1; //reset index;
		},
		addData:function() {
			return employees;
		},
		deleteData:function(id) {
			if(id >= 0 && employees[id])
				employees.splice(id, 1);
			else {

			}
		}
	}
});
