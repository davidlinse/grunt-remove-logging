
module.exports = function (grunt) {

    'use strict';

    var fs = require('fs');

    var process = require('./lib/module.js').process;

    grunt.registerMultiTask('remove-logging', 'Remove logging statements from JavaScript code.', function () {

        var options = this.options({
            verbose: false,
            banner: '',
            footer: '',
            mangle: false,
            optimize: false,
            report: false,
            comment: true,
            tolerant: true
        });

        // Iterate over all src/dest file pairs.
        //
        this.files.forEach(function (f) {

            var src = f.src.filter(function (filepath) {

                var exist = grunt.file.exists(filepath);

                if (!exist) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                }

                return exist;
            });

            if (src.length === 0) {
                grunt.log.warn('Destination (' + f.dest + ') not written because src files were empty.');
                return;
            }

            src.forEach(function (file) {

                grunt.file.copy(file, f.dest + file, {
                    process: process
                });

            });

        });

        return true;

    });

};
