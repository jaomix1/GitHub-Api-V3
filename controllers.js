var myControllers = angular.module('myControllers', []);

myControllers.controller('controllerA', ['$scope','$http','UserService',
	function ($scope, $http,UserService) {

		$scope.nombre = UserService.nombre;	
		$scope.users = UserService;
	
		$scope.getPerson = function () {		
			$http.get('https://api.github.com/users/' + $scope.nombre)
			.success(function (data) {
				$scope.users = data;
				console.log('Se ejecuto: ' + 'https://api.github.com/users/' + $scope.nombre);
			})
			.error(function (data) {
				console.log('Error al consultar la api: ' + data);
			});
		};
	}
]);

myControllers.controller('controllerB', ['$scope','$http','UserService',
	function ($scope, $http,UserService) {
	
		$scope.nombre = UserService.nombre;
		$scope.repoNombre = UserService.repoNombre;

		$http.get('https://api.github.com/users/'+ $scope.nombre +'/repos')
		.success(function (data) {
			$scope.repos = data;
			console.log('Se ejecuto: ' + 'https://api.github.com/users/'+ $scope.nombre +'/repos');
		})
		.error(function (data) {
			console.log('Error al consultar la api: ' + data);
		});
	
		$scope.getReposDetails = function ($repoName) {  
			$http.get('https://api.github.com/repos/'+ $scope.nombre + '/' + $repoName)
			.success(function (data) {
				$scope.details = data;
				console.log('Se ejecuto: ' + 'https://api.github.com/repos/'+ $scope.nombre + '/' + $repoName);				
			})
			.error(function (data) {
				console.log('Error al consultar la api: ' + data);
			});
		};	
	
		$scope.getReposDetailsCommits = function ($repoName) {
			$scope.VectorNombreTmp = [];
			$scope.VectorNombreCantidadObj = [];
			$scope.VectorNombreCantidad = [];
			$scope.VectorFechasTmp = [];
			$scope.VectorFechaCantidad = [];
			
			var a = 0;
			var b = 0;
			
			$http.get('https://api.github.com/repos/'+ $scope.nombre + '/' + $repoName + '/commits')
			.success(function (data) {
				$scope.comits = data;
				console.log('Se ejecuto: ' + 'https://api.github.com/repos/'+ $scope.nombre + '/' + $repoName + '/commits');
				
				angular.forEach(data, function(value, key){				
					a = $scope.VectorNombreTmp.indexOf(value.commit.author.name);		
					if (a == -1)
					{
						$scope.VectorNombreTmp.push(value.commit.author.name);
						$scope.VectorNombreCantidadObj.push({us:value.commit.author.name, cant:1 });
						$scope.VectorNombreCantidad.push([value.commit.author.name, 1 ]);
					}else{
						$scope.VectorNombreCantidadObj[a].cant ++;
						$scope.VectorNombreCantidad[a][1] ++;					
					}				
					date1 = new Date(value.commit.author.date)
					date1.setHours(0,0,0,0);		
					b = $scope.VectorFechasTmp.indexOf(date1.toString());	
					if (b == -1)	
					{
						$scope.VectorFechasTmp.push(date1.toString());
						$scope.VectorFechaCantidad.push([date1, 1 ]);
					}else{									
						$scope.VectorFechaCantidad[b][1] ++;	
					}				
					
				});				
				//console.log( JSON.stringify($scope.VectorNombreCantidad));
				//////////////////////////////////7Calendar/////////////////////////////////
				var dataTable = new google.visualization.DataTable();
				dataTable.addColumn({ type: 'date', id: 'Date' });
				dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
				dataTable.addRows($scope.VectorFechaCantidad);		
				var chart = new google.visualization.Calendar(document.getElementById('CalendarioDiv'));
				var options = {
					title: "Commit por dias",
					height: 400
				};	   
				chart.draw(dataTable, options);
				//////////////////////////////////PieChart/////////////////////////////////
				$scope.VectorNombreCantidad.unshift(['Task', 'Commit por persona']);
				var data = google.visualization.arrayToDataTable($scope.VectorNombreCantidad);
				var options = {
					title: 'Commits por persona',
					height: 200,
					width:400
				};
				var chart = new google.visualization.PieChart(document.getElementById('PastelDiv'));
				chart.draw(data, options);
				//////////////////////////////////////////////////////////////////
			})
			.error(function (data) {
				console.log('Error al consultar la api: ' + data);
			});	
		};	
	}
]);

  
// http://angular-google-chart.github.io/angular-google-chart/docs/0.1.0/guides/getting-started/