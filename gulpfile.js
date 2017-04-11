var gulp = require('gulp');
// var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var systemjsBuilder = require('systemjs-builder');

// Compile TypeScript app to JS
gulp.task('compile:ts', function () {
  return gulp
    .src([
        "src/**/*.ts",
        "typings/*.d.ts"
    ])
    // .pipe(sourcemaps.init())
    .pipe(typescript({
        "module": "system",
        "moduleResolution": "node",
        "outDir": "app",
        "target": "ES5"
    }))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app'));
});

// Generate systemjs-based bundle (app/app.js)
gulp.task('bundle:app', function() {
  var builder = new systemjsBuilder('./', './src/systemjs.config.js');
  return builder.buildStatic('src/main.js', 'app/app.js');
});

// Copy and bundle dependencies into one file (vendor/vendors.js)
// system.config.js can also bundled for convenience
gulp.task('bundle:vendor', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/es6-promise/dist/es6-promise.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
      ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('vendor'));
});

// Copy dependencies loaded through SystemJS into dir from node_modules
gulp.task('copy:vendor', function () {
  gulp.src(['node_modules/rxjs/**/*'])
    .pipe(gulp.dest('public/lib/js/rxjs'));

  gulp.src(['node_modules/angular2-in-memory-web-api/**/*'])
    .pipe(gulp.dest('public/lib/js/angular2-in-memory-web-api'));

  return gulp.src(['node_modules/@angular/**/*'])
    .pipe(gulp.dest('public/lib/js/@angular'));
});

gulp.task('vendor', ['bundle:vendor', 'copy:vendor']);
gulp.task('app', ['compile:ts', 'bundle:app']);

// Bundle dependencies and app into one file (app.bundle.js)
gulp.task('bundle', ['vendor', 'app'], function () {
    return gulp.src([
        'app/app.js',
        'vendor/vendors.js'
        ])
    .pipe(concat('app.bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app'));
});

gulp.task('default', ['bundle']);
