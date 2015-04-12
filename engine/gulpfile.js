// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var obfuscate = require('gulp-obfuscate');
var domSrc = require('gulp-dom-src');
var htmlreplace = require('gulp-html-replace');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    // Copy html
    gulp.src('index.html')
        .pipe(htmlreplace({
            'js': 'js/all.min.js',
            'css': 'css/main.css'
        }))
        .pipe(gulp.dest('build'));

    // Copy images
    gulp.src('images/*.*')
        .pipe(gulp.dest('build/images'));

    // Copy music
    gulp.src('music/*.*')
        .pipe(gulp.dest('build/music'));

    // Copy css
    gulp.src('css/main.css')
        .pipe(gulp.dest('build/css'));

    // Crunch and copy the JS
    domSrc({ file: 'index.html', selector: 'script', attribute: 'src' })
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'))
       // .pipe(rename('all.min.js'))
        //.pipe(uglify())
        //.pipe(gulp.dest('build/js'))
//        .pipe(rename('all.obfuscate.js'))
//        .pipe(obfuscate({ replaceMethod: obfuscate.ZALGO }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('build/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('js/maxpane_modules/*.js', ['lint', 'scripts']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);