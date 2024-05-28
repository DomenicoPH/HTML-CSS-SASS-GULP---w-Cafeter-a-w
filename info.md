## Dependencias de desarrollo:
# Gulp

    npm i --save-dev gulp

# SASS + Gulp

    npm i --save-dev sass gulp-sass

# Autoprefixer + gulp-postcss + postcss

    npm i --save-dev autoprefixer gulp-postcss postcss

# Gulp Image Min (minificador)

    npm i --save-dev gulp-imagemin
    npm i --save-dev gulp-imagemin@7.1.0

# Gulp Webp (webp generator)

    npm i --save-dev gulp-webp
    npm i --save-dev gulp-webp@4.0.1

# Gulp Avif (Avif generator)

    npm i --save-dev gulp-avif
    npm i --save-dev gulp-avif@1.0.1

---

# Gulp / gulpfile.js

    const { src, dest, watch, series, parallel } = require('gulp');
    const sass = require('gulp-sass')(require('sass'));
    const postcss = require('gulp-postcss');
    const autoprefixer = require('autoprefixer');

    function css(done){
        src('src/scss/app.scss')
            .pipe( sass(/* { outputStyle: 'expanded' } */) )
            .pipe( postcss( [autoprefixer()] ) )
            .pipe( dest('build/css') )
        done();
    }

    function dev(){
        watch('src/scss/app.scss', css)
    }

    exports.css = css;
    exports.dev = dev;
    exports.default = series( css, dev);

## gulp
Al ejecutar el comando 'gulp' en la consola se ejecuta el archivo gulpfile.js y se ejecutan las tareas definidas por default.

## gulp css
Al ejecutar el comando 'gulp css' en la consola se ejecuta el la función 'css' del archivo gulpfile.js, encargada de compilar SASS en CSS.

## gulp dev
Al ejecutar el comando 'gulp css' en la consola se ejecuta el la función 'dev' del archivo gulpfile.js, encargada de observar los cambios en el archivo .scss y ejecutar la función 'css' cada vez que esto ocurra.