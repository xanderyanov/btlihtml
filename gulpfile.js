'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var rigger = require('gulp-rigger');
var uglify = require('gulp-uglify');
var path = require('path');
var plumber = require('gulp-plumber');
var data = require('gulp-data');
var fs = require('fs');
var rename = require('gulp-rename');
var less = require('gulp-less');
// var path = require("path");

gulp.task('pug', function () {
  return gulp
    .src('src/*.pug')
    .pipe(
      data(function (file) {
        return JSON.parse(fs.readFileSync('src/assets/data/data.json'));
      })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('build'));
});

// gulp.task("css", function () {
// 	return gulp
// 		.src("src/assets/css/apps.css")
// 		.pipe(sourcemaps.init())
// 		.pipe(postcss([postcssImport()]))
// 		.pipe(sourcemaps.write("."))
// 		.pipe(gulp.dest("build/assets/css/"));
// 	// .pipe(rename("apps-x1.css"))
// 	// .pipe(gulp.dest("build/assets/css/"));
// });

gulp.task('css', function () {
  return gulp
    .src('src/assets/less/app.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/assets/css/'));
});

// эту папку надо самостоятельно копировать в корень диска, на котором проект - и не придется менять пути, например в файле fonts.less указывающем на путь к icomoon (иначе сделать нельзя)
// gulp.task('btlassets', function () {
//   return gulp.src('btlassets/**/*.*').pipe(gulp.dest('build/btlassets'));
// });

var vendorsCssFiles = [
  'node_modules/sweetalert/dist/sweetalert.css',
  'node_modules/swiper/swiper-bundle.min.css',
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/font-awesome/css/font-awesome.min.css',
  'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css',
];

gulp.task('vendorsCss', function () {
  return (
    gulp
      .src(vendorsCssFiles, {
        base: 'assets/css',
      })
      // .pipe(rigger()) //Прогоним через rigger

      .pipe(sourcemaps.init()) //Инициализируем sourcemap
      .pipe(concatCss('vendors.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('build/assets/css'))
  );
});

gulp.task('image', function () {
  return (
    gulp
      .src('src/assets/img/**/*.*') //Выберем наши картинки
      // .pipe(
      // 	imagemin({
      // 		//Сожмем их
      // 		progressive: true,
      // 		svgoPlugins: [{ removeViewBox: false }],
      // 		use: [pngquant()],
      // 		// interlaced: true,
      // 	})
      // )
      .pipe(gulp.dest('build/assets/img'))
  );
});

var vendorsJsFiles = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
  'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
  'node_modules/sweetalert/dist/sweetalert.min.js',
  'node_modules/swiper/swiper-bundle.min.js',
];

gulp.task('vendorsJs', function () {
  return (
    gulp
      .src(vendorsJsFiles, {
        base: 'btlassets/js',
      })
      // .pipe(rigger()) //Прогоним через rigger
      .pipe(plumber())
      .pipe(sourcemaps.init()) //Инициализируем sourcemap
      .pipe(concat('vendors.js'))
      .pipe(uglify()) //Сожмем наш js
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('build/assets/js'))
  );
});

var myjsfiles = [
  'src/assets/js/firstJS.js',
  'src/assets/js/__gal.js',
  'src/assets/js/__price2.js',
  'src/assets/js/__jsFilter.js',
  'src/assets/js/__reviews.js',
  'src/assets/js/__mob.js',
  'src/assets/js/main.js',
  'src/assets/js/__resize.js',
];

gulp.task('myJs', function () {
  return (
    gulp
      // .src("src/assets/js/**/*.js*")
      // .src("src/assets/js/main.js")
      .src(myjsfiles, {
        base: 'assets/js',
      })
      .pipe(plumber())
      .pipe(sourcemaps.init()) //Инициализируем sourcemap
      .pipe(concat('app.js')) // в какой файл объединить
      // .pipe(uglify()) //Сожмем наш js
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('build/assets/js'))
  );
});

gulp.task('fonts', function () {
  return gulp
    .src('src/assets/fonts/**/*.*')
    .pipe(gulp.dest('build/assets/fonts'));
});

// gulp.task('fonts__local', function () {
//   return gulp
//     .src('src/assets/fonts__local/**/*.*')
//     .pipe(gulp.dest('build/btlassets/fonts'));
// });

// gulp.task('fonts_dev_css', function () {
//   return gulp
//     .src('src/css/fonts_dev.css*')
//     .pipe(gulp.dest('build/btlassets/css'));
// });

gulp.task('icomoon', function () {
  return gulp
    .src('src/assets/icomoon/**/*.*')
    .pipe(gulp.dest('build/assets/icomoon'));
});

gulp.task('video', function () {
  return gulp
    .src('src/assets/video/**/*.*')
    .pipe(gulp.dest('build/assets/video'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel(
      'css',
      'vendorsCss',
      'pug',
      'image',
      'video',
      'fonts',
      'icomoon',
      'vendorsJs',
      'myJs'
    )
  )
);

gulp.task('watch', function () {
  gulp
    .watch('src/assets/less/*.less*', gulp.series('css'))
    .on('uplink', function (filepath) {
      remember.forget('css', path.resolve(filepath));
      delete cached.caches.styles[path.resolve(filepath)];
    });
  gulp
    .watch('src/assets/img/**/*.*', gulp.series('image'))
    .on('uplink', function (filepath) {
      remember.forget('image', path.resolve(filepath));
      delete cached.caches.image[path.resolve(filepath)];
    });
  gulp
    .watch('src/assets/js/*.js*', gulp.series('myJs'))
    .on('uplink', function (filepath) {
      remember.forget('myJs', path.resolve(filepath));
      delete cached.caches.myJs[path.resolve(filepath)];
    });
  gulp.watch('src/**/*.pug', gulp.series('pug'));
});

gulp.task('dev', gulp.series('build', 'watch'));
