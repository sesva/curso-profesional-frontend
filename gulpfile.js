// CommonJS: Módulo de Node.js
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// const util = require('util');
// const util = require('gulp-util');

gulp.task('sass', () => {
    return gulp.src( './src/scss/main.scss' )
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest( './dist/css'));
});

const jsDir = './src/js/app/';

gulp.task('minify-js', ()=>{
    return gulp.src([
        jsDir + 'navigation.js',
        jsDir + 'senales.js'
    ]).pipe(concat('all-scripts.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(rename('all-scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', ()=>{
    watch('./src/scss/**/*.scss', gulp.series('sass'));
    
    // watch for changes in pages
    watch('./src/pages/**/*.html', gulp.series('file-include'));
});

// Task to generate static pages from a template
gulp.task('file-include', function(){
    return gulp.src(['./src/pages/wrappers/*.include.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(rename(function (path) {
        path.dirname += '/';
        path.basename = path.basename.replace(".include", "");
        path.extname = ".html";
    }))
    .pipe(gulp.dest('./dist/pages'));
});

// Copy static assets
gulp.task('copy-assets', ()=>{
    return gulp.src('./src/img/*.png')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('build', gulp.series('file-include','sass'));
gulp.task('default', gulp.series('watch', 'build'));

// Codido del curso, no funcoiono, al aprecer por las dependencias y la nueva actualizacion de gulp 4, ya que esta actualizacion "Gulp 4" saca sierto modulos o paquetes a parte, hay que instalarlos de npm y llamarlos con required.
// gulp.task('watch', ()=> {
//     watch('./src/scss/**/*.scss', (file) =>{
//         util.log('mySCSS file changed: ', file.path);
//         gulp.start('sass', function(){

//         }).on('error', (error) =>{
//             util.log(util.colors.red('Error'), error.message);
//         });
//     }, );
// });