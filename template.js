'use strict';

// Basic template description.
exports.description = 'Scaffolds a new project with GruntJS and SASS';

// Template-specific notes to be displayed after question prompts.
exports.after = 'Some description';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

	init.process({}, [
		// Prompt for these values.
		init.prompt('name'),
		init.prompt('title'),
		init.prompt('description'),
		init.prompt('version')
	], function(err, props) {
		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// Empty folders won't be copied over so make them here
		grunt.file.mkdir('app/img');
		grunt.file.mkdir('app/css');
		grunt.file.mkdir('app/js');

		grunt.file.mkdir('src/img');
		grunt.file.mkdir('src/scss');
		grunt.file.mkdir('src/js');

		// Copy files/folders depending on any options chosen
		// if(props.SUSY == 'yes') {
		// 	init.copy('config.rb');
		// 	init.copy('assets/css/scss/_base.scss');
		// }

		// Generate package.json file, used by npm and grunt.
		init.writePackageJSON('package.json', {
			name: props.name,
			description: props.description,
			version: props.version,
			devDependencies: {
				"grunt-contrib-concat": "~0.x.x",
				"grunt-contrib-uglify": "~0.x.x",
				"grunt-contrib-cssmin": "~0.x.x",
				"grunt-contrib-sass": "~0.x.x",
				"grunt-contrib-jshint": "~0.x.x",
				"grunt-contrib-watch": "~0.x.x"
			},
		});

		// All done!
		done();
	});
};