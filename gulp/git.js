'use strict';

var gulp = require('gulp');
var git = require('gulp-git');
var conf = require('./conf');

gulp.task('deploy', function() {
  process.chdir(conf.paths.dist);

  git.exec({args: 'status -s', quiet: true}, function(err, stdout) {
    if (!err && stdout.length > 0) {
      gulp.src('./*')
        .pipe(git.add())
        .pipe(git.commit('Autodeploy'))
        .on('end', function() {
          git.push('origin', 'master', { args: '-f' });
        });
    } else {
      console.log('Nothing to deploy');
    }
  });

  return true;
});
