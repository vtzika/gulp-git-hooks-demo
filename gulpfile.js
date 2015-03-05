/*global require, console */

// It will import the node packages
// and it will assign each one in a variable
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var jscs = require('gulp-jscs');
var del = require('del');
var jsdoc = require('gulp-jsdoc');
var karma = require('gulp-karma');
var mocha = require('gulp-mocha');
var cover = require('gulp-coverage');

// Clean
// Clean out the destination folders
gulp.task('clean', function(cb) {
    del(['build/js/*', 'application/css/*'], cb);
});

// Scripts Tasks
// Uglifies the js files and reloads the webserver
gulp.task('scripts', function() {
    gulp.src(['application/js/*.js'])
        .pipe(uglify())
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('build/js'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

// JSHint
// It will check the javascripts files for syntax errors
gulp.task('lint', function() {
    gulp.src(['application/**/*.js', 'gulpfile.js', 'spec/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({
            title: 'JSHint',
            message: 'JSHint Passed. I never doubted you! Wonderful!'
        }));
});

// JSCS
// It checks the coding style
gulp.task('jscs', function() {
    gulp.src(['application/**/*.js', 'gulpfile.js', 'spec/**/*.js'])
        .pipe(jscs('.jscsrc'))
        .pipe(notify({
            title: 'JSCS',
            message: 'Coding Style checking is Passed. I never doubted you! Wonderful!'
        }));
});

// JSDocs
// It processes javascript files and generate a JSON file to be used for documentation
gulp.task('jsdoc', function() {
    gulp.src('application/**/*.js')
    .pipe(jsdoc.parser())
    .pipe(gulp.dest('./jsdocs'));
});

// Styles Tasks
// It compresses, minify and compile the sass files to css and reloads the webserver
gulp.task('styles', function() {
    return sass('application/scss/', {
            style: 'compressed'
        })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('application/css/'))
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(livereload())
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// Image Task
// It compresses the images
gulp.task('image', function() {
    gulp.src(['application/images/**/*'])
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('build/images'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

// Connect
// It connects to  a server
gulp.task('webserver', function() {
    connect.server({
        root: 'application',
        livereload: true
    });
});

// Watch Tasks
// Watches js, html and js files files
gulp.task('watch', function() {
    gulp.watch('application/scss/*', ['styles']);
    gulp.watch('application/index.html', ['styles', 'scripts']);
    gulp.watch('application/**/*.js', ['scripts']);
});

var testPassing = true;

gulp.task('test', function(cb) {
    return gulp.src('./foobar')
    .pipe(karma({
        configFile: 'karma.conf.js',
        action: 'run'
    }))
    .on('error', function(err) {
        console.log(err);
        testPassing = false;
        this.emit('end'); //instead of erroring the stream, end it
        return true;
    });
});

gulp.task('coverage', function() {
    return gulp.src(['application/**/*.js'], { read: false })
        .pipe(cover.instrument({
            pattern: ['spec/**/*.js'],
            debugDirectory: 'debug'
        }))
        .pipe(mocha())
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest('reports'));
});

// Precommit task
// Either run this task by using gulp precommit or add it to your .git/hooks/pre-commit file
gulp.task('precommit', ['lint', 'jscs', 'test']);

// Default task
gulp.task('default', ['clean', 'webserver', 'scripts', 'jscs', 'styles', 'image', 'watch', 'test']);
