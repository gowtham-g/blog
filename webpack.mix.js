let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
 
mix.js('resources/assets/js/app.js', 'public/assets/js')
   .sass('resources/assets/sass/app.scss', 'public/assets/css')
    .sass('resources/assets/sass/error.scss', 'public/assets/css')

   
mix.copyDirectory('resources/assets/img/', 'public/assets/img')

mix.copyDirectory('resources/assets/css/custom.css', 'public/assets/css')
mix.copyDirectory('resources/assets/fonts/rajdhani', 'public/assets/rajdhani')

mix.copyDirectory('resources/assets/js/components.js', 'public/assets/js')
mix.copyDirectory('resources/assets/js/custom.js', 'public/assets/js')
mix.copyDirectory('resources/assets/js/iziToast.min.js', 'public/assets/js')
mix.copyDirectory('resources/assets/js/sweetalert/js/sweetalert2.min.js', 'public/assets/js')









if(mix.inProduction()){
    var shell = require('shelljs');
    if (shell.exec('php artisan route:cache').code !== 0) {
        shell.echo('Error: Route Cache commit failed');
        shell.exit(1);
    }
    if (shell.exec('php artisan view:clear').code !== 0) {
        shell.echo('Error: View Cache commit failed');
        shell.exit(1);
    }
    if (shell.exec('php artisan config:cache').code !== 0) {
        shell.echo('Error: Config Cache commit failed');
        shell.exit(1);
    }
    if (shell.exec('php artisan optimize').code !== 0) {
        shell.echo('Error: Optimize Cache commit failed');
        shell.exit(1);
    }
}

// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// mix.webpackConfig({
//     plugins: [
//         new BrowserSyncPlugin({
//             open: 'external',
//             host: 'localhost:8000',
//             proxy: 'localhost:8000',
//             files: ['resources/views/**/*.php', 'app/**/*.php', 'routes/**/*.php']
//         })
//     ]
// });