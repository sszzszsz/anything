var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber'); //強制停止を防止
var notify = require('gulp-notify'); //通知を表示
var browserSync = require('browser-sync'); //ブラウザシンク
var ssi = require('connect-ssi'); //ssi
var crLfReplace = require('gulp-cr-lf-replace'); // 改行コードを統一する
var convertEncoding = require('gulp-convert-encoding'); // 文字コード変更
var pleeease = require('gulp-pleeease');
var cache = require('gulp-cached');
var jsmin = require('gulp-uglify');
// 画像圧縮
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
// lint
var esLint = require('gulp-eslint');
var htmlhint = require('gulp-htmlhint');

// paths
var srcDir = './src';
var dstDir = './htdocs';
var targetDir = '';
var targetPage = '';


//html
gulp.task('html', function (done) {
  return gulp.src(srcDir + '/**/*.html')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(gulp.dest(dstDir));
  done();
});

// css
gulp.task('sass', function (done) {
  return gulp.src(srcDir + '/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sass({
      outputStyle: 'expanded' // expanded: 展開 compressed : 圧縮
    }))
    .pipe(pleeease({
      rem: { rootValue: '10px' },
      autoprefixer: {
        browsers: ['iOS 10', 'Android 4.4', 'last 2 version']
      },
      opacity: false,
      minifier: false // 圧縮しない場合：false
    }))
    .pipe(cache())
    .pipe(crLfReplace({ changeCode: 'CR+LF' }))// 改行コード変更
    .pipe(convertEncoding({ to: 'UTF-8' })) // 文字コード変更
    .pipe(gulp.dest(dstDir));
  done();
});

//JS
gulp.task('esLint', function (done) {
  return gulp.src(srcDir + '/**/*.js')
    // .pipe(plumber({
    //   errorHandler: notify.onError('<%= error.message %>')
    // }))
    // .pipe(esLint({
    //   fix: true
    // }))
    // .pipe(esLint.format())
    // .pipe(esLint.failAfterError())
    .pipe(gulp.dest(dstDir));
  done();
});

// ローカルサーバーの立ち上げ
const browserSyncOption = {
  port: 8080,
  server: {
    baseDir: dstDir, // ルートとなるディレクトリを指定
    port: 3001,
    middleware: [
      ssi({
        baseDir: dstDir,
        ext: '.html'
      })
    ]
  },
  reloadOnRestart: true,
  startPath: 'index.html',
  open: 'external',
  notify: false
};

function sync(done) {
  browserSync.init(browserSyncOption);
  done();
}

// watch&リロード 処理
function watchFiles(done) {
  const browserReload = () => {
    browserSync.reload();
    done();
  };

  gulp.watch(srcDir + '/**/*.html').on('change', gulp.series('html', browserReload));
  gulp.watch(srcDir + '/**/*.scss').on('change', gulp.series('sass', browserReload));
  gulp.watch(srcDir + '/**/*.js').on('change', gulp.series('esLint', browserReload));
}

// // default /////////////////////////////////////
gulp.task('default', gulp.series(gulp.parallel('sass', 'esLint', 'html'), gulp.series(sync, watchFiles)));


//js min
gulp.task("jsmin", function () {
  return gulp.src(srcDir + '/**/' + targetDir + '/**/*.js')
    .pipe(plumber())
    .pipe(jsmin())
    .pipe(gulp.dest(dstDir))
    .pipe(notify('js minify finished'))
});


//imagemin
gulp.task('imgmin', function () {
  return gulp.src(srcDir + '/**/' + targetDir + '/**/*.{jpg,jpeg,png,gif}')
    .pipe(plumber())
    .pipe(imagemin([
      pngquant({
        quality: '60-80',
        speed: 1,
        floyd: 0
      }),
      mozjpeg({
        quality: 85,
        progressive: true
      }),
      imagemin.svgo(),
      imagemin.optipng(),
      imagemin.gifsicle()
    ]))
    .pipe(notify('image minified'))
    .pipe(gulp.dest(dstDir))
    .pipe(notify('image minify finished'))
});


// minify /////////////////////////////////////
gulp.task('minify', function (callback) {
  return runSequence(
    'jsmin',
    'imgmin',
    callback
  );
});
