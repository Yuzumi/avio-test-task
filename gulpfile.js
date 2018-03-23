
const gulp              = require('gulp')
    , sass              = require('gulp-sass')
    , prefixer          = require('gulp-autoprefixer')
    , cache             = require('gulp-cache')
    , del               = require('del')
    , browserSync       = require('browser-sync').create()
    , reload            = browserSync.reload;

const dirs = {
    app : './app',
    dist: './dist'
};

const paths = {
    app: {
        html: `${dirs.app}/*.html`,
        sass: `${dirs.app}/sass/*.scss`,
        css : {
            dir : `${dirs.app}/css`,
            file: `${dirs.app}/css/*.css`,
        },
        js  : `${dirs.app}/js/*.js` 
    },
    dist: {
        html: `${dirs.dist}`,
        css : `${dirs.dist}/css`,
        js  : `${dirs.dist}/js`
    },
    watch: {
        html: `${dirs.app}/**/*.html`,
        sass: `${dirs.app}/**/*.scss`,
        js  : `${dirs.app}/**/*.js`
    },
    clean   : `${dirs.dist}`
};

const config = {
    server: {
        baseDir: `${dirs.app}`
    },
    notify: false
};

gulp.task('serve', () => browserSync.init(config));

gulp.task('sass', () => {
    return gulp
        .src(paths.app.sass)
        .pipe(sass())
            .on('error', console.log)
        .pipe(prefixer([ 'last 5 versions' ]))
        .pipe(gulp.dest(paths.app.css.dir))
        .pipe(reload({ stream: true }));
});

gulp.task('watch', ['serve', 'sass'], () => {
    gulp.watch(paths.watch.html     , reload);
    gulp.watch(paths.watch.js       , reload);
    gulp.watch(paths.watch.sass     , ['sass']);
});

gulp.task('html:copy', () => {
    return gulp
        .src(paths.app.html)
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task('css:copy', ['sass'], () => {
    return gulp
        .src(paths.app.css.file)
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('js:copy', () => {
    return gulp
        .src(paths.app.js)
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('dist:remove', () => del.sync(paths.clean));

gulp.task('cache:clear', () => cache.clearAll());

gulp.task('build', [
    'dist:remove',
    'html:copy',
    'css:copy',
    'js:copy'
]);