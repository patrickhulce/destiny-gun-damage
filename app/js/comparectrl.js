angular.module('compare', ['guns', 'columns', 'buffs', 'ui.bootstrap', 'angularCharts'])
	.controller('CompareCtrl', function($scope, GunService, ColumnService, BuffService) {
		$scope.targetEnemy = GunService.TargetTypes.NORMAL;
		$scope.accuracy = 70;
		$scope.headshots = 30;

		$scope.guns = GunService.getGuns();
		$scope.buffs = BuffService.getBuffs();
		$scope.columns = ColumnService.getColumns();
		$scope.valueFor = ColumnService.valueFor;

		$scope.selectedGuns = [];
		$scope.selectedGun = null;
		$scope.selectedGunIndex = -1;

		$scope.addGunText = '';
		$scope.addGun = function(gun) {
			var gun = _.clone(gun);
			gun.accuracy = $scope.accuracy;
			gun.headshotPercent = $scope.headshots;
			GunService.enrichGun(gun, $scope.targetEnemy);
			$scope.selectedGuns.push(gun);
			$scope.addGunText = '';
		};

		$scope.selectGun = function(index) {
			if($scope.selectedGunIndex == index) index = -1;
			$scope.selectedGunIndex = index;
			if(index != -1) $scope.selectedGun = $scope.selectedGuns[index];
			else $scope.selectedGun = null;
		};

		$scope.removeGun = function(index) {
			$scope.selectedGuns.splice(index, 1);
			$scope.selectedGun = null;
			$scope.selectedGunIndex = -1;
		};

		$scope.resetGuns = function() {
			_.forEach($scope.selectedGuns, function(gun) {
				gun.accuracy = $scope.accuracy;
				gun.headshotPercent = $scope.headshots;
				GunService.enrichGun(gun, $scope.targetEnemy);
			});
		};

		var watchAttrs = ['attack', 'clipSize', 'accuracy', 'headshotPercent'];
		var watchExp = 'selectedGun.' + watchAttrs.join(' + selectedGun.');
		$scope.$watch(watchExp, function(oldV, newV) {
			if(!$scope.selectedGun) return;
			GunService.enrichGun($scope.selectedGun, $scope.targetEnemy);
		});
		$scope.$watch('selectedGun.buffs', function() {
			if(!$scope.selectedGun) return;
			GunService.enrichGun($scope.selectedGun, $scope.targetEnemy);
		}, true);
		$scope.$watch('selectedGuns', function(guns) {
			var data = [];
			_.forEach(guns || [], function(gun) {
				data.push({
					x: gun.name,
					tooltip: gun.name + " (" + gun.attack + ") at (" + gun.accuracy + "%, " + gun.headshotPercent + "%)",
					y: [gun.dps, gun.adjustedDps]
				});
			});
			$scope.chartData.data = data;
		}, true);

		$scope.chartType = 'bar';
		$scope.chartConfig = {
			title: 'Gun Damage Comparison',
			legend: {
				display: true,
				position: 'right'
			}
		};
		$scope.chartData = {
			series: ["DPS", "Adjusted DPS"],
			data: []
		}
	});