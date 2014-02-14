module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                options: {
                    // Replace all 'use strict' statements in the code with a single one at the top
                    banner: "'use strict';\n",
                    /* banner: ";(function () {\n'use strict';\n", */
                    process: function(src, filepath) {
                        return '// Source: ' + filepath + '\n' +
                            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
                    /* footer: '}());' */
                },
                src: [
                  'js/constants.js',
                  'js/app.js',
                  'js/controllers/*.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        less: {
            compile: {
                options: {
                    strictMath: true
                },
                files: {
                    'dist/css/<%= pkg.name %>.css': 'less/*.less',
                    }
            },
            minify: {
                options: {
                    cleancss: true,
                    report: 'min'
                },
                files: {
                    'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css',
                }
            }
        },
        watch: {
            src: {
                files: '<%= concat.dist.src %>',
                tasks: ['concat', 'uglify']
            },
            less: {
                files: 'less/*.less',
                tasks: ['less']
            }
        },
        clean: {
            dist: ['dist']
        },
		connect: {
			server: {
				options: {
					port: 9999,
					base: '.',
					directory: '.',
					hostname: '*',
					livereload: true
				}

			}
		}
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    grunt.registerTask('default', ['concat', 'uglify', 'less']);
	grunt.registerTask('dev', ['connect', 'watch']);
};
