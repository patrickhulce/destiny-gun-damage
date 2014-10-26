angular.module('columns', [])
	.factory('ColumnService', function($filter) {
		var columns = _.map([
			['Gun', 'name', false, true],
			['Type', 'gunType', false, true],
			['Attack', 'attack', false, true],
			['Mag Size', 'clipSize', 0, false],
			['Damage/Bullet', 'damage', 0, true],
			['Accuracy (%)', 'accuracy', 0, false],
			['Headshot %', 'headshotPercent', 0, false],
			['Reload Time', 'reloadTime', 2, false],
			['Rounds/Minute', 'rof', 0, false],
			['DPS', 'dps', 2, true],
			['Adjusted DPS', 'adjustedDps', 2, true]
		], function(c) { 
			return {
				name: c[0], 
				attribute: c[1], 
				filter: c[2],
				enabled: c[3]
			};
		});
		return {
			valueFor: function(gun, column) {
				var value = gun[column.attribute];
				if(column.filter !== false) value = $filter('number')(value, column.filter);
				return value;
			},
			getColumns: function() {
				return _.clone(columns, true);
			}
		};
	})
	.directive('columnPicker', function(ColumnService) {
		var allColumns = ColumnService.getColumns().slice(1);
		return {
			restrict: 'E',
			scope: {
				columns: '=',
				enabledColumns: '&'
			},
			templateUrl: 'partials/columnpicker.html',
			controller: function($scope) {
				var defaults = $scope.enabledColumns();
				_.forEach($scope.columns, function(c) {
					c.enabled = _.contains(defaults, c.attribute);
				});
				console.log($scope.columns)
				$scope.columnText = '';
				$scope.columnOptions = allColumns;

				$scope.isVisible = function() {
					return function(item) {
						return item.attribute != 'name' && item.enabled;
					};
				};

				$scope.addColumn = function(column) {
					var column = _.find($scope.columns, {name: column.name})
					column.enabled = true;
					$scope.columnText = '';
				};

				$scope.removeColumn = function(column) {
					column.enabled = false;
				};
			}
		}
	})