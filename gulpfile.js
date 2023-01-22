const { src, dest, watch, parallel, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify-es').default
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const fonter = require('gulp-fonter')
const ttf2woff2 = require('gulp-ttf2woff2')
const del = require('del')

function styles() {
  return src([
		'node_modules/normalize.css/normalize.css',
		'src/styles/scss/style.scss'
])
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
    .pipe(dest('src/styles/css'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src([
		'src/js/components/*.js'
	])
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(dest('src/js'))
}

function images() {
	return src('src/assets/images/**/*')
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.mozjpeg({quality: 75, progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			]
		})
	]))
	.pipe(dest('dist/assets/images'))
}

function fonts() {
	return src('src/assets/fonts/*.*')
	.pipe(fonter(
		{formats: ['ttf', 'woff']}
	))
	.pipe(ttf2woff2())
	.pipe(dest('src/assets/fonts'))
}

function watching() {
  watch(['src/styles/scss/**/*.scss'], styles)
  watch(['src/js/components/*.js'], scripts)
  watch(['src/js/components/*.js']).on('change', browserSync.reload)
  watch('src/index.html').on('change', browserSync.reload)
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	})
}

function build() {
	return src([
		'src/styles/css/style.min.css',
		'src/styles/css/swiper.min.css',
		'src/js/main.min.js',
		'src/js/gsap.min.js',
		'src/js/swiper.min.js',
		'src/index.html',
		'src/assets/fonts/*.*'
	], {base: 'src'})

	.pipe(dest('dist'))
}

function cleanDist() {
	return del('dist')
}

exports.styles = styles
exports.scripts = scripts
exports.watching = watching
exports.browsersync = browsersync
exports.images = images
exports.fonts = fonts
exports.cleanDist = cleanDist
exports.build = series(cleanDist, build, images)
exports.default = parallel(browsersync, watching)
