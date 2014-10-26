angular.module('info', ['columns'])
	.controller('InfoCtrl', function($scope, ColumnService) {
		$scope.columns = ColumnService.getColumns();
	});