// It will import the node packages
// and it will assign each one in a variable
var gulp = require('gulp');
var  uglify = require('gulp-uglify');
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
var jasmine = require('gulp-jasmine');
var git = require('gulp-git');
var argv = require('yargs').argv;
var jasminerunner = require('gulp-jasmine-phantom');

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
    gulp.src(['application/**/*.js', 'gulpfile.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!'
        }));
});

// JSCS
// It checks the coding style
gulp.task('jscs', function() {
    gulp.src(['application/**/*.js', 'gulpfile.js'])
        .pipe(jscs('.jscsrc'))
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!'
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

var test_passing = true;

// Testing
// It does regression testing
gulp.task('regression', function() {
    var regression = gulp.src('spec/**/*.js')
    .pipe(jasmine())
    .on('error', function(err) {
        console.error('Error on Testing!', err.message);
        //console.log(regression);
        //test_passing = false;
    })
});

// Git Commit Task
//
gulp.task('commit', function(){
    var commit_message = argv.msg;
    return gulp.src('application/*')
    .pipe(git.commit('gulp git test commit', {args: '-a -m ' + commit_message}));
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
    var server = livereload();
    gulp.watch('application/scss/*', ['styles']);
    gulp.watch('application/index.html', ['styles', 'scripts']);
    gulp.watch('application/**/*.js', ['scripts']);
});

// Tests task



gulp.task('test', function() {
    return gulp.src('node_modules/jasmine-standalone-2.2.0/SpecRunner.html')
        .pipe(jasminerunner());
});

// Default task
gulp.task('default', ['clean', 'webserver', 'scripts', 'jscs', 'styles', 'image', 'watch', 'regression']);




