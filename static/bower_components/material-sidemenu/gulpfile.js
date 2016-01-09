var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var less = require('gulp-less');
var path = require('path');

gulp.task('template', function () {
    return gulp.src('src/**/*.html')
        .pipe(templateCache({
            module: 'sidemenu'
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('less', function () {
    return gulp.src('./sidemenu.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('concat', ['template'], function () {
    return gulp.src(['src/sidemenu.js', 'src/child.js', 'src/templates.js', 'src/factory.js', 'src/sections.js', 'src/content.js', , 'src/search.js'])
        .pipe(concat('sidemenu.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['concat', 'less']);