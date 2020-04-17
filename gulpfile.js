// CommonJS: Módulo de Node.js
const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
// const util = require('util');
// const util = require('gulp-util');

gulp.task('sass', () => {
    return gulp.src( './src/scss/main.scss' )
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest( './dist/css'));
});

gulp.task('watch', ()=>{
    watch('./src/scss/**/*.scss', gulp.series('sass'));
});

// gulp.task('build', gulp.series('sass'));
gulp.task('default', gulp.series('sass', 'watch'));

// Codido del curso, no funcoiono, al aprecer por las dependencias y la nueva actualizacion de gulp 4
// gulp.task('watch', ()=> {
//     watch('./src/scss/**/*.scss', (file) =>{
//         util.log('mySCSS file changed: ', file.path);
//         gulp.start('sass', function(){

//         }).on('error', (error) =>{
//             util.log(util.colors.red('Error'), error.message);
//         });
//     }, );
// });