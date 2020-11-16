const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const plumber = require('gulp-plumber') //強制停止を防止
const notify = require('gulp-notify') //通知を表示
const browserSync = require('browser-sync') //ブラウザシンク
const ssi = require('connect-ssi') //ssi
const crLfReplace = require('gulp-cr-lf-replace') // 改行コードを統一する
const convertEncoding = require('gulp-convert-encoding') // 文字コード変更
const pleeease = require('gulp-pleeease')
const cache = require('gulp-cached')
const jsmin = require('gulp-uglify')
// 画像圧縮
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const mozjpeg = require('imagemin-mozjpeg')
// lint
const esLint = require('gulp-eslint')
const htmlhint = require('gulp-htmlhint')

// paths
//setting : paths
const paths = {
  root: './htdocs/',
  src: './src/',
  pug: './src/pug/**/*.pug',
  html: './htdocs/**/*.html',
  cssSrc: './src/scss/**/*.scss',
  cssDist: './htdocs/assets/css/',
  jsSrc: './src/js/**/*.js',
  jsDist: './htdocs/assets/js/',
}

//html
gulp.task('html', function (done) {
  return gulp
    .src([paths.src + '/html/**/*.html', '!./src/html/**/_*.html'])
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      })
    )
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(gulp.dest(paths.root))
})
//Pug
gulp.task('pug', function (done) {
  return gulp
    .src([paths.pug, '!./src/**/**/_*.pug'])
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      })
    )
    .pipe(
      pug({
        pretty: true,
        basedir: './src/pug',
      })
    )
    .pipe(gulp.dest(paths.root))
})

// sass
gulp.task('sass', function (done) {
  return gulp
    .src([paths.cssSrc, '!./src/**/**/_*.pug'])
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      })
    )
    .pipe(
      sass({
        outputStyle: 'expanded', // expanded: 展開 compressed : 圧縮
      })
    )
    .pipe(
      pleeease({
        rem: { rootValue: '10px' },
        autoprefixer: {
          browsers: ['iOS 10', 'Android 4.4', 'last 2 version'],
        },
        opacity: false,
        minifier: false, // 圧縮しない場合：false
      })
    )
    .pipe(cache())
    .pipe(crLfReplace({ changeCode: 'CR+LF' })) // 改行コード変更
    .pipe(convertEncoding({ to: 'UTF-8' })) // 文字コード変更
    .pipe(gulp.dest(paths.cssDist))
})

//JS
gulp.task('esLint', function (done) {
  return gulp
    .src(paths.jsSrc)
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      })
    )
    .pipe(
      esLint({
        fix: true,
      })
    )
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
    .pipe(gulp.dest(paths.jsDist))
})

// ローカルサーバーの立ち上げ
const browserSyncOption = {
  port: 8080,
  server: {
    baseDir: paths.root, // ルートとなるディレクトリを指定
    port: 3001,
    middleware: [
      ssi({
        baseDir: paths.root,
        ext: '.html',
      }),
    ],
  },
  reloadOnRestart: true,
  startPath: 'index.html',
  open: 'external',
  notify: false,
}

function sync(done) {
  browserSync.init(browserSyncOption)
  done()
}

// watch&リロード 処理
function watchFiles(done) {
  const browserReload = () => {
    browserSync.reload()
    done()
  }

  gulp.watch(paths.src + '/**/*.html').on('change', gulp.series('html', browserReload))
  gulp.watch(paths.pug).on('change', gulp.series('pug', browserReload))
  gulp.watch(paths.cssSrc).on('change', gulp.series('sass', browserReload))
  gulp.watch(paths.jsSrc).on('change', gulp.series('esLint', browserReload))
}

// // default /////////////////////////////////////
gulp.task(
  'default',
  gulp.series(gulp.parallel('sass', 'esLint', 'html', 'pug'), gulp.series(sync, watchFiles))
)

//js min
gulp.task('jsmin', function () {
  return gulp
    .src(paths.src + '/**/' + targetDir + '/**/*.js')
    .pipe(plumber())
    .pipe(jsmin())
    .pipe(gulp.dest(paths.root))
    .pipe(notify('js minify finished'))
})

//imagemin
gulp.task('imgmin', function () {
  return gulp
    .src(paths.src + '/**/' + targetDir + '/**/*.{jpg,jpeg,png,gif}')
    .pipe(plumber())
    .pipe(
      imagemin([
        pngquant({
          quality: '60-80',
          speed: 1,
          floyd: 0,
        }),
        mozjpeg({
          quality: 85,
          progressive: true,
        }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle(),
      ])
    )
    .pipe(notify('image minified'))
    .pipe(gulp.dest(paths.root))
    .pipe(notify('image minify finished'))
})

// minify /////////////////////////////////////
gulp.task('minify', function (callback) {
  return runSequence('jsmin', 'imgmin', callback)
})
