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
		$scope.grafica = 'Barra';
		$scope.nombre = UserService.nombre;
		$scope.repoNombre = UserService.repoNombre;
		$scope.pagina = 1;
		$scope.paginaI = 1;
		$scope.visibleCommits = false;
		$scope.visibleContributors= false;
		$scope.visibleIssues= false;
		
		$http.get('https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre)
		.success(function (data) {
			$scope.details = data;
			console.log('Se ejecuto: ' + 'https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre);				
		})
		.error(function (data) {
			console.log('Error al consultar la api: ' + data);
		});
		
		$http.get('https://api.github.com/users/' + $scope.nombre)
			.success(function (data) {
				$scope.users = data;
				console.log('Se ejecuto: ' + 'https://api.github.com/users/' + $scope.nombre);
			})
			.error(function (data) {
				console.log('Error al consultar la api: ' + data);
			});
		
		$scope.getReposDetailsIssues = function ($paginaI) {
			$scope.VectorNombreTmp = [];
			$scope.VectorNombreCantidadObj = [];
			$scope.VectorNombreCantidad = [];
			$scope.VectorFechasTmp = [];
			$scope.VectorFechaCantidad = [];
			var datas = [];
			var datas2;
			var a = 0;
			var b = 0;						
			
			$scope.visibleCommits = false;
			$scope.visibleContributors= false;
			$scope.visibleIssues= true;
			
			$http.get('https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/issues?state=all&page=1&per_page=100')
				.success(function (data1) {
					datas = datas.concat(data1);
					console.log('Se ejecuto: https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/issues?state=all&page=1&per_page=100');
					//https://api.github.com/repos/kelemen/netbeans-gradle-project/issues
					
					$http.get('https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/issues?state=all&page=2&per_page=100')
					.success(function (data2) {
						console.log('Se ejecuto: https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/issues?state=all&page=2&per_page=100');
						datas = datas.concat(data2);
						//$scope.issues = datas;	
						//$scope.issues = data1;
					
						$http.get('https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/issues?state=all&page=3&per_page=100')
						.success(function (data3) {
							console.log('Se ejecuto: https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/issues?state=all&page=3&per_page=100');
							datas = datas.concat(data3);
							$scope.issues = datas;	
							//$scope.issues = data1;
						
							angular.forEach(datas, function(value, key){				
								a = $scope.VectorNombreTmp.indexOf(value.user.login);		
								if (a == -1)
								{
									$scope.VectorNombreTmp.push(value.user.login);
									$scope.VectorNombreCantidadObj.push({us:value.user.login, cant:1 });
									if (value.state=='open'){
										$scope.VectorNombreCantidad.push([value.user.login, 1 , 0]);
									}
									else{
										$scope.VectorNombreCantidad.push([value.user.login, 0 , 1]);
									}
								}else{
									$scope.VectorNombreCantidadObj[a].cant ++;
									if (value.state=='open'){
										$scope.VectorNombreCantidad[a][1] ++;
									}
									else{
										$scope.VectorNombreCantidad[a][2] ++;			
									}				
								}				
								date1 = new Date(value.created_at)
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
							
							graficar3();
						});
					});
			});
			
		};	
		
		$scope.getReposDetailsContributors = function () {
			$scope.VectorNombreTmp = [];
			$scope.VectorNombreCantidadObj = [];
			$scope.VectorNombreCantidad = [];
			var datas = [];
			var datas2;
			var a = 0;		
			
			$scope.visibleCommits = false;
			$scope.visibleContributors= true;
			$scope.visibleIssues= false;
			
			$http.get('https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/contributors')
				.success(function (data1) {
					console.log('Se ejecuto: https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/contributors');
					
					$scope.contributors = data1;
					
					angular.forEach(data1, function(value, key){
						if (value.login != $scope.nombre)
						{
							$scope.VectorNombreCantidad.push([value.login, value.contributions ]);
						}
						else
						{
							$scope.ContributorsAutor =value.contributions;
						}
					});	
					
					graficar2();
			});
			
		};	
		
		
		$scope.getReposDetailsCommits = function ($pagina) {
			$scope.VectorNombreTmp = [];
			$scope.VectorNombreCantidadObj = [];
			$scope.VectorNombreCantidad = [];
			$scope.VectorFechasTmp = [];
			$scope.VectorFechaCantidad = [];
			var datas = [];
			var datas2;
			var a = 0;
			var b = 0;						
			$scope.visibleCommits = true;
			$scope.visibleContributors= false;
			$scope.visibleIssues= false;
			
			$http.get('https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/commits?page=' + (2 * $pagina - 1) +'&per_page=100')
				.success(function (data1) {
					datas = datas.concat(data1);
					console.log('Se ejecuto: https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/commits?page=' + (2 * $pagina - 1) +'&per_page=100');
				
				$http.get('https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/commits?page=' + ( 2 * $pagina) +'&per_page=100')
				.success(function (data2) {
					//datas2 = data2;		
					console.log('Se ejecuto: https://api.github.com/repos/'+ $scope.nombre + '/' + $scope.repoNombre + '/commits?page=' + (2 * $pagina ) +'&per_page=100');
					
					datas = datas.concat(data2);
					$scope.comits = datas;		

					angular.forEach(datas, function(value, key){				
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
					
					graficar();
					
				});
			
			});		
					
		};	
		
		function graficar(){
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
				height: 500
			};
			if ($scope.grafica == 'Barra' )
			{
				var chart = new google.visualization.BarChart(document.getElementById('PastelDiv'));
			}
			else
			{
				var chart = new google.visualization.PieChart(document.getElementById('PastelDiv'));
			}
			chart.draw(data, options);
			//////////////////////////////////////////////////////////////////
		};
		function graficar2(){
			//////////////////////////////////PieChart/////////////////////////////////
			$scope.VectorNombreCantidad.unshift(['Task', '# Contrib']);
			var data = google.visualization.arrayToDataTable($scope.VectorNombreCantidad);
			var options = {
				title: 'Contribuciones por usuario',
				height: 400
			};
			if ($scope.grafica == 'Barra' )
			{
				var chart = new google.visualization.BarChart(document.getElementById('PastelDiv2'));
			}
			else
			{
				var chart = new google.visualization.PieChart(document.getElementById('PastelDiv2'));
			}
			chart.draw(data, options);
		};
		function graficar3(){
			//////////////////////////////////PieChart/////////////////////////////////
			$scope.VectorNombreCantidad.unshift(['Task', '# Abiertas',  '# Cerradas']);
			var data = google.visualization.arrayToDataTable($scope.VectorNombreCantidad);
			var options = {
				title: 'Issues por usuario',
				height: 4000,
				width: 600,
				legend: { position: 'top', maxLines: 3 },
				bar: { groupWidth: '90%' },
				isStacked: true,
				
			};
				var chart = new google.visualization.BarChart(document.getElementById('PastelDiv3'));			

			chart.draw(data, options);
		};
	}
]);
			
  
// http://angular-google-chart.github.io/angular-google-chart/docs/0.1.0/guides/getting-started/
