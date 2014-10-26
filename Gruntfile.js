var _ = require('lodash');

var bowerSrcPathsJson = '{"css":["bower_components/bootstrap/dist/css/bootstrap.css","bower_components/font-awesome/css/font-awesome.css"],"js":["bower_components/jquery/dist/jquery.js","bower_components/lodash/dist/lodash.js","bower_components/angular/angular.js","bower_components/angular-bootstrap/ui-bootstrap.js","bower_components/angular-bootstrap/ui-bootstrap-tpls.js","bower_components/angular-route/angular-route.js"],"copy":[{"expand":true,"dest":"fonts","cwd":"bower_components/font-awesome/fonts","src":"**"}]}';
var bowerSrcPaths = JSON.parse(bowerSrcPathsJson);

/*
Add more package mappings here
bowerSrcPaths.js.push('bower_components/pkgname/dist/pkgname.js');
bowerSrcPaths.css.push('bower_components/pkgname/dist/pkgname.css');
bowerSrcPaths.copy.push({src: 'bower_components/pkgname/assets/**', dest: 'assets/images/'});
"app/css/bootstrap-dark.min.css"
*/
bowerSrcPaths.js.push('bower_components/d3/d3.min.js');
bowerSrcPaths.js.push('bower_components/angular-charts/dist/angular-charts.min.js');
bowerSrcPaths.js.push('bower_components/angulartics/dist/angulartics.min.js');
bowerSrcPaths.js.push('bower_components/angulartics/dist/angulartics-ga.min.js');

module.exports = function (grunt) {
  var staticFolder = 'www-root';
  var destPrefix = staticFolder + '/';

  var copyPaths = bowerSrcPaths.copy;
  _.each(copyPaths, function(obj) {
    obj.dest = destPrefix + obj.dest;
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      app: {
        files: [
          {
            dest: destPrefix + 'css/app.css',
            src: ['app/less/**/*.less']
          }
        ]
      }
    },
    copy: {
      app: {
        files: [
          {
            expand: true,
            cwd: 'app/partials',
            src: '**',
            dest: destPrefix + 'partials'
          },
          {
            src: 'app/index.html',
            dest: destPrefix + 'index.html'
          }
        ]
      },
      vendor: {
        files: copyPaths
      }
    },
    concat: {
      vendor: {
        files: [
          {
            dest: destPrefix + 'css/vendor.css',
            src: bowerSrcPaths.css
          },
          {
            dest: destPrefix + 'js/vendor.js',
            src: bowerSrcPaths.js
          }
        ]
      },
      app: {
        files: [
          {
            dest: destPrefix + 'js/app.js',
            src: ['app/js/**/*.js']
          }
        ]
      }
    },
    uglify: {
      vendor: {
        files: [
          {
            dest: destPrefix + 'js/vendor.min.js',
            src: destPrefix + 'js/vendor.js'
          }
        ]
      }
    },
    shell: {
      appRestart: {
        command: 'sh misc/app.sh restart'
      },
      appStop: {
        command: 'sh misc/app.sh stop'
      }
    },
    watch: {
      appJs: {
        files: ['app/js/**/*.js'],
        tasks: ['concat:app']
      },
      appLess: {
        files: ['app/less/**/*.less'],
        tasks: ['less:app']
      },
      appHtml: {
        files: ['app/index.html', 'app/partials/**'],
        tasks: ['copy:app']
      },
      appPy: {
        files: ['app/**/*.py'],
        tasks: ['shell:appRestart']
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: staticFolder
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-shell');

  var buildTasks = ['less', 'concat', 'copy', 'uglify'];
  var runTasks = ['connect', 'watch'];
  var testTesks = [];
  var defaultTasks = buildTasks.concat(runTasks);

  grunt.registerTask('server', ['connect']);
  grunt.registerTask('build', buildTasks);
  grunt.registerTask('run', runTasks);
  grunt.registerTask('default', defaultTasks);
};
