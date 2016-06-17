var miApp = angular.module('miApp', [
  'ngRoute',
  'myControllers'
]);

miApp.factory('UserService',function() {
	return {
      nombre : 'Jaomix1',
	  avatar_url:'GitHub-Mark-64px.png',
	  login : 'jaomix1'
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