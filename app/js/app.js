var app = angular.module('destiny-gun-data',['ngRoute', 'compare','list', 'info'])
	.config(function($routeProvider) {
		$routeProvider.
			when('/info', {
				templateUrl: 'partials/info.html'
			}).
			when('/list', {
				templateUrl: 'partials/list.html',
				controller: 'ListCtrl'
			}).
			when('/compare', {
				templateUrl: 'partials/compare.html',
				controller: 'CompareCtrl'
			}).
			otherwise({
				redirectTo: '/info'
			});
	})
	.controller('MainCtrl', function($scope, $route) {
		// Why in the world I have to do this, I'll never know, but I've just about had it trying to decipher ngRoute.
		$scope.currentView = function() {
			if(!$route.current || !$route.current.templateUrl) return 'none';
			return /\/(.*).html/.exec($route.current.templateUrl)[1];
		};
	});

function csvToJson(file, names, callback) {
	$.get('partials/'+file+'.csv', function(response) {
		var lines = response.split('\n');
		var output = [];
		for(var i=0;i<lines.length;i++) {
			var line = lines[i].split(',');
			var item = {};
			var hadFiller = false;
			for(var j=0;j<line.length;j++) {
				if(line[j] == '--') hadFiller = true;
				item[names[j]] = line[j];
			}
			if(!hadFiller) output.push(item);
		}
		console.log(JSON.stringify(output))
		if(callback) callback(output);
	})
}

// Guns -> csvToJson('guns',['name','gunType','attackCoefficient','baseDamage','reloadTime','rof','clipSize','clipSize2','buff1','buff2']);
// Types -> csvToJson('types', ['name','headshotMult','majorPenalty','ultraPenalty']);
// Buffs -> csvToJson('buffs', ['name','description'])