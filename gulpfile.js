const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('babel', (cb) => {
  gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'stage-3'],
      plugins: ['transform-runtime'],
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function(){
  gulp.watch('./src', ['babel']);
});
