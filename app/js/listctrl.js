angular.module('list',['guns', 'columns'])
	.controller('ListCtrl', function($scope, $filter, GunService, ColumnService) {
		$scope.guns = GunService.getEnrichedGuns(300, 100, 0, GunService.TargetTypes.NORMAL);
		$scope.columns = ColumnService.getColumns();
		$scope.defaultEnabledColumns = ['name', 'dps'];
		$scope.valueFor = ColumnService.valueFor;

		// Pre-select top 5 primaries
		var sortedGuns = _.sortBy(_.where($scope.guns, function(gun) {
			return gun.gunType == 'Auto' || gun.gunType == 'Scout' || gun.gunType == 'Handcannon';
		}), 'adjustedDps');
		var startIndex = Math.max(0, sortedGuns.length - 5);
		_.forEach(sortedGuns.slice(startIndex), function(gun) {
			gun.included = true;
		});

		$scope.useAdjusted = true;
		$scope.accuracy = 100;
		$scope.headshotPercent = 0;
		$scope.targetEnemy = GunService.TargetTypes.NORMAL;

		$scope.sortColumn = 0;
		$scope.sortPredicate = 'name';
		$scope.sortIsDescending = false;

		$scope.setSort = function(columnIndex) {
			if($scope.sortColumn == columnIndex) $scope.sortIsDescending = !$scope.sortIsDescending;
			$scope.sortColumn = columnIndex;
			$scope.sortPredicate = _.where($scope.columns, 'enabled')[columnIndex].attribute;
		};

		$scope.includeGun = function(gun) {
			gun.included = !gun.included;
		};

		$scope.flipAdjusted = function() {
			$scope.useAdjusted = !$scope.useAdjusted;
		}

		$scope.chartData = [];
		$scope.chartConfigs = [
			{title: 'Damage to Normals'},
			{title: 'Damage to Majors'},
			{title: 'Damage to Ultras'}
		];
		$scope.chartType = 'line';

		_.forEach($scope.chartConfigs, function(config) {
			config.legend = {
				display: true,
				position: 'right'
			};
			config.tooltip = false;
			config.lineLegend = 'traditional';
			config.colors = ['#c99','#cc9','#ccc','#9cc','#99c','#9c9','#c9c'];
		});

		var computeGunData = function() {
			var normalData = {series: [], data: []};
			var majorData = {series: [], data: []};
			var ultraData = {series: [], data: []};
			var gunCopy = _.clone(_.where($scope.guns, 'included'), true);
			for(var i=0;i<6;i+=1) {
				var obj = {
					x: i * 20 + '%',
					y: [],
					tooltip: 'Damage done when ' + (i * 20) + '% of shots are headshots.'
				};
				normalData.data.push(_.clone(obj, true));
				majorData.data.push(_.clone(obj, true));
				ultraData.data.push(_.clone(obj, true));
			}
			_.forEach(gunCopy, function(gun) {
				normalData.series.push(gun.name);
				majorData.series.push(gun.name);
				ultraData.series.push(gun.name);
				for(var i=0;i<6;i+=1) {
					gun.headshotPercent = i * 20;
					var target = $scope.useAdjusted ? 'adjustedDps' : 'dps';
					GunService.enrichGun(gun, GunService.TargetTypes.NORMAL);
					normalData.data[i].y.push(gun[target]);
					GunService.enrichGun(gun, GunService.TargetTypes.MAJOR);
					majorData.data[i].y.push(gun[target]);
					GunService.enrichGun(gun, GunService.TargetTypes.ULTRA);
					ultraData.data[i].y.push(gun[target]);
				}
			});;
			$scope.chartData[0] = normalData;
			$scope.chartData[1] = majorData;
			$scope.chartData[2] = ultraData;
		};



		$scope.$watch('accuracy + headshotPercent + targetEnemy', function() {
			var selectedGuns = _.indexBy(_.where($scope.guns, 'included'), 'name');
			$scope.guns = GunService.getEnrichedGuns(300, 
				$scope.accuracy, $scope.headshotPercent, 
				$scope.targetEnemy);
			_.forEach($scope.guns, function(gun) {
				if(selectedGuns[gun.name]) gun.included = true;
			});
		});

		$scope.$watch('guns', function() {
			computeGunData();
		}, true);

		$scope.$watch('useAdjusted', function() {
			computeGunData();
		});
	});