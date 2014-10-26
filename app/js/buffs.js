angular.module('buffs', [])
	.factory('BuffService', function() {
		var buffDescriptions = JSON.parse('[{"name":"String of Curses","description":"Found on Bad JuJu. Instant reloading and 15% increased damage after a kill."},{"name":"Suros Regime","description":"Found on the Suros Regime. Bottom half of the magazine does additional damage starting at a 1% increase to 75% for the final round. The increase follows an exponential curve","undefined":" so damage will be overstated for all but the final rounds."},{"name":"Glass Half Full","description":"Bottom half of the magazine does additional damage starting at a 1% increase to 10% for the final round. The increase follows a mostly linear curve."},{"name":"Final Round","description":"Found on a variety of weapons. Increased damage (roughly 30%) for the final round in the magazine. Treated as if it were spread across the clip for DPS purposes."},{"name":"Focused Fire","description":"Found on Suros Regime and some other weapons. Decreases rate of fire by 30%","undefined":" increases damage by 33%."},{"name":"Outlaw","description":"Cuts reload time in half after precision kill."},{"name":"Luck in the Chamber","description":"One random round does an additional 30% damage."}]');
		var oneBonusMechanic = function(damage, rof, reloadTime, clipSize) {
			return {
				damage: (damage * (clipSize - 1) + damage * 1.33) / clipSize,
				rof: rof,
				reloadTime: reloadTime
			};
		};
		var buffFunctions = {
			'String of Curses': function(damage, rof, reloadTime, clipSize) {
				return {
					damage: damage * 1.15,
					rof: rof,
					reloadTime: 0
				};
			},
			'Suros Regime': function(damage, rof, reloadTime, clipSize) {
				return {
					damage: damage * 1.067,
					rof: rof,
					reloadTime: reloadTime
				};
			},
			'Glass Half Full': function(damage, rof, reloadTime, clipSize) {
				return {
					damage: damage * 1.025,
					rof: rof,
					reloadTime: reloadTime
				};
			},
			'Outlaw': function(damage, rof, reloadTime, clipSize) {
				return {
					damage: damage,
					rof: rof,
					reloadTime: reloadTime / 2
				};
			},
			'Focused Fire': function(damage, rof, reloadTime, clipSize) {
				return {
					damage: damage * 1.3333333,
					rof: rof * .7,
					reloadTime: reloadTime
				};
			},
			'Final Round': oneBonusMechanic,
			'Luck in the Chamber': oneBonusMechanic
		};
		return {
			getBuffs: function() {
				return _.clone(buffDescriptions);
			},
			getBuff: function(buffName) {
				return buffFunctions[buffName];
			}
		}
	});