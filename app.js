
// google.load('visualization', '1', {
  // packages: ['corechart']
// });

// google.setOnLoadCallback(function() {
  // angular.bootstrap(document.body, ['myApp']);
// });

google.load("visualization", '1', {packages:["calendar"]});
google.load("visualization", '1', {packages:["PieChart"]});

google.setOnLoadCallback(function() {
	//angular.bootstrap(document.body, ['miApp']);
});
	  


		
var miApp = angular.module('miApp', [
  'ngRoute',
  'myControllers',
  'googlechart'
]);

miApp.factory('UserService',function() {
	return {
      //nombre : 'Jaomix1',
	  nombre : 'kelemen',
	  avatar_url:'GitHub-Mark-64px.png',
	  repoNombre: 'netbeans-gradle-project'
	};
});

miApp.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
		when('/View/a/', {
			templateUrl: 'myviewa.html',
			controller: 'controllerA'
		}).
		when('/View/b/', {
			templateUrl: 'myviewb.html',
			controller: 'controllerB'
		}).
		otherwise({
			redirectTo: '/View/a/'
		});
				
}]);