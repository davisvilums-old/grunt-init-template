// Wrapper function with one parameter
module.exports = function(grunt) {
	// This banner gets inserted at the top of the generated files, such a minified CSS
	var bannerContent = '/*!\n' +
						' * <%= pkg.name %>\n'+
						' * Version: <%= pkg.version %>\n'+
						' * Build date: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n'+
						' */\n\n';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['assets/js/src/*.js'],
			options: {
				forin: true,
				noarg: true,
				noempty: true,
				eqeqeq: true,
				bitwise: true,
				undef: true,
				unused: true,
				curly: true,
				browser: true,
				devel: true,
				jquery: true,
				indent: true,
				maxerr: 25,
				reporter: require('jshint-stylish')
			},
		},
		concat: {
			options: {
				banner: bannerContent
			},
			app: {
				src: ['assets/js/src/*.js'],
				dest: 'assets/js/app.js'
			},
			plugins: {
				src: ['assets/js/plugins/*.js'],
				dest: 'assets/js/plugins.min.js'
			}
		},
		uglify: {
			options: {
				banner: bannerContent,
				sourceMapRoot: 'assets/js/src/*.js',
				sourceMap: 'assets/js/src-map/app.min.js.map'
			},
			target : {
				src : ['assets/js/src/*.js'],
				dest : 'assets/js/app.min.js'
			}
		},
		sass: {
			dev: {
				options: {
					style: 'expanded',
					compass: true
				},
				files: {
					'assets/css/styles.css': 'assets/css/scss/styles.scss',
				}
			}
		},
		cssmin: {
			options: {
				banner: bannerContent
			},
			target : {
				src : ['assets/css/styles.css'],
				dest : 'assets/css/styles.min.css'
			}
		},
		watch: {
			sass: {
				files: ['assets/css/scss/*.scss'],
				tasks: ['sass', 'cssmin'],
			},
			scripts: {
				files: ['assets/js/src/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass', 'cssmin']);
	grunt.registerTask('jslint', ['jshint']);
};