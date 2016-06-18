var myControllers = angular.module('myControllers', []);

myControllers.controller('controllerA', ['$scope','$http','UserService',
	function ($scope, $http,UserService) {

		$scope.nombre = UserService.nombre;	
		$scope.users = UserService;
	
		$scope.getPerson = function () {		
			$http.get('https://api.github.com/users/' + $scope.nombre)
			.success(function (data) {
				$scope.users = data;
				console.log('Se ejecuto: : ' + 'https://api.github.com/users/' + $scope.nombre);
			})
			.error(function (data) {
				console.log('Error: ' + data);
			});
		};
	}
]);

myControllers.controller('controllerB', ['$scope','$http','UserService',
	function ($scope, $http,UserService) {
	
		$scope.nombre = UserService.nombre;

		$http.get('https://api.github.com/users/'+ $scope.nombre +'/repos')
		.success(function (data) {
			$scope.repos = data;
			console.log('Se ejecuto: ' + 'https://api.github.com/users/'+ $scope.nombre +'/repos');
		})
		.error(function (data) {
			console.log('Error: ' + data);
		});
	
		$scope.getReposDetails = function ($repoName) {  
			$http.get('https://api.github.com/repos/'+ $scope.nombre + '/' + $repoName)
			.success(function (data) {
				$scope.details = data;
				console.log('Se ejecuto: : ' + 'https://api.github.com/repos/'+ $scope.nombre + '/' + $repoName);
			})
			.error(function (data) {
				console.log('Error: ' + data);
			});
		};	
	}
]);