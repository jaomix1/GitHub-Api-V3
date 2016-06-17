var myControllers = angular.module('myControllers', []);

myControllers.controller('controllerA', ['$scope','$http','UserService',
  function ($scope, $http,UserService) {

	$scope.nombre = UserService.nombre;	
	$scope.users = UserService;
	
	$scope.getPerson = function () {	
		
		$http.get('https://api.github.com/users/' + $scope.nombre)
		.success(function (data) {
			$scope.users = data;
			$scope.ErrorMessage = '';
		})
		.error(function (data) {
			console.log('Error: ' + data);
		});
	};
}]);

myControllers.controller('controllerB', ['$scope','$http','UserService',
  function ($scope, $http,UserService) {
	
		$scope.nombre = UserService.nombre;

		$http.get('https://api.github.com/users/'+ $scope.nombre +'/repos')
		.success(function (data) {
		$scope.repos = data;
			$scope.ErrorMessage = '';
		})
		.error(function (data) {
			console.log('Error: ' + data);
		});

	
	$scope.getReposDetails = function ($asd) {  
		$http.get('https://api.github.com/repos/'+ $scope.nombre + '/' + $asd)
		.success(function (data) {
			$scope.details = data;
			$scope.ErrorMessage = '';
		})
		.error(function (data) {
			console.log('Error: ' + data + '; https://api.github.com/users/'+ $scope.nombre + '/' + $asd);
		});
	};	
}]);