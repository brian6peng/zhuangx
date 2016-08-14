'use strict';

const gulp = require('gulp');
const packager = require('electron-packager');
const path = require('path');

gulp.task('build-win', () => {
    packager({
        arch: 'x64',
        dir: path.join(__dirname, 'app'),
        platform: 'win32',
        asar: true,
        overwrite: true,
        out: path.join(__dirname, 'out'),
        icon: path.join(__dirname, 'build', 'icon.ico'),
        version: "1.3.3",
        'version-string': {
            ProductName: 'zhuangx',
            CompanyName: 'brian liu'
        }
    }, (err, appPath) => {
        if (err) {
            console.log(err);
        }
    });
});

gulp.task('build-linux', () => {
    packager({
        arch: 'x64',
        dir: path.join(__dirname, 'app'),
        platform: 'linux',
        asar: true,
        // ignore: /(main-es6|renderer)/i,
        overwrite: true,
        out: path.join(__dirname, 'out'),
        icon: path.join(__dirname, 'build', 'icon.ico'),
    }, (err, appPath) => {
        if (err) {
            console.log(err);
        }
    });
});