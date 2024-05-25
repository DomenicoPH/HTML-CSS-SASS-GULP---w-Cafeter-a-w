/* Demo tareas Gulp...
// ----- x ----- Tareas ----- x -----
function tarea(done){
    console.log('--$--$--$---$--$--$--\nDesde mi primer tarea\n--$--$--$---$--$--$--');
    done();
}

// ----- x ----- Exports ----- x -----
exports.tarea = tarea;
*/
const { src, dest, watch } = require('gulp');
/*  import from gulp...
    src = source (ls fuente a compilar. El archivo .scss)
    dest = destination (el archivo .css de destino)
*/
const sass = require('gulp-sass')(require('sass'));

function css(done){     // ---------- Función compiladora
    /*
        Compilar Sass:
        1. Identificar archivo.
        2. Compilar.
        3. Guardar .css
    */
    src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( dest('build/css') )
    done();
}

function dev(){         // ---------- watcher
    watch('src/scss/app.scss', css)
}

exports.css = css;
exports.dev = dev;