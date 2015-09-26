var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var jsValidate = require('gulp-jsvalidate');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

const projectFiles = ['./index.js', './lib/**/*.js', './test/**/*.js'];

gulp.task('nodemon', () => {
  nodemon({
    script: 'index.js',
    ext: 'js',
    ignore: ['*.test.js']
  });
});

gulp.task('test', () => {
  process.env.NODE_ENV = 'test';
  process.env.PORT = 3001;
  return gulp.src(['./test/**/*.test.js'])
    .pipe(mocha({
        require: ['./test/bootstrap/chai.js']
      }))
});

gulp.task('validate', function () {
  return gulp.src(projectFiles)
      .pipe(jsValidate());
});

gulp.task('lint', function() {
  return gulp.src(projectFiles)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
});

gulp.task('default', () => {
  console.log('Gulp is running');
});