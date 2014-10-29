angular.module('guns',['buffs'])
	.factory('GunService', function(BuffService) {
		var guns = JSON.parse('[{"name":"MIDA Multi-Tool","gunType":"Scout","attackCoefficient":"1.111111111","baseDamage":"-79.44444444","reloadTime":"1.06","rof":"190","clipSize":"21","clipSize2":"27","buff1":"","buff2":""},{"name":"Shadow Price","gunType":"Auto","attackCoefficient":"0.5555555556","baseDamage":"-42.77777778","reloadTime":"1.3","rof":"430","clipSize":"25","clipSize2":"","buff1":"","buff2":""},{"name":"Suros Regime","gunType":"Auto","attackCoefficient":"0.4509090909","baseDamage":"-11.27272727","reloadTime":"1.48","rof":"430","clipSize":"33","clipSize2":"","buff1":"Suros Regime","buff2":"Focused Fire"},{"name":"The Devil You Know","gunType":"Handcannon","attackCoefficient":"2.3","baseDamage":"-187.7666667","reloadTime":"2.6","rof":"130","clipSize":"12","clipSize2":"","buff1":"","buff2":""},{"name":"Patience and Time","gunType":"Sniper","attackCoefficient":"4.857142857","baseDamage":"-423.8571429","reloadTime":"0.97","rof":"110","clipSize":"4","clipSize2":"6","buff1":"","buff2":""},{"name":"Vision of Confluence","gunType":"Scout","attackCoefficient":"1.333333333","baseDamage":"-103.6666667","reloadTime":"1.3","rof":"185","clipSize":"19","clipSize2":"27","buff1":"","buff2":""},{"name":"Bad Juju","gunType":"Pulse","attackCoefficient":"0.4285714286","baseDamage":"-34.42857143","reloadTime":"1.37","rof":"380","clipSize":"15","clipSize2":"","buff1":"String of Curses","buff2":""},{"name":"Ice Breaker","gunType":"Sniper","attackCoefficient":"5.848484848","baseDamage":"-470.5454545","reloadTime":"29.54","rof":"90","clipSize":"6","clipSize2":"","buff1":"","buff2":""},{"name":"Timurs Lash","gunType":"Handcannon","attackCoefficient":"2.519230769","baseDamage":"-200.7692308","reloadTime":"2.4","rof":"115","clipSize":"7","clipSize2":"13","buff1":"","buff2":""},{"name":"Vex Mythoclast","gunType":"Fusion","attackCoefficient":"0.35","baseDamage":"30","reloadTime":"1.68","rof":"350","clipSize":"21","clipSize2":"","buff1":"","buff2":""},{"name":"77 Wizard","gunType":"Fusion","attackCoefficient":"1.182741117","baseDamage":"-94.61928934","reloadTime":"1.4","rof":"270","clipSize":"24","clipSize2":"","buff1":"","buff2":""},{"name":"The Culling","gunType":"Machine Gun","attackCoefficient":"0.3869047619","baseDamage":"-30.95238095","reloadTime":"3.333333333","rof":"905","clipSize":"74","clipSize2":"","buff1":"","buff2":""},{"name":"Unfriendly Giant","gunType":"Rocket Launcher","attackCoefficient":"14.39880952","baseDamage":"-1151.904762","reloadTime":"1.666666667","rof":"80","clipSize":"2","clipSize2":"","buff1":"","buff2":""},{"name":"Light/Beware","gunType":"Fusion","attackCoefficient":"1.18452381","baseDamage":"-94.76190476","reloadTime":"1.6","rof":"270","clipSize":"36","clipSize2":"","buff1":"","buff2":""},{"name":"Zombie Apocalypse","gunType":"Machine Gun","attackCoefficient":"0.8090909091","baseDamage":"-64.72727273","reloadTime":"3.233333333","rof":"450","clipSize":"53","clipSize2":"75","buff1":"","buff2":""},{"name":"Warlock Melee","gunType":"Melee","attackCoefficient":"0","baseDamage":"627","reloadTime":"1.266666667","rof":"360","clipSize":"1","clipSize2":"","buff1":"","buff2":""},{"name":"TItan Melee","gunType":"Melee","attackCoefficient":"0","baseDamage":"654","reloadTime":"0.8333333333","rof":"360","clipSize":"1","clipSize2":"","buff1":"","buff2":""}]');
		_.forEach(guns, function(gun) {
			for(var key in gun) {
				var val = gun[key];
				if(!(isNaN(val) || val instanceof Array)) gun[key] = parseFloat(val);
			}
			gun.clipSizes = [gun.clipSize];
			if(gun.clipSize2) gun.clipSizes.push(gun.clipSize2);
			gun.clipSize = _.max(gun.clipSizes);
			gun.buffs = [];
			if(gun.buff1) gun.buffs.push(gun.buff1);
			if(gun.buff2) gun.buffs.push(gun.buff2);
		});
		var gunTypeList = JSON.parse('[{"name":"Scout","headshotMult":"1.5","majorPenalty":"-.1","ultraPenalty":"-.15"},{"name":"Auto","headshotMult":"1.25","majorPenalty":"0","ultraPenalty":"0"},{"name":"Handcannon","headshotMult":"1.5","majorPenalty":"-.166","ultraPenalty":"-.25"},{"name":"Sniper","headshotMult":"2.5","majorPenalty":"-.1","ultraPenalty":"-.2"},{"name":"Pulse","headshotMult":"1.5","majorPenalty":"0","ultraPenalty":"0"},{"name":"Fusion","headshotMult":"1.5","majorPenalty":"0","ultraPenalty":"0"},{"name":"Machine Gun","headshotMult":"1.25","majorPenalty":"-.1","ultraPenalty":"-.25"},{"name":"Rocket Launcher","headshotMult":"1.0","majorPenalty":"-.25","ultraPenalty":"-.37"},{"name":"Melee","headshotMult":"1.0","majorPenalty":"0","ultraPenalty":"0"}]');
		var gunTypes = _.indexBy(gunTypeList, 'name');
		var TargetTypes = {
			NORMAL: 0,
			MAJOR: 1,
			ULTRA: 2
		};

		var fillDefaults = function(gun) {
			if(gun.attack === undefined) gun.attack = 300;
			if(gun.accuracy === undefined) gun.accuracy = 100;
			if(gun.headshotPercent === undefined) gun.headshotPercent = 0;
			if(!gun.buffs) gun.buffs = [];
		};

		var enrichGun = function(gun, target) {
			fillDefaults(gun);
			var attack = gun.attack;
			var accuracy = gun.accuracy / 100;
			var headshotPercent = gun.headshotPercent / 100;

			gun.damage = attack * gun.attackCoefficient + gun.baseDamage;
			var damage = gun.damage;
			var rof = gun.rof;
			var reloadTime = gun.reloadTime;
			_.forEach(gun.buffs, function(buffName) {
				var buff = BuffService.getBuff(buffName);
				var outputs = buff(damage, rof, reloadTime, gun.clipSize);
				damage = outputs.damage;
				rof = outputs.rof;
				reloadTime = outputs.reloadTime;
			});

			var regularDamagePerClip = gun.clipSize * accuracy * damage * (1 - headshotPercent);
			var headshotDamagePerClip = gun.clipSize * accuracy * headshotPercent * damage * gunTypes[gun.gunType].headshotMult;

			var targetPenalty = 0;
			if(target == TargetTypes.NORMAL) headshotDamagePerClip *= 2;
			if(target == TargetTypes.MAJOR) targetPenalty = gunTypes[gun.gunType].majorPenalty;
			if(target == TargetTypes.ULTRA) targetPenalty = gunTypes[gun.gunType].ultraPenalty;

			var damagePerClip = regularDamagePerClip + headshotDamagePerClip;
			damagePerClip += damagePerClip * targetPenalty;
			var secondsPerClip = gun.clipSize / (rof / 60);

			gun.dps = damagePerClip / secondsPerClip;
			gun.adjustedDps = damagePerClip / (secondsPerClip + reloadTime);
		};
		return {
			getGuns: function() {
				return _.clone(guns, true);
			},
			getEnrichedGuns: function(attack, accuracy, headshotPercent, target) {
				var gunSet = _.clone(guns, true);
				_.forEach(gunSet, function(gun) {
					gun.attack = attack;
					gun.accuracy = accuracy;
					gun.headshotPercent = headshotPercent;
					enrichGun(gun, target);
				});
				return gunSet;
			},
			getGunTypes: function() {
				return _.clone(gunTypes, true);
			},
			getBuffs: function() {

			},
			TargetTypes: TargetTypes,
			getTargetName: function(targetValue) {
				switch(targetValue) {
					case 0:
						return 'Normal';
					case 1:
						return 'Major';
					case 2:
						return 'Ultra';
				}
			},
			enrichGun: enrichGun
		}
	})