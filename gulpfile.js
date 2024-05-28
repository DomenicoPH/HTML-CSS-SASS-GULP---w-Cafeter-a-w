/* Demo tareas Gulp...
// ----- x ----- Tareas ----- x -----
function tarea(done){
    console.log('--$--$--$---$--$--$--\nDesde mi primer tarea\n--$--$--$---$--$--$--');
    done();
}

// ----- x ----- Exports ----- x -----
exports.tarea = tarea;
*/
const { src, dest, watch, series, parallel } = require('gulp');
/*  import from gulp...
    src = source (ls fuente a compilar. El archivo .scss)
    dest = destination (el archivo .css de destino)
    watch = observador (está pendiente de los cambios)
    series = función que ejecuta las tareas en serie.
    parallel = función que ejecuta las tareas en paralelo.
*/

// Dependencias CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Dependencias Imágenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){ // ------------------------------ Función compiladora
    /*
        Compilar Sass:
        1. Identificar archivo.
        2. Compilar.
        3. Guardar .css
    */
    src('src/scss/app.scss')
        .pipe( sass(/* { outputStyle: 'expanded' } */) )
        .pipe( postcss( [autoprefixer()] ) )
        .pipe( dest('build/css') );
    done();
};

function imagenes(){ // ------------------------------ Minificador de imágenes
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3}))
        .pipe(dest('build/img'));
};
function versionWebp(){ // ------------------------------ Generador de .webp
    const opciones = {
        quality: 50 // 0 - 100
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
};
function versionAvif(){ // ------------------------------ Generador de .avif
    const opciones = {
        quality: 50 // 0 - 100
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
};

function dev(){ // ------------------------------ watcher
    /* 
        watch(archivo a observar, función compiladora)
    */
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
};

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);

// series -> Se inicia una tarea y al finalizar inicia la siguiente.
// parallel -> Todas las tareas se inician al mismo tiempo y van terminando progresivamente.