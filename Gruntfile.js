/* global module:false */
module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n * <%= pkg.title || pkg.name %> (<%= pkg.version %>) -' +
            ' <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' <%= pkg.repository.url ? "* " + pkg.repository.url + "\\n" : "* " %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' License: <%= pkg.license %>\n */\n',

    watch: {
      files: ['index.js', 'lib/*.js', 'test/*.js'],
      tasks: ['exec:test']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: 'checkstyle'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      files: {
        src: ['index.js', 'lib/*.js']
      }
    },
    exec: {
      //
      test: {
        command: "mocha test/",
        stdout: true
      },
      // code analysis
      plato: {
        command: "./node_modules/.bin/plato -d reports/plato/ tasks/",
        stdout: true
      }
    },
    'remove-logging': {
      options: {
        verbose: true,
        beautify: true,
        mangle: true,
        optimize: true
      },
      files: {
        src: ['test/fixtures/*.js'],
        dest: 'test/fixtures/clean/'
      }
    }
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-exec');

  //
  grunt.loadTasks('./tasks');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

  //
  grunt.registerTask('test', 'exec:test');

  // coverage report
  grunt.registerTask('plato', 'exec:plato');

  // generate coverage(html) report using 'jscover' module
  grunt.registerTask('cov', ['exec:cov_pre', 'exec:cov_run', 'exec:cov_test']);

  // all reports at onces
  grunt.registerTask('report', ['cov', 'plato']);

  // inject README.md into package # readme property.
  grunt.registerTask('readme', 'inject README.md into package#readme property', function() {

    var exist = grunt.file.exists(filepath);

    if (!exist) {
      grunt.fail.warn('No "README.md" found..');
    }

    var readme = grunt.file.read('README.md');
    var pkg = grunt.file.readJSON('package.json');

    pkg.readme = readme;
    pkg = JSON.stringify(pkg, null, 4);
    grunt.file.write('package.json', pkg);
  });

  //
  grunt.registerTask('bin', 'Create binary file in "bin/" directory.', function() {

    var fs = require('fs');
    var shebang = "#!/usr/bin/env node";
    var opts = {
        process: function(content) {
            return shebang + '\n\n' + content;
        }
    };

    var src = grunt.config.process('dist/<%= pkg.name %>');
    var dest = grunt.config.process('bin/<%= pkg.name %>').replace('.js', '');

    grunt.file.copy(src, dest, opts);
    fs.chmodSync(dest, 755);
  });

  //
  grunt.registerTask('release', ['default' /* , more, to, come */ ]);
};
